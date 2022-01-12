import * as VueRouter from 'vue-router'
const Home = () => import('@/view/Home.vue')

const routes = [
  {
    path: '/',
    component: Home
  }
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
})

export default router