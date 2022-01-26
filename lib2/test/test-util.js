"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = void 0;
var sleep = function (timeout) {
    return new Promise(function (resolve) { return setTimeout(resolve, timeout); });
};
exports.sleep = sleep;
