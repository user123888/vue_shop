<template>
<div class="layout">
  <!-- 左侧导航 -->
  <div class="menu">
  <Menu :isCollapse="isCollapse"></Menu>
  </div>
<!-- 右侧内容 -->
  <div class="content" :class="{active:isCollapse}">
  <Content @changeMenu="changeMenu" :isCollapse="isCollapse"></Content>
  </div>
</div>
</template>

<script>
import Menu from '@/views/Layout/Menu/MenuIndex'
import Content from '@/views/Layout/Content/ContentIndex'
export default {
  name: 'LayoutIndex',
  components: {
    Menu,
    Content
  },
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    changeMenu () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>
<style lang="less" scoped>

.layout {
  .menu {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    // width: 200px;
    background: #545c64;
  }
  .content {
    padding-left: 200px;
transition: width  .5s linear ;
  }
  .active {
  padding-left: 64px;
}
}
</style>
