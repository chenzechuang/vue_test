<template>
    <section>
        <header class="">
            <span class="" v-if="fatherComponent == 'home'">{{ level }}</span>
        </header>
    </section>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    export default {
        name: 'page',
        data() {
            return {
                itemId: null, //题目ID
                choosedNum: null, //选中答案索引
                choosedId:null //选中答案id
            }
        },
        props: ['fatherComponent'],
        computed: mapState([
            'itemNum', //第几题
            'level', //第几周
            'itemDetail', //题目详情
            'timer', //计时器
        ]),
        methods: {
            ...mapActions([
                'addNum', 'initializeData'
            ])
        },
        created() {
            if (this.fatherComponent == 'home') {
                this.initializeData();
                document.body.style.backgroundImage = 'url(./static/img/1-1.jpg)';
            }
        },
    }
</script>

<style scoped>

</style>