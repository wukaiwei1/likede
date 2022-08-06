import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true,
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/index'),
        meta: { title: '帝可得', icon: 'el-icon-s-home' },
      },
    ],
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '工单管理', icon: 'el-icon-tickets' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '运营工单' },
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '运维工单' },
      },
    ],
  },

  {
    path: '/node',
    component: Layout,
    redirect: '/node/region',
    meta: {
      title: '点位管理',
      icon: 'el-icon-map-location',
    },
    children: [
      {
        path: 'region',
        component: () => import('@/views/address/region/index'), // Parent router-view
        name: 'region',
        meta: { title: '区域管理' },
      },
      {
        path: 'node',
        component: () => import('@/views/address/node/index'),
        name: 'node',
        meta: { title: '点位管理' },
      },
      {
        path: 'partner',
        component: () => import('@/views/address/partner/index'),
        name: 'partner',
        meta: { title: '合作商管理' },
      },
    ],
  },
  {
    path: '/vm',
    component: Layout,
    redirect: '/vm/index',
    name: 'vm',
    meta: {
      title: '设备管理',
      icon: 'el-icon-lollipop',
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/vm/index/index'), // Parent router-view
        name: 'index',
        meta: { title: '设备管理' },
      },
      {
        path: 'status',
        component: () => import('@/views/vm/status/index'),
        name: 'status',
        meta: { title: '设备状态' },
      },
      {
        path: 'type',
        component: () => import('@/views/vm/type/index'),
        name: 'type',
        meta: { title: '设置类型管理' },
      },
    ],
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    name: 'user',
    meta: {
      title: '人员管理',
      icon: 'el-icon-user',
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/user/index/index'), // Parent router-view
        name: 'index-a',
        meta: { title: '人员列表' },
      },
      {
        path: 'user-task-stats',
        component: () => import('@/views/user/taskStats/index'),
        name: 'user-task-stats',
        meta: { title: '人效统计' },
      },
      {
        path: 'user-work',
        component: () => import('@/views/user/work/index'),
        name: 'user-work',
        meta: { title: '工作量列表' },
      },
    ],
  },
  {
    path: '/sku',
    component: Layout,
    redirect: '/sku/sku-class',
    meta: {
      title: '商品管理',
      icon: 'el-icon-goods',
    },
    children: [
      {
        path: 'sku-class',
        component: () => import('@/views/sku/class/index'), // Parent router-view
        name: 'sku-class',
        meta: { title: '商品类型' },
      },
      {
        path: 'sku',
        component: () => import('@/views/sku/sku/index'),
        name: 'sku',
        meta: { title: '商品管理' },
      },
    ],
  },
  {
    path: '/policy',
    component: Layout,
    redirect: '/policy/index',
    children: [
      {
        path: 'index',
        name: 'indexPO',
        component: () => import('@/views/policy/index'),
        meta: { title: '策略管理', icon: 'el-icon-table-lamp' },
      },
    ],
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/order/order',
    children: [
      {
        path: 'order',
        name: 'order',
        component: () => import('@/views/order/index'),
        meta: { title: '订单管理', icon: 'el-icon-collection' },
      },
    ],
  },
  {
    path: '/report',
    component: Layout,
    children: [
      {
        path: 'report',
        name: 'report',
        component: () => import('@/views/report/index'),
        meta: { title: '对账管理', icon: 'el-icon-data-analysis' },
      },
    ],
  },

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
