<template>
    <div :class="classObj" class="app-wrapper">
      <sidebar class="sidebar-container" />
      <div class="main-container">
        <navbar />
        <tags-view />
        <app-main />
      </div>
    </div>
</template>

<script>
  import { Sidebar, Navbar, TagsView, AppMain } from './components'
  export default {
    name: 'Layout',
    components: { Navbar, Sidebar, TagsView, AppMain },
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