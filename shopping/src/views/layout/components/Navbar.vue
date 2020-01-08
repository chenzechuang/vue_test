<template>
  <div class="navbar">
    <hamburger :toggle-click="toggleSidebar" :is-active="sidebar.opened" class="hamburger-container"></hamburger>
    <breadcrumb class="breadcrumb-container" />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Hamburger from '@/components/Hamburger'
  import Breadcrumb from '@/components/Breadcrumb'
  export default {
    name: 'Navbar',
    components: {
      Hamburger,
      Breadcrumb
    },
    computed: {
      ...mapGetters([
        'sidebar'
      ]),
    },
    methods: {
      toggleSidebar() {
        this.$store.dispatch('toggleSidebar');
      }
    },
  }
</script>

<style lang="scss" scoped>
  .navbar {
    height: 50px;
    overflow: hidden;
    .hamburger-container {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 15px;
      float: left;
      cursor: pointer;
      transition: background .3s;
      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }
    .breadcrumb-container {
      display: flex;
      align-items: center;
      height: 100%;
      float: left;
    }
  }
</style>