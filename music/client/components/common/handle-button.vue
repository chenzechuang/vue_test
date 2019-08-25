<template>
    <div class="btn-box">
        <button class="btn" @click="getProgress" :class="colorClass" :disabled="disabled">{{content}}</button>
    </div>
</template>
<script>
export default {
    props: {
        text: {
            type: String
        },
        color: {
            type: String,
            default: 'white'
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            content: this.text
        }
    },
    methods: {
        getProgress() {
            console.log(1);
            
            let _this = this;
            let currentPage = this.$parent.page;
            let reset = false;
            if (_this.content == '下一步' || _this.content == '提交') {
                currentPage++;
            } else if (_this.content == '上一步') {
                currentPage--;
            } else if (_this.content == '重置') {
                reset = true;
            }
            _this.$emit('on-click', currentPage, reset);
        }
    },
    computed: {
        colorClass() {
            return [
                this.color + 'Btn'
            ]
        }
    },
}
</script>

<style lang="scss" scoped>
    .btn-box {
        flex: 1;
        text-align: center;
        border: 1px solid #ccc;
        display: inline-block;
    }
    .btn {
        width: 100%;
        height: 40px;
        line-height: 40px;
        cursor: pointer;
    }
    .whiteBtn {
        background: #fff;
        color: #000;
    }
    .gredBtn {
        background: #5c5c5c;
        color: #fff;
    }
</style>