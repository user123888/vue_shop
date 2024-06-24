import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout/LayoutIndex'
import Login from '@/views/Login/LoginIndex'
import Home from '@/views/Home/HomeIndex'
import GoodsManage from '@/views/GoodsManage/GoodsManage'
import List from '@/views/GoodsManage/List/GoodsList'
import Category from '@/views/GoodsManage/Category/CategoryIndex'
import OrderManage from '@/views/OrderManage/OrderManage'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: '/goods',
        name: 'goods',
        component: GoodsManage,
        children: [
          {
            path: 'list',
            name: 'list',
            component: List
          },
          {
            path: 'category',
            name: 'category',
            component: Category
          }
        ]
      },
      {
        path: '/order',
        name: 'order',
        component: OrderManage
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
