<template v-if="list.length">
    <div>
        <table v-for="(item, index) in list">
            <caption>
                {{ item.category }}
            </caption>
            <thead>
                <tr>
                    <th></th>
                    <th>名称</th>
                    <th>单价</th>
                    <th>数量</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(good, index) in item.children" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ good.name }}</td>
                    <td>{{ good.price }}</td>
                    <td>
                        <button>{{ good.count }}</button>
                    </td>
                    <td>操作</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
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
                            count: 1
                        },
                        {
                            id: 2,
                            name: "香蕉",
                            price: 3,
                            count: 1
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
                            count: 1
                        },
                        {
                            id: 11,
                            name: "小米9",
                            price: 3999,
                            count: 1
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
                            count: 1
                        },
                        {
                            id: 101,
                            name: "空调",
                            price: 3999,
                            count: 1
                        }
                    ]
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped>
</style>
