<template>
  <input type="text" :value="value" v-on="inputListeners">
</template>

<script>
  export default {
    props: {
      value: String
    },
    computed: {
      inputListeners () {
        return {
          ...this.$listeners,
          input: event => this.$emit('input', event.target.value)
        }
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>