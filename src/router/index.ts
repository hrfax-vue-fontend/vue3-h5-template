/*
 * @Author: your name
 * @Date: 2020-12-17 11:40:12
 * @LastEditTime: 2020-12-23 14:36:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-vue3\src\router\index.ts
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/authVerify'
  },
  {
    path: '/home',
    name: 'Home',
    meta: {
      title: '首页',
      hideBack: true
    },
    component: Home
  },
  // 授权验证
  {
    path: '/authVerify',
    name: 'AuthVerify',
    meta: {
      title: '获取授权',
      hideBack: true
    },
    component: () => import('../views/AuthVerify.vue')
  },
  // 信息录入
  {
    path: '/infoInput',
    name: 'InfoInput',
    meta: {
      title: '主借款人信息'
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/InfoInput.vue')
  },
  // 申请结束
  {
    path: '/finished',
    name: 'Finished',
    meta: {
      title: '申请结果',
      hideBack: true
    },
    component: () => import('../views/Finished.vue')
  }  
]

const router = createRouter({
  // history: createWebHistory(process.env.VUE_APP_BASE_API),
  history: createWebHistory(),
  routes
})

export default router
