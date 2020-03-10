<template>
  <div id="test">
    <p>Reversed message: "{{ reversedMessage() }}"</p>
    <button @click="changeMessage">test</button>
    <test required placeholder="Enter your username" v-model="searchValue" :style="{fontSize: postFontSize + 'em'}" v-for="post in posts" :post="post" :key="post.title" @enlarge-text="postFontSize += $event">
        <p>hhhh</p>
    </test>
    <BaseAa></BaseAa>
  </div>
</template>

<script>
  import test from '@/components/test';
  export default {
    components: {test},
    data() {
      return {
        searchValue: '',
        message: 'hello',
        postFontSize: 1,
        posts: [
          { id: 1, title: 'My journey with Vue' },
          { id: 2, title: 'Blogging with Vue' },
          { id: 3, title: 'Why Vue is so fun' }
        ]
      }
    },
    methods: {
      reversedMessage: function () {
        return this.message.split('').reverse().join('')
      },
      changeMessage: function () {
        this.message = 'hi'
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>