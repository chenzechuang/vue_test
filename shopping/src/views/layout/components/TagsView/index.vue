<template>
  <div class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <router-link 
        v-for="tag in visitedViews"
        :key="tag.path"
        ref="tag"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @click.middle.native="closeSelectedTag(tag)"
        @contextmenu.prevent.native="openMenu(tag, $event)"
      >
        {{ tag.title }}
        <span v-if="!tag.meta.affix" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)"></span>
      </router-link>
    </scroll-pane>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">refresh</li>
      <li v-if="!(selectedTag.meta && selectedTag.meta.affix)" @click="closeSelectedTag(selectedTag)">close</li>
      <li @click="closeOthersTags(selectedTag)">closeOthers</li>
      <li @click="closeAllTags(selectedTag)">closeAll</li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import ScrollPane from './ScrollPane'
  import path from 'path'
  export default {
    components: {
      ScrollPane
    },
    data() {
      return {
        visible: false,
        selectedTag: {},
        left: 0,
        top: 0,
        affixTags: []
      }
    },
    computed: {
      ...mapGetters([
        'visitedViews',
        'permission_routes'
      ])
    },
    watch: {
      $route() {
        this.addTags();
        this.moveToCurrentTag();
      },
      visible(value) {
        if (value) {
          document.addEventListener('click', this.closeMenu);
        } else {
          document.removeEventListener('click', this.closeMenu);
        }
      }
    },
    mounted() {
      this.initTags();
      this.addTags();
    },
    methods: {
      isActive(route) {
        return route.path === this.$route.path
      },
      filterAffixTags(routes, basePath = '/') {
        let tags = [];
        routes.forEach(route => {
          if (route.meta && route.meta.affix) {
            const tagPath = path.resolve(basePath, route.path);
            tags.push({
              path: tagPath,
              fullPath: tagPath,
              name: route.name,
              meta: { ...route.meta }
            })
          }
          if (route.children) {
            var tempTags = this.filterAffixTags(route.children, route.path);
            tags = [...tags, ...tempTags];
          }
        })
        return tags;
      },
      initTags() {
        var affixTags = this.affixTags = this.filterAffixTags(this.permission_routes);
        for (const tag of affixTags) {
          if (tag.name) {
            this.$store.dispatch('addVisitedView', tag);
          }
        }
      },
      addTags() {
        const { name } = this.$route
        if (name) {
          this.$store.dispatch('addView', this.$route)
        }
        return false
      },
      moveToCurrentTag() {
        const tags = this.$refs.tag;
        this.$nextTick(() => {
          for (const tag of tags) {
            if (tag.to.path === this.$route.path) {
              this.$refs.scrollPane.moveToTarget(tag);
            }
          }
        })
      },
      refreshSelectedTag(view) {
        this.$store.dispatch('delCachedView', view).then(() => {
          const { fullPath } = view;
          this.$nextTick(() => {
            this.$router.replace({
              path: '/redirect' + fullPath
            })
          })
        })
      },
      closeSelectedTag(view) {
        this.$store.dispatch('delView', view).then(({visitedViews}) => {
          if (this.isActive(view)) {
            this.toLastetView(visitedViews);
          }
        });
      },
      closeOthersTags(view) {
        if (!this.isActive(view)) {
          this.$router.push(view);
        }
        this.$store.dispatch('delOthersViews', view).then(() => {
          this.moveToCurrentTag()
        })
      },
      closeAllTags() {
        this.$store.dispatch('delAllViews').then(({visitedViews}) => {
          if (visitedViews.length) {
            this.toLastetView(visitedViews);
          }
        });
      },
      toLastetView(visitedViews) {
        const lastetView = visitedViews.slice(-1)[0];
        if (lastetView) {
          this.$router.push(lastetView);
        } else {
          this.$router.push('/');
        }
      },
      openMenu(tag, e) {
        const minMenuWidth = 105;
        const offsetWidth = this.$el.offsetWidth; 
        const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
        const maxLeft = offsetWidth - minMenuWidth;
        const left = e.clientX - offsetLeft + 15; // 15: margin right
        if (left > maxLeft) {
          this.left = maxLeft;
        } else {
          this.left = left;
        }
        this.top = e.clientY;
        this.visible = true;
        this.selectedTag = tag;
      },
      closeMenu() {
        this.visible = false;
      }
    },
  }
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 100;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all .3s cubic-bezier(.645, .045, .355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
