<template>
  <div class="navbar">
    <div class="navbar-title">
      <svg-icon :icon-class="iconClass" :class-name="className" />
      <span class="title-content">{{ systemTitle }}</span>
    </div>
    <el-menu
      :default-active="activeIndex2"
      class="navbar-menu"
      mode="horizontal"
      @select="handleSelect"
      background-color="transparent"
      text-color="#A4CDED"
      active-text-color="#2157A1"
    >
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-menu-item index="2">处理中心</el-menu-item>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
      <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
    </el-menu>
    <div class="tool-icon"></div>
    <div class="user-info">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <img class="user-img" :src="headerConfig.userImg" />
          <span class="user-name">{{ headerConfig.userName }}</span>
          <i class="el-icon-arrow-down el-icon--right" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="download">下载中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Navbar",
    data() {
      return {
        headerConfig: {
          menus: [
            {
              name: "办案中心",
              menuUrl: "/case_center"
            }
          ],
          userImg: "../images/head.png",
          userName: "CZC",
          // 0 非全屏 1 全屏
          fullScreenType: 0,
          requestFullScreen: function() {
            var self = this;
            if (!self.fullScreenType) {
              self.fullScreenType = 1;
            } else {
              self.fullScreenType = 0;
            }
          }
        },
        className: "logo",
        iconClass: "emblem",
        systemTitle: "执法精细化管理系统"
      };
    },
    methods: {
      handleSelect() {},
      handleCommand(command) {
        console.log("click on item " + command);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .navbar {
    display: flex;
    width: 100%;
    height: 90px;
    align-items: center;
    background: #152f52;
    color: #fff;
    .navbar-title {
      display: flex;
      align-items: center;
      padding-left: 15px;
      width: 450px;
      .logo {
        font-size: 60px;
      }
      .title-content {
        margin-left: 10px;
        font-size: 36px;
        font-weight: bold;
        letter-spacing: 4px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
    .navbar-menu {
      flex: 1;
      text-align: right;
      border: 0 none;
      display: flex;
      justify-content: flex-end;
      .el-menu-item {
        border-radius: 10px;
        font-size: 16px;
        &:hover {
          background: #235EAD !important;
        }
      }
    }
    .tool-icon {
      width: 110px;
      display: flex;
      align-items: center;
      .tool-item {
        list-style: none;
        padding: 0 10px;
        .tool-icon {
          font-size: 20px;
        }
      }
    }
    .user-info {
      width: 150px;
      .user-img {
        width: 30px;
        height: 30px;
        display: inline-block;
        vertical-align: middle;
        margin-right: 15px;
      }
      .user-name {
        display: inline-block;
        vertical-align: middle;
        color: #fff;
      }
    }
  }
</style>
