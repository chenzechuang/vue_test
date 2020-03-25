<template>
  <div id="test">
    <p>Reversed message: "{{ reversedMessage() }}"</p>
    <button @click="changeMessage">test</button>
    <test v-slot="{user}" @focus="onFocus" placeholder="Enter your username" v-model="searchValue" :style="{fontSize: postFontSize + 'em'}" v-for="post in posts" :post="post" :key="post.title" @enlarge-text="postFontSize += $event">
        <p>{{searchValue}}、{{user.lastName}}</p>
    </test>
    <transition name="fade">
      <BaseAa v-show="message == 'hi'"></BaseAa>
    </transition>
    <TodoList />
  </div>
</template>

<script>
  import test from '@/components/test'
  import TodoList from '@/components/TodoList'
  export default {
    components: {
      test,
      TodoList
    },
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
      reversedMessage () {
        return this.message.split('').reverse().join('')
      },
      changeMessage () {
         this.message = this.message == 'hi' ? 'hello' : 'hi'
      },
      onFocus () {
        console.log(1);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>