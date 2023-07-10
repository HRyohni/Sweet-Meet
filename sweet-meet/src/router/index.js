import Vue from 'vue'
import VueRouter from 'vue-router'
            // View Imports
import profile from '../views/profileView.vue'
import mainView from "../views/mainView.vue";
import login from '../views/LoginView.vue';
import register from '../views/RegisterView.vue';
import info from '../views/infoView.vue';
import landingPage from '../views/landingPageView.vue'


Vue.use(VueRouter)

const routes = [
    {
        path: '/feed',
        name: 'main',
        component: mainView
    },
    {
        path: '/',
        name: 'landingPage',
        component: landingPage
    },

    {
        path: '/info',
        name: 'info',
        component: info
    },
    {
        path: '/register',
        name: 'register',
        component: register
    },
    {
        path: '/login',
        name: 'login',
        component: login
    },
    {
        path: '/profile/:id',
        name: 'profile',
        component: profile
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
