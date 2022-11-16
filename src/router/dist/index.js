"use strict";
exports.__esModule = true;
var vue_router_1 = require("vue-router");
var TicketView_vue_1 = require("@/views/TicketView.vue");
var routes = [
    {
        path: '/ticket/:from/:to/:date',
        name: 'ticket',
        component: TicketView_vue_1["default"]
    },
];
var router = vue_router_1.createRouter({
    history: vue_router_1.createWebHistory(process.env.BASE_URL),
    routes: routes
});
exports["default"] = router;
