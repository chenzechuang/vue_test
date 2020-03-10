<template>
    <div>
        <p>{{post.id}}、{{post.title}}、{{value}}</p>
        <input v-bind="$attrs" :value="value" @input="$emit('input', $event.target.value)">
        <button @click="$emit('enlarge-text', 0.1)">Enlarge Text</button>
        <slot></slot>
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
        }
    }
</script>

<style lang="scss" scoped>

</style>