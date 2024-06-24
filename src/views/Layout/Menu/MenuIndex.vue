<template>
  <el-menu :collapse="isCollapse"
      :default-active="$route.path"
      router
      class="el-menu-vertical-demo"
      :collapse-transition="false"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">系统首页</span>
      </el-menu-item>
      <el-submenu index="/goods">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">产品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/goods/list">产品列表</el-menu-item>
          <el-menu-item index="/goods/category">产品分类</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/order">
        <i class="el-icon-document"></i>
        <span slot="title">订单列表</span>
      </el-menu-item>
      <el-menu-item index="" disabled>
        <i class="el-icon-setting"></i>
        <span slot="title">部门管理</span>
      </el-menu-item>
    </el-menu>
  </template>

<script>
export default {
  name: 'MenuIndex',
  props: ['isCollapse'],
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style>
.el-menu {
  border-right:solid 0px #e6e6e6 !important;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width:200px;
  min-height:400px;
}
.el-menu .is-active{
background: #1e78bf !important;
color: #fff !important;
}
</style>
