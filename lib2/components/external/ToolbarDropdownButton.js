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
exports.SmartToolbarDropdownButton = exports.ToolbarDropdownButton = void 0;
var ListItemIcon_1 = __importDefault(require("@material-ui/core/ListItemIcon"));
var ListItemText_1 = __importDefault(require("@material-ui/core/ListItemText"));
var MenuItem_1 = __importDefault(require("@material-ui/core/MenuItem"));
var react_1 = __importStar(require("react"));
var selectors_1 = require("../../redux/selectors");
var store_1 = require("../../redux/store");
var file_actions_1 = require("../../util/file-actions");
var i18n_1 = require("../../util/i18n");
var icon_helper_1 = require("../../util/icon-helper");
var styles_1 = require("../../util/styles");
exports.ToolbarDropdownButton = react_1.default.forwardRef(function (props, ref) {
    var _a;
    var text = props.text, active = props.active, icon = props.icon, onClick = props.onClick, disabled = props.disabled;
    var classes = useStyles();
    var ChonkyIcon = react_1.useContext(icon_helper_1.ChonkyIconContext);
    var className = styles_1.c((_a = {},
        _a[classes.baseButton] = true,
        _a[classes.activeButton] = active,
        _a));
    return (react_1.default.createElement(MenuItem_1.default, { ref: ref, className: className, onClick: onClick, disabled: disabled },
        icon && (react_1.default.createElement(ListItemIcon_1.default, { className: classes.icon },
            react_1.default.createElement(ChonkyIcon, { icon: icon, fixedWidth: true }))),
        react_1.default.createElement(ListItemText_1.default, { primaryTypographyProps: { className: classes.text } }, text)));
});
var useStyles = styles_1.makeGlobalChonkyStyles(function (theme) { return ({
    baseButton: {
        lineHeight: styles_1.important(theme.toolbar.lineHeight),
        height: styles_1.important(theme.toolbar.size),
        minHeight: styles_1.important('auto'),
        minWidth: styles_1.important('auto'),
        padding: styles_1.important(20),
    },
    icon: {
        fontSize: styles_1.important(theme.toolbar.fontSize),
        minWidth: styles_1.important('auto'),
        color: styles_1.important('inherit'),
        marginRight: 8,
    },
    text: {
        fontSize: styles_1.important(theme.toolbar.fontSize),
    },
    activeButton: {
        color: styles_1.important(theme.colors.textActive),
    },
}); });
exports.SmartToolbarDropdownButton = react_1.default.forwardRef(function (props, ref) {
    var fileActionId = props.fileActionId, onClickFollowUp = props.onClickFollowUp;
    var action = store_1.useParamSelector(selectors_1.selectFileActionData, fileActionId);
    var triggerAction = file_actions_1.useFileActionTrigger(fileActionId);
    var _a = file_actions_1.useFileActionProps(fileActionId), icon = _a.icon, active = _a.active, disabled = _a.disabled;
    var buttonName = i18n_1.useLocalizedFileActionStrings(action).buttonName;
    // Combine external click handler with internal one
    var handleClick = react_1.useCallback(function () {
        triggerAction();
        if (onClickFollowUp)
            onClickFollowUp();
    }, [onClickFollowUp, triggerAction]);
    if (!action)
        return null;
    var button = action.button;
    if (!button)
        return null;
    return (react_1.default.createElement(exports.ToolbarDropdownButton, { ref: ref, text: buttonName, icon: icon, onClick: handleClick, active: active, disabled: disabled }));
});
