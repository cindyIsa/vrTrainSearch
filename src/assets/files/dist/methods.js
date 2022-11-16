"use strict";
exports.__esModule = true;
exports.getShortName = void 0;
var citieslib_1 = require("../files/citieslib");
exports.getShortName = function (target) {
    var newValue = '';
    Object.entries(citieslib_1.abbres).forEach(function (_a) {
        var short = _a[0], long = _a[1];
        if (target.trim().toLowerCase() == long.trim().toLowerCase()) {
            newValue = short;
            return;
        }
    });
    return newValue;
};
