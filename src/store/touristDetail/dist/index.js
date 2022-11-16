"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var personType_1 = require("../../assets/files/personType");
exports["default"] = {
    namespaced: true,
    state: {
        tourists: [
            {
                touristValue: personType_1.personType.adult,
                withPet: 0,
                withBycicle: 0
            },
        ]
    },
    actions: {},
    mutations: {
        UPDATE_NEW_PERSON: function (state, value) {
            state.tourists = __spreadArrays(value);
        }
    },
    getters: {
        getDetailNumber: function (state) {
            return state.tourists.length;
        },
        getNumberByTag: function (state) {
            return function (param) {
                var num = 0;
                state.tourists.forEach(function (d) {
                    num += d[param];
                });
                return num;
            };
        }
    }
};
