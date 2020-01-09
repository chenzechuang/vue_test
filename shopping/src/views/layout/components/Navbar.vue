<template>
  <div class="navbar">
    <hamburger :toggle-click="toggleSidebar" :is-active="sidebar.opened" class="hamburger-container"></hamburger>
    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar class="user-avatar" icon="el-icon-user-solid"></el-avatar>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/Dashboard">
            <el-dropdown-item>Dashboard</el-dropdown-item>
          </router-link>
          <el-dropdown-item>
            <span style="display:block;" @click="logout">logout</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    
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
      },
      logout() {
        this.$store.dispatch('LogOut').then(() => {
          location.reload();
        })
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
    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;
      &:focus {
        outline: none;
      }
      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;
        &.hover-effect {
          cursor: pointer;
          transition: background .3s;
          &:hover {
            background: rgba(0, 0, 0, .025)
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>