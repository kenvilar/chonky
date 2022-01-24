"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFileBrowserHandle = void 0;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var reducers_1 = require("../redux/reducers");
var selectors_1 = require("../redux/selectors");
var dispatchers_thunks_1 = require("../redux/thunks/dispatchers.thunks");
var useFileBrowserHandle = function (ref) {
    var store = (0, react_redux_1.useStore)();
    var dispatch = (0, react_redux_1.useDispatch)();
    (0, react_1.useImperativeHandle)(ref, function () { return ({
        getFileSelection: function () {
            var selectionMap = (0, selectors_1.selectSelectionMap)(store.getState());
            var selectionSet = new Set(Object.keys(selectionMap));
            return selectionSet;
        },
        setFileSelection: function (selection, reset) {
            if (reset === void 0) { reset = true; }
            var fileIds = Array.from(selection);
            dispatch(reducers_1.reduxActions.selectFiles({ fileIds: fileIds, reset: reset }));
        },
        requestFileAction: function (action, payload) {
            return Promise.resolve(dispatch((0, dispatchers_thunks_1.thunkRequestFileAction)(action, payload))).then();
        },
    }); }, [store, dispatch]);
};
exports.useFileBrowserHandle = useFileBrowserHandle;
