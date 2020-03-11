<template>
    <div>
        <p>{{post.id}}、{{post.title}}、{{value}}</p>
        <input v-bind="$attrs" :value="value" v-on="inputListeners">
        <button @click="$emit('enlarge-text', 0.1)">Enlarge Text</button>
        <slot :user="user">
            {{ user.firstName }}
        </slot>
    </div>
</template>

<script>
    export default {
        name: 'test',
        inheritAttrs: false,
        props: {
            value: {
                type: String
            },
            post: {
                type: Object
            }
        },
        data() {
            return {
                user: {
                    firstName: 'czc',
                    lastName: 'chen'
                }
            }
        },
        computed: {
            inputListeners () {
                var vm = this;
                return Object.assign({},
                this.$listeners,
                {
                    input (event) {
                       vm.$emit('input', event.target.value) 
                    }
                })
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>