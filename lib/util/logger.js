"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // eslint-disable-next-line no-console
        console.error.apply(console, __spreadArray(['[Chonky runtime error]'], args));
    };
    Logger.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // eslint-disable-next-line no-console
        console.warn.apply(console, __spreadArray(['[Chonky runtime warning]'], args));
    };
    Logger.debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // eslint-disable-next-line no-console
        console.debug.apply(console, __spreadArray(['[Chonky runtime debug]'], args));
    };
    Logger.formatBullets = function (bullets) {
        return "\n- " + bullets.join('\n- ');
    };
    return Logger;
}());
exports.Logger = Logger;
