"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInstanceVariable = exports.useStaticValue = exports.useDebounce = void 0;
var react_1 = require("react");
var useDebounce = function (value, delay) {
    var _a = (0, react_1.useState)(value), debouncedValue = _a[0], setDebouncedValue = _a[1];
    (0, react_1.useEffect)(function () {
        var handler = setTimeout(function () {
            setDebouncedValue(value);
        }, delay);
        return function () {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return [debouncedValue, setDebouncedValue];
};
exports.useDebounce = useDebounce;
var UNINITIALIZED_SENTINEL = {};
var useStaticValue = function (factory) {
    var valueRef = (0, react_1.useRef)(UNINITIALIZED_SENTINEL);
    if (valueRef.current === UNINITIALIZED_SENTINEL)
        valueRef.current = factory();
    return valueRef.current;
};
exports.useStaticValue = useStaticValue;
var useInstanceVariable = function (value) {
    var ref = (0, react_1.useRef)(value);
    (0, react_1.useEffect)(function () {
        ref.current = value;
    }, [ref, value]);
    return ref;
};
exports.useInstanceVariable = useInstanceVariable;
