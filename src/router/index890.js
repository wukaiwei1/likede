import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
// 静态路由
export const constantRoutes = [
  // login
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },
  // 404
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true,
  },
  // 首页
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '立可得', icon: 'dashboard' },
      },
    ],
  },
  // 工单
  {
    path: '/dispatch',
    component: Layout,
    redirect: '/dispatch/operate',
    meta: { title: '工单管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'operate',
        component: () => import('@/views/DispatchList/Operate'),
        meta: { title: '运营工单', icon: 'table' },
      },
      {
        path: 'operations',
        component: () => import('@/views/DispatchList/Operations'),
        meta: { title: '运维工单', icon: 'tree' },
      },
    ],
  },
  // 点位管理
  {
    path: '/point',
    component: Layout,
    redirect: '/point/area',
    meta: {
      title: '点位管理',
      icon: 'nested',
    },
    children: [
      {
        path: 'area',
        component: () => import('@/views/gssp/AreaController'), // Parent router-view
        meta: { title: '区域管理' },
      },
      {
        path: 'point',
        component: () => import('@/views/gssp/point'),
        meta: { title: '点位管理' },
      },
      {
        path: 'Partners',
        component: () => import('@/views/gssp/Partners'),
        meta: { title: '合作商管理' },
      },
    ],
  },
  // // 设备管理
  // {
  //   path: '/Device',
  //   component: Layout,
  //   redirect: '/Device/menu1',
  //   meta: {
  //     title: '设备管理',
  //     icon: 'nested',
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       meta: { title: '设备管理' },
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: '设备状态' },
  //     },
  //     {
  //       path: 'menu3',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: '设置类型管理' },
  //     },
  //   ],
  // },
  // // 人员管理
  // {
  //   path: '/people',
  //   component: Layout,
  //   redirect: '/people/menu1',
  //   meta: {
  //     title: '人员管理',
  //     icon: 'nested',
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       meta: { title: '人员列表' },
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: '人效统计' },
  //     },
  //     {
  //       path: 'menu3',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: '工作量列表' },
  //     },
  //   ],
  // },
  // // 商品管理
  // {
  //   path: '/goods',
  //   component: Layout,
  //   redirect: '/goods/menu1',
  //   meta: {
  //     title: '商品管理',
  //     icon: 'nested',
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       meta: { title: '商品类型' },
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: '商品管理' },
  //     },
  //   ],
  // },
  // // 策略管理
  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: '策略管理', icon: 'form' },
  //     },
  //   ],
  // },
  // // 订单管理
  // {
  //   path: '/menu',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: '订单管理', icon: 'link' },
  //     },
  //   ],
  // },
  // // 对账管理
  // {
  //   path: '/checking',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: '对账管理', icon: 'link' },
  //     },
  //   ],
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true },
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
