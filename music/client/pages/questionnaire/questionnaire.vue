<template>
    <div class="questionnaire">
        <div v-show="page == 1">
            <p>1、请问你的性别是：</p>
            <label><input type="radio" value="male" v-model="checkedGender">男</label>
            <label><input type="radio" value="female" v-model="checkedGender">女</label>
            <label><input type="radio" value="secret" v-model="checkedGender">保密</label>
            <div class="footer">
                <handle-button @on-click="handleProgress" :color="btnColor" :disabled="isNext" text="下一步"></handle-button>
                <handle-button  color="white" text="重置"></handle-button>
            </div>
            
        </div>
        <div v-show="page == 2">
            <p>1、请问你的兴趣爱好是：</p>
            <label><input type="checkbox" value="book" v-model="checkedTaste">看书</label>
            <label><input type="checkbox" value="swim" v-model="checkedTaste">游泳</label>
            <label><input type="checkbox" value="run" v-model="checkedTaste">跑步</label>
            <label><input type="checkbox" value="game" v-model="checkedTaste">游戏</label>
            <div class="footer">
                <handle-button @on-click="handleProgress" :color="btnColor" :disabled="isNext" text="下一步"></handle-button>
                <handle-button @on-click="handleProgress" color="white" text="上一步"></handle-button>
                <handle-button @on-click="handleProgress" color="white" text="重置"></handle-button>
            </div>
        </div>
        <div v-show="page == 3">
            <p>1、请介绍一下自己：</p>
            <textarea name="introduction" placeholder="不少于100字" min="100" ng-model="introText"></textarea>
            <div class="footer">
                <handle-button @on-click="handleProgress" :color="btnColor" :disabled="isNext" text="提交"></handle-button>
                <handle-button @on-click="handleProgress" color="white" text="上一步"></handle-button>
                <handle-button @on-click="handleProgress" color="white" text="重置"></handle-button>
            </div>
        </div>
    </div>
</template>
<script>
    import handleButton from '../../components/common/handle-button'
    export default {
        data() {
            return {
                page: 1,
                checkedGender: '',
                checkedTaste: [],
                introText: '',
                btnColor: 'gred'
            }
        },
        components: {
            'handle-button': handleButton
        },
        computed: {
            isNext() {
                var _this = this;
                if ((_this.page === 1 && _this.checkedGender) || 
                    (_this.page === 2 &&  (_this.checkedTaste.length > 1 && _this.checkedTaste.length < 4))  ||
                    (_this.page === 3 && _this.introText.length >= 100)) {
                        _this.btnColor = 'white';
                        return false;
                } else {
                    _this.btnColor = 'gred';
                    return true;
                }
            }
        },
        methods: {
            handleProgress(index, resetPage) {
                let _this = this;
                if (resetPage) {
                    if (_this.page == 1) {
                        _this.checkedGender = '';
                    } else if (_this.page == 2) {
                        _this.checkedTaste = [];
                    } else {
                        _this.introText = '';
                    }
                } else {
                    this.page = index;
                }
            }
        },
    }
</script>
<style lang="scss" scoped>
    .questionnaire {
        width: 640px;
        border: 1px solid #ccc;
        background: #f2f2f2;
    }
    .footer {
        display: flex;
        
    }
</style>