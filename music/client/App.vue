<template>
  <div id="app">
    <router-view/>
    <div class="container">
      <router-view name="questionnaire"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
button {
    border: 0 none;
    background: linear-gradient(#f2f2f2, #ccc);
    width: 30px;
    height: 20px;
    line-height: 20px;
}
</style>
