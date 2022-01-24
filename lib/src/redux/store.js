"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDTE = exports.useParamSelector = exports.useChonkyStore = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var hooks_helpers_1 = require("../util/hooks-helpers");
var middleware_1 = require("./middleware");
var reducers_1 = require("./reducers");
var state_1 = require("./state");
var watchers_1 = require("./watchers");
var useChonkyStore = function (chonkyInstanceId) {
    var store = (0, hooks_helpers_1.useStaticValue)(function () {
        var preloadedState = __assign(__assign({}, state_1.initialRootState), { instanceId: chonkyInstanceId });
        var thunkExtraArgument = new middleware_1.ThunkExtraArgument();
        return (0, toolkit_1.configureStore)({
            preloadedState: preloadedState,
            reducer: reducers_1.rootReducer,
            middleware: function (getDefaultMiddleware) {
                return getDefaultMiddleware({
                    serializableCheck: false,
                    thunk: { extraArgument: thunkExtraArgument },
                });
            },
            devTools: { name: "chonky_".concat(chonkyInstanceId) },
        });
    });
    (0, watchers_1.useStoreWatchers)(store);
    return store;
};
exports.useChonkyStore = useChonkyStore;
/**
 * Hook that can be used with parametrized selectors.
 */
var useParamSelector = function (parametrizedSelector) {
    var selectorParams = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        selectorParams[_i - 1] = arguments[_i];
    }
    var selector = (0, react_1.useCallback)(function (state) { return parametrizedSelector.apply(void 0, selectorParams)(state); }, __spreadArray([parametrizedSelector], selectorParams, true));
    return (0, react_redux_1.useSelector)(selector);
};
exports.useParamSelector = useParamSelector;
/**
 * DTE - DispatchThunkEffect. This method is used to decrease code duplication in
 * main Chonky method.
 */
var useDTE = function (actionCreator) {
    var selectorParams = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        selectorParams[_i - 1] = arguments[_i];
    }
    var dispatch = (0, react_redux_1.useDispatch)();
    (0, react_1.useEffect)(function () {
        dispatch(actionCreator.apply(void 0, selectorParams));
    }, __spreadArray([dispatch, actionCreator], selectorParams, true));
};
exports.useDTE = useDTE;
