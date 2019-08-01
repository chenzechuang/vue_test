<template v-if="list.length">
    <div>
        <dropdown></dropdown>
        <component :is="currentView"></component>
        <button @click="changeView('About')">关于</button>
        <button @click="changeView('Other')">其它</button>
        <input-number v-model="value" :step="10" :min="0" :max="100" @changenum="changeNumber"></input-number>
        <home 
            :message="totalPrice"
            @formatter="formatterPrice">
        </home>
        <table v-for="(item, index) in list" v-if="item.children.length">
            <caption>
                {{ item.category }}
            </caption>
            <thead>
                <tr>
                    <th><input type="checkbox" name="checkAll" v-model="item.checkAll" @click="checkAll(item)"></th>
                    <th>名称</th>
                    <th>单价</th>
                    <th>数量</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(good, idx) in item.children">
                    <td><input type="checkbox" name="check" v-model="good.check"></td>
                    <td>{{ good.name }}</td>
                    <td>{{ good.price }}</td>
                    <td>
                        <button
                            @click="handleReduce(good)"
                            :disabled="good.count === 1">-</button>
                        {{ good.count }}
                        <button @click="handleAdd(good)">+</button>
                    </td>
                    <td>
                        <button @click="handleRemove(index, idx)">移除</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div id="total" v-if="showTotal">总价：￥ {{ totalPrice }}</div>
        <button @click="getTotal()">价格</button>
        <tabs v-model="activeKey" v-cloak>
            <pane label="标签一" name="1" :prop="true">
                标签一的内容
            </pane>
            <pane label="标签二" name="2" :prop="true">
                标签二的内容
            </pane>
            <pane label="标签三" name="3" :prop="true">
                标签三的内容
            </pane>
        </tabs>
    </div>
</template>

<script>
    import home from '../home/home'
    import other from '../other/other'
    import about from '../about/about'
    import inputNumber from '../../components/common/input-number'
    import pane from '../panel/pane'
    import tabs from '../panel/tabs'
    import dropdown from '../dropdown/dropdown'
    export default {
        data() {
            return {
                list: [
                    {
                        category: "水果",
                        children: [
                            {
                                id: 1,
                                name: "苹果",
                                price: 5,
                                count: 1,
                                check: false
                            },
                            {
                                id: 2,
                                name: "香蕉",
                                price: 3,
                                count: 1,
                                check: false
                            }
                        ]
                    },
                    {
                        category: "手机",
                        children: [
                            {
                                id: 10,
                                name: "Iphone 8",
                                price: 5888,
                                count: 1,
                                check: false
                            },
                            {
                                id: 11,
                                name: "小米9",
                                price: 3999,
                                count: 1,
                                check: false
                            }
                        ]
                    },
                    {
                        category: "家电",
                        children: [
                            {
                                id: 100,
                                name: "冰箱",
                                price: 2200,
                                count: 1,
                                check: false
                            },
                            {
                                id: 101,
                                name: "空调",
                                price: 3999,
                                count: 1,
                                check: false
                            }
                        ]
                    }
                ],
                currentView: 'comAbout',
                showTotal: false,
                value: 5,
                activeKey: "1"
            };
        },
        components: {
            home,
            pane,
            tabs,
            dropdown,
            comAbout: about,
            comOther: other,
            'input-number': inputNumber
        },
        computed: {
            totalPrice() {
                let total = 0;
                let _this = this;
                for (let i = 0; i < _this.list.length; i++) {
                    if (_this.list[i].checkAll) {
                        for (let j = 0; j < _this.list[i].children.length; j++) {
                            total += _this.list[i].children[j].count * _this.list[i].children[j].price;
                        }
                    } else {
                        for (let j = 0; j < _this.list[i].children.length; j++) {
                            if (_this.list[i].children[j].check) {
                                total += _this.list[i].children[j].count * _this.list[i].children[j].price;
                            }
                        }
                    }
                }
                return total.toString().replace(/\B(?=(\d{3})+$)/g, ',');
            }
        },
        methods: {
            changeView: function(view) {
                this.currentView = 'com' + view
            },
            getTotal: function() {
                this.value = 4;
                this.showTotal = true;
                this.$nextTick(function() {
                    var text = document.getElementById("total").innerHTML;
                    console.log(text)
                })
            },
            handleReduce(item) {
                if (item.index === 1) {
                    return;
                } else {
                    item.count--;
                }
            },
            handleAdd(item) {
                item.count++;
            },
            handleRemove(index, idx) {
                this.list[index].children.splice(idx, 1);
            },  
            checkAll(item) {
                if(item.checkAll) {
                    for (let i = 0; i < item.children.length; i++) {
                        item.children[i].check = false;
                    }
                } else {
                    for (let i = 0; i < item.children.length; i++) {
                        item.children[i].check = true;
                    }
                }
            },
            formatterPrice() {
                this.checkAll(this.list[0]);
            },
            changeNumber(val) {
                console.log(val);
            }
        },
    };
</script>

<style lang="scss" scoped>
</style>
