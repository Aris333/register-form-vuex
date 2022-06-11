import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/RegisterForm.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/studentList',
    name: 'StudentList',
    component: () => import(/* webpackChunkName: "about" */ '../views/StudentList.vue')
  },
  {
    path: '*',
    name: 'Page Not Found',
    component: () => import('../components/PageNotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
