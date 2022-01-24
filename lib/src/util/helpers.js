"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValueOrFallback = exports.elementIsInsideButton = exports.findElementAmongAncestors = exports.defineFileAction = exports.isPromise = exports.NOOP_FUNCTION = void 0;
var logger_1 = require("./logger");
// Used in contexts that need to provide some default value for a function.
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
var NOOP_FUNCTION = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    logger_1.Logger.warn("The \"NOOP_FUNCTION\" from the constants module was called. " +
        "This can indicate a bug in one of the components. Supplied args:", args);
};
exports.NOOP_FUNCTION = NOOP_FUNCTION;
var isPromise = function (value) {
    if (typeof value !== 'object' || !value)
        return false;
    var then = value.then;
    return then && typeof then === 'function';
};
exports.isPromise = isPromise;
var defineFileAction = function (action, effect) {
    if (action.__payloadType !== undefined && (action.hotkeys || action.button)) {
        var errorMessage = "Invalid definition was provided for file action \"".concat(action.id, "\". Actions ") +
            "that specify hotkeys or buttons cannot define a payload type. If " +
            "your application requires this functionality, define two actions " +
            "and chain them using effects.";
        logger_1.Logger.error(errorMessage);
        throw new Error(errorMessage);
    }
    action.effect = effect;
    return action;
};
exports.defineFileAction = defineFileAction;
/**
 * Recursively check the current element and the parent elements, going bottom-up.
 * Returns the first element to match the predicate, otherwise returns null if such
 * element is not found.
 */
var findElementAmongAncestors = function (maybeElement, predicate) {
    if (!maybeElement)
        return maybeElement;
    if (predicate(maybeElement))
        return maybeElement;
    if (maybeElement.parentElement) {
        return (0, exports.findElementAmongAncestors)(maybeElement.parentElement, predicate);
    }
    return null;
};
exports.findElementAmongAncestors = findElementAmongAncestors;
var elementIsInsideButton = function (buttonCandidate) {
    return !!(0, exports.findElementAmongAncestors)(buttonCandidate, function (element) { return element.tagName && element.tagName.toLowerCase() === 'button'; });
};
exports.elementIsInsideButton = elementIsInsideButton;
var getValueOrFallback = function (value, fallback, desiredType) {
    if (desiredType) {
        return typeof value === desiredType ? value : fallback;
    }
    return value !== undefined ? value : fallback;
};
exports.getValueOrFallback = getValueOrFallback;
