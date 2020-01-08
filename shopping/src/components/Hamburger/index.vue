<template>
  <div @click="toggleClick" :class="{'is-active':isActive}">
    <svg-icon iconClass="hamburger" className="hamburger"></svg-icon>
  </div>
</template>

<script>
  export default {
    name: 'Hamburger',
    props: {
      isActive: {
        type: Boolean,
        default: false
      },
      toggleClick: {
        type: Function,
        default: null
      }
    }
  }
</script>

<style lang="scss" scoped>
    .hamburger {  
      font-size: 24px;
    }
  .is-active {
    .hamburger {
      transform: rotate(180deg);
    }
  }
</style>