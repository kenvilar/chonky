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
exports.FileContextMenu = void 0;
var ListSubheader_1 = __importDefault(require("@material-ui/core/ListSubheader"));
var Menu_1 = __importDefault(require("@material-ui/core/Menu"));
var react_1 = __importStar(require("react"));
var react_intl_1 = require("react-intl");
var react_redux_1 = require("react-redux");
var reducers_1 = require("../../redux/reducers");
var selectors_1 = require("../../redux/selectors");
var i18n_1 = require("../../util/i18n");
var styles_1 = require("../../util/styles");
var FileContextMenu_hooks_1 = require("./FileContextMenu-hooks");
var ToolbarDropdownButton_1 = require("./ToolbarDropdownButton");
exports.FileContextMenu = react_1.default.memo(function () {
    var dispatch = (0, react_redux_1.useDispatch)();
    (0, react_1.useEffect)(function () {
        dispatch(reducers_1.reduxActions.setContextMenuMounted(true));
        return function () {
            dispatch(reducers_1.reduxActions.setContextMenuMounted(false));
        };
    }, [dispatch]);
    var intl = (0, react_intl_1.useIntl)();
    var browserMenuShortcutString = intl.formatMessage({
        id: (0, i18n_1.getI18nId)(i18n_1.I18nNamespace.FileContextMenu, 'browserMenuShortcut'),
        defaultMessage: 'Browser menu: {shortcut}',
    }, { shortcut: react_1.default.createElement("strong", null, "Alt + Right Click") });
    var contextMenuConfig = (0, react_redux_1.useSelector)(selectors_1.selectContextMenuConfig);
    var contextMenuItems = (0, react_redux_1.useSelector)(selectors_1.selectContextMenuItems);
    var hideContextMenu = (0, FileContextMenu_hooks_1.useContextMenuDismisser)();
    var contextMenuItemComponents = (0, react_1.useMemo)(function () {
        var components = [];
        var _loop_1 = function (i) {
            var item = contextMenuItems[i];
            if (typeof item === 'string') {
                components.push(react_1.default.createElement(ToolbarDropdownButton_1.SmartToolbarDropdownButton, { key: "context-menu-item-".concat(item), fileActionId: item, onClickFollowUp: hideContextMenu }));
            }
            else {
                item.fileActionIds.map(function (id) {
                    return components.push(react_1.default.createElement(ToolbarDropdownButton_1.SmartToolbarDropdownButton, { key: "context-menu-item-".concat(item.name, "-").concat(id), fileActionId: id, onClickFollowUp: hideContextMenu }));
                });
            }
        };
        for (var i = 0; i < contextMenuItems.length; ++i) {
            _loop_1(i);
        }
        return components;
    }, [contextMenuItems, hideContextMenu]);
    var anchorPosition = (0, react_1.useMemo)(function () {
        return contextMenuConfig
            ? { top: contextMenuConfig.mouseY, left: contextMenuConfig.mouseX }
            : undefined;
    }, [contextMenuConfig]);
    var classes = useStyles();
    return (react_1.default.createElement(Menu_1.default, { keepMounted: true, elevation: 2, disablePortal: true, onClose: hideContextMenu, transitionDuration: 150, open: !!contextMenuConfig, anchorPosition: anchorPosition, anchorReference: "anchorPosition", classes: { list: classes.contextMenuList } },
        contextMenuItemComponents,
        react_1.default.createElement(ListSubheader_1.default, { component: "div", className: classes.browserMenuTooltip }, browserMenuShortcutString)));
});
var useStyles = (0, styles_1.makeGlobalChonkyStyles)(function (theme) { return ({
    contextMenuList: {
        paddingBottom: (0, styles_1.important)(0),
        paddingTop: (0, styles_1.important)(0),
    },
    browserMenuTooltip: {
        lineHeight: (0, styles_1.important)('30px'),
        fontSize: (0, styles_1.important)('0.7em'),
    },
}); });
