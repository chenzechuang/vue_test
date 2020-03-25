<template>
  <li>
    <span>{{ todo.text }}</span>
    <button @click="removeTodo">X</button>
  </li>
</template>

<script>
  export default {
    name: 'TodoListItem',
    props: {
      todo: {
        type: Object,
        required: true
      }
    },
    methods: {
      removeTodo () {
        this.$emit('remove', this.todo.id);
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>