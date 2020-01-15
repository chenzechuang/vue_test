<template>
  <div class="app-container">
    <el-tag>mounted times：{{ createdTimes }}</el-tag>
    <el-tabs v-model="activeName" :closable="false">
      <el-tab-pane v-for="item in tabMapOptions" :key="item.label" :label="item.label" :name="item.key">
        <keep-alive>
          <tab-pane v-if="activeName==item.key" :type="item.key" @create="showCreatedTimes" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import TabPane from './components/TabPane'
  export default {
    components: {
      TabPane
    },
    data() {
      return {
        tabMapOptions: [
          { label: 'China', key: 'CN' },
          { label: 'USA', key: 'US' },
          { label: 'Japan', key: 'JP' },
          { label: 'Eurozone', key: 'EU' }
        ],
        activeName: 'CN',
        createdTimes: 0
      }
    },
    methods: {
      showCreatedTimes() {
        this.createdTimes++;
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>