<template>
    <svg :class="svgClass" aria-hidden="true" v-on="$listener">
        <use :xlink:href="iconName"></use>
    </svg>
</template>

<script>
    export default {
        name: 'SvgIcon',
        props: {
            iconClass: {
                type: String,
                required: true
            },
            className: {
                type: String,
                default: ""
            }
        },
        computed: {
            iconName () {
                return `#icon-${this.iconClass}`
            },
            svgClass () {
               return "svg-icon " + this.className
            }
        }
    }
</script>

<style lang="scss" scoped>
    .svg-icon {
        width: 1em;
        height: 1em;
        fill: currentColor;
        overflow: hidden;
    }
</style>