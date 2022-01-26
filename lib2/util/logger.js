"use strict";
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
        // 'kv-custom-chonky' console.error('[Chonky runtime error]', ...args);
    };
    Logger.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // eslint-disable-next-line no-console
        // 'kv-custom-chonky' console.warn('[Chonky runtime warning]', ...args);
    };
    Logger.debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // eslint-disable-next-line no-console
        // 'kv-custom-chonky' console.debug('[Chonky runtime debug]', ...args);
    };
    Logger.formatBullets = function (bullets) {
        return "\n- " + bullets.join('\n- ');
    };
    return Logger;
}());
exports.Logger = Logger;
