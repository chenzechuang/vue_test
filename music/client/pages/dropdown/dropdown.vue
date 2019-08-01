<template>
    <div class="main" v-clickoutside="handleClose">
        <div @click="show = !show">点击显示下拉菜单</div>
        <div class="dropdown" v-show="show">
            <p>内容</p>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
Vue.directive('clickoutside',  {
    bind: function (el, binding, vnode) {
        function documentHandler(e) {
            if (el.contains(e.target)) {
                return false;
            }
            if (binding.expression) {
                binding.value(e);
            }
        }
        el.__vueClickOutside__ = documentHandler;
        document.addEventListener("click", documentHandler);
    },
    unbind: function(el, binding) {
        document.removeEventListener("click", vue.__vueClickOutside__);
        delete vue.__vueClickOutside__;
    }
})
export default {
    data() {
        return {
            show: false
        }
    },
    methods: {
        handleClose() {
            this.show = false
        }
    },
}
</script>