import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import profile from '../views/profileView.vue'
import  mainView  from "../views/mainView.vue";
import login from '../views/LoginView.vue';
import register from '../views/RegisterView.vue';


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main', // kako god hocu
    component: mainView
  },
  {
    path: '/register',
    name: 'register', // kako god hocu
    component: register
  },
  {
    path: '/login',
    name: 'login', // kako god hocu
    component: login
  },
  {
    path: '/profile',
    name: 'profile', // kako god hocu
    component: profile
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
