import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import  mainView  from "../views/mainView.vue";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main', // kako god hocu
    component: mainView
  },

  {
    path: '/frontPage',
    name: 'frontPage', // kako god hocu
    component: () => import(/* webpackChunkName: "about" */ '../views/frontPage.vue')
  },
  {
    path: '/login',
    name: 'LoginView', // kako god hocu
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  },

  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
