"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var App_vue_1 = require("./App.vue");
var router_1 = require("./router");
var store_1 = require("./store");
var app = vue_1.createApp(App_vue_1["default"]);
app.use(store_1["default"]).use(router_1["default"]);
router_1["default"].isReady().then(function () {
    app.mount('#app');
});
