<template>
    <div class="pane" v-show="show">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name : 'pane',
    props: {
        name: {
            type: String
        },
        label: {
            type: String,
            default: ''
        },
        prop: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            show: true
        }
    },
    methods: {
        updateNav() {
            this.$parent.updateNav();
        }
    },
    watch: {
        label() {
            this.updateNav();
        }
    },
    mounted() {
        this.updateNav();
    },
    beforeDestroy() {
        this.updateNav();
    }
}
</script>