<template>
  <div class="header-container">
    <div class="header-left">
      <img src="@/images/logo.png" alt="">
      <div class="header-title">智能审讯系统</div>
    </div>
    <div class="header-center">
      <ul class="main-menu">
        <li
          v-for="(item, index) in headerConfig.menus"
          :title="item.name"
          :key="index"
          @click="headerConfig.activeMenu(item,headerConfig.menusMap[item.menuCode])"
        >{{ item.name }}</li>
      </ul>
    </div>
    <ul class="header-tool">
      <li class="tool-item">
        <span class="tool-icon el-icon-zoom-in" @click="headerConfig.requestFullScreen()"/>
      </li>
    </ul>
    <div class="header-right">
      <!--系统操作-->
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <img class="user-img" src="@/images/head.png">
          <span class="user-name">{{ headerConfig.userName }}</span>
          <i class="el-icon-arrow-down el-icon--right"/>
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
  data() {
    return {
      headerConfig: {
        menus: [{
          name: '办案中心',
          menuUrl: '/case_center'
        }],
        userName: 'CZC',
        // 0 非全屏 1 全屏
        fullScreenType: 0,
        requestFullScreen: function() {
          var self = this
          if (!self.fullScreenType) {
            self.fullScreenType = 1
          } else {
            self.fullScreenType = 0
          }
        }
      }
    }
  },
  methods: {
    handleCommand(command) {
      console.log('click on item ' + command)
    }
  }
}
</script>
<style lang="scss">
    .header-container {
        display: flex;
        width: 100%;
        height: 90px;
        align-items: center;
        background: #152F52;
        color: #fff;
        .header-left {
            display: flex;
            align-items: center;
            padding-left: 15px;
            width: 400px;
            .header-title {
                margin-left: 10px;
                font-size: 36px;
                font-weight: bold;
                letter-spacing: 4px;
            }
        }
        .header-center {
            flex: 1;
            text-align: right;
        }
        .header-tool {
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
        .header-right {
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
