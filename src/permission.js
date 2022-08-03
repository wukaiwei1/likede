// 权限控制
import router from '@/router'
import store from '@/store'

// 白名单（不用登录也能访问）
const whiteList = ['/login', '/404']
router.beforeEach((to, from, next) => {
  const token = store.state.user.token
  if (token) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    const iscludes = whiteList.includes(to.path)
    if (iscludes) {
      next()
    } else {
      next('/login')
    }
  }
})
