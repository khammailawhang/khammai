import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Register from '../views/Register.vue'

import Team from '../views/Team.vue'

Vue.use(VueRouter)

const routes = [
        // {
        //     path: "/",
        // },
        // {
        //     path: "/:lang",
        //     component: {
        //         render(c) {
        //             return c("router-view");
        //         }
        //     },
        //     children: [{
        //             path: "/login",
        //             name: "login",
        //             component: Login
        //         },
        {
            path: '/',
            name: 'dashboard',
            component: Dashboard
        },

        {
            path: '/register',
            name: 'register',
            component: Register


        },
        // {
        //     path: '/create',
        //     name: 'create',
        //     component: Create
        //         // component: () =>
        //         //     import ( /* webpackChunkName: "about" */ '../compinents/register/Create.vue')
        // },


        {
            path: '/team',
            name: 'team',
            component: Team
        }
    ]
    //     }
    // ]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router