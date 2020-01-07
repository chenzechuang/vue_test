<template>
    <div class="app-wrapper">
      <navbar class="navbar-container" />
      <div :class="classObj" class="body-container">
        <sidebar class="sidebar-container" />
        <div class="main-container">
          <app-main />
        </div>
      </div>
    </div>
</template>

<script>
  import { Navbar, Sidebar, AppMain } from './components'
  export default {
    name: 'Layout',
    components: { Navbar, Sidebar, AppMain },
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
  .app-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>