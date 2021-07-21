"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDropIfAvailable = exports.useDragIfAvailable = exports.useDndContextAvailable = void 0;
var react_1 = require("react");
var react_dnd_1 = require("react-dnd");
var useDndContextAvailable = function () {
    var dndContext = react_1.useContext(react_dnd_1.DndContext);
    var dragDropManager = dndContext.dragDropManager;
    return !!dragDropManager;
};
exports.useDndContextAvailable = useDndContextAvailable;
var useDragIfAvailable = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    // This is an ugly hack to make `useDrag` not throw if a `DndContext` is not available.
    // See: https://github.com/react-dnd/react-dnd/issues/2212
    var dndContextAvailable = exports.useDndContextAvailable();
    var mockHook = react_1.useCallback(function () { return [{}, function () { return null; }, function () { return null; }]; }, []);
    // @ts-ignore
    var useHook = dndContextAvailable ? react_dnd_1.useDrag : mockHook;
    return useHook.apply(void 0, args);
};
exports.useDragIfAvailable = useDragIfAvailable;
var useDropIfAvailable = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var dndContextAvailable = exports.useDndContextAvailable();
    var mockHook = react_1.useCallback(function () { return [{}, function () { return null; }]; }, []);
    // @ts-ignore
    var useHook = dndContextAvailable ? react_dnd_1.useDrop : mockHook;
    return useHook.apply(void 0, args);
};
exports.useDropIfAvailable = useDropIfAvailable;
