<template>
    <div>
        <ul>
            <li v-for="(book, index) in filterBooks" :key="index">{{ book.name }}</li>
        </ul>
        <input type="number" :class="classes" v-model="package1[0].price">
        <p v-if="showName">{{ prices }}</p>
        <p>{{ time | formatDate }}</p>
        <a v-html="link" :href="url" @click="toggleName"></a>
        <div @click="handlePrice">{{ message }}</div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                time: new Date().toLocaleString(),
                text: '123,456',
                showName: true,
                link: '<span>按钮</span>',
                url: '#',
                disabled: true,
                isActive: true,
                books: [{
                        name: 'Vue.js'
                    }, {
                        name: 'javascript1'
                    }, {
                        name: 'javascript2'
                    }
                ],
                package1: [{
                        name: 'Ipone6',
                        price: 4000,
                        count: 2
                    }, {
                        name: 'Ipone7',
                        price: 6000,
                        count: 2
                    }
                ]
            };
        },
        props:  ['message'],
        computed: {
            prices() {
                let prices = 0;
                let _this = this;
                for (let i = 0; i < _this.package1.length; i++) {
                    prices +=  _this.package1[i].price * _this.package1[i].count;
                }
                return prices
            },
            classes() {
                return [
                    'search-ipt',
                    {
                        ['disabled']: this.disabled,
                        ['active']: this.isActive,
                    }
                ]
            },
            filterBooks() {
                return this.books.filter(function(book) {
                   return book.name.match(/javascript/)
                })
            }
        },
        methods: {
            toggleName() {
                this.showName = !this.showName;
            },
            handlePrice() {
                this.$emit('formatter');
            }
        },
        filters: {
            formatDate: function(value) {
                return '当前时间：' + value;
            }
        },
        created() {
            this.name = '232';
        },
        mounted() {
            let _this = this;
            _this.timer = setInterval(() => {
                _this.time = new Date().toLocaleString();
            }, 1000);
        },
        beforeDestroy() {
            if (this.timer) {
                clearInterval(this.timer);
            }
        }
    };

</script>

<style lang="scss" scoped>
    $color: #F2F2F2;
    div {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background: $color;
    }
    .search-ipt {
        height: 30px;
        line-height: 30px;
    }
    .active {
        border: 1px solid #08ee08;
    }
    .disabled {
        cursor: help;
    }

</style>
