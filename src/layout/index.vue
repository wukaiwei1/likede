<template>
  <div :class="classObj" class="app-wrapper">
    <!-- <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    /> -->
    <!-- 侧边栏 -->
    <sidebar class="sidebar-container" />
    <!-- 头部组件 -->
    <navbar />
    <!-- 头部部分 -->
    <div class="main-container">
      <!-- 主体头部 -->
      <!-- <div :class="{ 'fixed-header': fixedHeader }"></div> -->
      <!-- 二级路由占位组件 -->
      <app-main />
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
  },
  mixins: [ResizeMixin],
  created() {
    // 获取用户详细请求
    this.$store.dispatch('user/getUserInfo')
  },
  computed: {
    sidebar() {
      // return this.$store.state.app.sidebar
    },
    device() {
      // return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        mobile: this.device === 'mobile',
      }
    },
  },
  methods: {
    handleClickOutside() {},
  },
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';
#app .main-container {
  margin-left: 165px;
}
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.main-container {
  margin-top: 60px;
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
