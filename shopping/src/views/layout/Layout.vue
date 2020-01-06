<template>
    <div :class="classObj" class="app-container">
      <sidebar class="sidebar-container"></sidebar>
    </div>
</template>

<script>
  import Sidebar from './components/Sidebar'
  export default {
    name: 'Layout',
    components: { Sidebar },
    computed: {
      sidebar() {
        return this.$store.state.app.sidebar
      },
      classObj() {
        return {
          openSidebar: this.sidebar.opened,
          hideSidebar: !this.sidebar.opened,
          withoutAnimation: this.sidebar.withoutAnimation
        }
      }
    },
  };
</script>

<style lang="scss" scoped>
  .app-container {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>