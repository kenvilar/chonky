"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useContextMenuDismisser = exports.useContextMenuTrigger = exports.findClosestChonkyFileId = void 0;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var index_1 = require("../../action-definitions/index");
var reducers_1 = require("../../redux/reducers");
var selectors_1 = require("../../redux/selectors");
var dispatchers_thunks_1 = require("../../redux/thunks/dispatchers.thunks");
var helpers_1 = require("../../util/helpers");
var hooks_helpers_1 = require("../../util/hooks-helpers");
var findClosestChonkyFileId = function (element) {
    var fileEntryWrapperDiv = (0, helpers_1.findElementAmongAncestors)(element, function (element) {
        return element.tagName &&
            element.tagName.toLowerCase() === 'div' &&
            element.dataset &&
            element.dataset.chonkyFileId;
    });
    return fileEntryWrapperDiv ? fileEntryWrapperDiv.dataset.chonkyFileId : null;
};
exports.findClosestChonkyFileId = findClosestChonkyFileId;
var useContextMenuTrigger = function () {
    var dispatch = (0, react_redux_1.useDispatch)();
    var contextMenuMountedRef = (0, hooks_helpers_1.useInstanceVariable)((0, react_redux_1.useSelector)(selectors_1.selectContextMenuMounted));
    return (0, react_1.useCallback)(function (event) {
        // Use default browser context menu when Chonky context menu component
        // is not mounted.
        if (!contextMenuMountedRef.current)
            return;
        // Users can use Alt+Right Click to bring up browser's default
        // context menu instead of Chonky's context menu.
        if (event.altKey)
            return;
        event.preventDefault();
        var triggerFileId = (0, exports.findClosestChonkyFileId)(event.target);
        dispatch((0, dispatchers_thunks_1.thunkRequestFileAction)(index_1.ChonkyActions.OpenFileContextMenu, {
            clientX: event.clientX,
            clientY: event.clientY,
            triggerFileId: triggerFileId,
        }));
    }, [contextMenuMountedRef, dispatch]);
};
exports.useContextMenuTrigger = useContextMenuTrigger;
var useContextMenuDismisser = function () {
    var dispatch = (0, react_redux_1.useDispatch)();
    return (0, react_1.useCallback)(function () { return dispatch(reducers_1.reduxActions.hideContextMenu()); }, [dispatch]);
};
exports.useContextMenuDismisser = useContextMenuDismisser;
