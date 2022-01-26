"use strict";
/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChonkyPresentationLayer = void 0;
var Box_1 = __importDefault(require("@material-ui/core/Box"));
var ClickAwayListener_1 = __importDefault(require("@material-ui/core/ClickAwayListener"));
var react_1 = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var reducers_1 = require("../../redux/reducers");
var selectors_1 = require("../../redux/selectors");
var dnd_fallback_1 = require("../../util/dnd-fallback");
var helpers_1 = require("../../util/helpers");
var styles_1 = require("../../util/styles");
var FileContextMenu_hooks_1 = require("../external/FileContextMenu-hooks");
var DnDFileListDragLayer_1 = require("../file-list/DnDFileListDragLayer");
var HotkeyListener_1 = require("./HotkeyListener");
exports.ChonkyPresentationLayer = function (_a) {
    var children = _a.children;
    var dispatch = react_redux_1.useDispatch();
    var fileActionIds = react_redux_1.useSelector(selectors_1.selectFileActionIds);
    var dndDisabled = react_redux_1.useSelector(selectors_1.selectIsDnDDisabled);
    var clearSelectionOnOutsideClick = react_redux_1.useSelector(selectors_1.selectClearSelectionOnOutsideClick);
    // Deal with clicks outside of Chonky
    var handleClickAway = react_1.useCallback(function (event) {
        if (!clearSelectionOnOutsideClick || helpers_1.elementIsInsideButton(event.target)) {
            // We only clear out the selection on outside click if the click target
            // was not a button. We don't want to clear out the selection when a
            // button is clicked because Chonky users might want to trigger some
            // selection-related action on that button click.
            return;
        }
        dispatch(reducers_1.reduxActions.clearSelection());
    }, [dispatch, clearSelectionOnOutsideClick]);
    // Generate necessary components
    var hotkeyListenerComponents = react_1.useMemo(function () {
        return fileActionIds.map(function (actionId) { return (react_1.default.createElement(HotkeyListener_1.HotkeyListener, { key: "file-action-listener-" + actionId, fileActionId: actionId })); });
    }, [fileActionIds]);
    var dndContextAvailable = dnd_fallback_1.useDndContextAvailable();
    var showContextMenu = FileContextMenu_hooks_1.useContextMenuTrigger();
    var classes = useStyles();
    return (react_1.default.createElement(ClickAwayListener_1.default, { onClickAway: handleClickAway },
        react_1.default.createElement(Box_1.default, { className: classes.chonkyRoot, onContextMenu: showContextMenu },
            !dndDisabled && dndContextAvailable && react_1.default.createElement(DnDFileListDragLayer_1.DnDFileListDragLayer, null),
            hotkeyListenerComponents,
            children ? children : null)));
};
var useStyles = styles_1.makeGlobalChonkyStyles(function (theme) { return ({
    chonkyRoot: {
        backgroundColor: theme.palette.background.paper,
        border: "solid 1px " + theme.palette.divider,
        padding: theme.margins.rootLayoutMargin,
        fontSize: theme.fontSizes.rootPrimary,
        color: theme.palette.text.primary,
        touchAction: 'manipulation',
        fontFamily: 'sans-serif',
        flexDirection: 'column',
        boxSizing: 'border-box',
        textAlign: 'left',
        borderRadius: 4,
        display: 'flex',
        height: '100%',
        // Disabling select
        webkitTouchCallout: 'none',
        webkitUserSelect: 'none',
        mozUserSelect: 'none',
        msUserSelect: 'none',
        userSelect: 'none',
    },
}); });
