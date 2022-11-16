import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import TicketView from '@/views/TicketView.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/ticket/:from/:to/:date',
        name: 'ticket',
        component: TicketView,
    },
    //   {
    //     path: "/about",
    //     name: "about",
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () =>
    //       import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
    //   },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
