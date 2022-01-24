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
exports.SmartToolbarButton = exports.ToolbarButton = void 0;
var Button_1 = __importDefault(require("@material-ui/core/Button"));
var react_1 = __importStar(require("react"));
var selectors_1 = require("../../redux/selectors");
var store_1 = require("../../redux/store");
var icons_types_1 = require("../../types/icons.types");
var file_actions_1 = require("../../util/file-actions");
var i18n_1 = require("../../util/i18n");
var icon_helper_1 = require("../../util/icon-helper");
var styles_1 = require("../../util/styles");
exports.ToolbarButton = react_1.default.memo(function (props) {
    var _a;
    var externalClassName = props.className, text = props.text, tooltip = props.tooltip, active = props.active, icon = props.icon, iconOnly = props.iconOnly, onClick = props.onClick, disabled = props.disabled, dropdown = props.dropdown;
    var classes = useStyles();
    var ChonkyIcon = (0, react_1.useContext)(icon_helper_1.ChonkyIconContext);
    var iconComponent = icon || iconOnly ? (react_1.default.createElement("div", { className: iconOnly ? '' : classes.iconWithText },
        react_1.default.createElement(ChonkyIcon, { icon: icon ? icon : icons_types_1.ChonkyIconName.fallbackIcon, fixedWidth: true }))) : null;
    var className = (0, styles_1.c)((_a = {},
        _a[externalClassName !== null && externalClassName !== void 0 ? externalClassName : ''] = true,
        _a[classes.baseButton] = true,
        _a[classes.iconOnlyButton] = iconOnly,
        _a[classes.activeButton] = !!active,
        _a));
    return (react_1.default.createElement(Button_1.default, { className: className, onClick: onClick, title: tooltip ? tooltip : text, disabled: disabled || !onClick },
        iconComponent,
        text && !iconOnly && react_1.default.createElement("span", null, text),
        dropdown && (react_1.default.createElement("div", { className: classes.iconDropdown },
            react_1.default.createElement(ChonkyIcon, { icon: icon ? icon : icons_types_1.ChonkyIconName.dropdown, fixedWidth: true })))));
});
var useStyles = (0, styles_1.makeGlobalChonkyStyles)(function (theme) { return ({
    baseButton: {
        fontSize: (0, styles_1.important)(theme.toolbar.fontSize),
        textTransform: (0, styles_1.important)('none'),
        letterSpacing: (0, styles_1.important)(0),
        minWidth: (0, styles_1.important)('auto'),
        lineHeight: theme.toolbar.lineHeight,
        height: theme.toolbar.size,
        paddingBottom: (0, styles_1.important)(0),
        paddingTop: (0, styles_1.important)(0),
    },
    iconWithText: {
        marginRight: 8,
    },
    iconOnlyButton: {
        width: theme.toolbar.size,
        textAlign: 'center',
    },
    iconDropdown: {
        fontSize: '0.7em',
        marginLeft: 2,
        marginTop: 1,
    },
    activeButton: {
        color: (0, styles_1.important)(theme.colors.textActive),
    },
}); });
exports.SmartToolbarButton = react_1.default.memo(function (props) {
    var fileActionId = props.fileActionId;
    var action = (0, store_1.useParamSelector)(selectors_1.selectFileActionData, fileActionId);
    var triggerAction = (0, file_actions_1.useFileActionTrigger)(fileActionId);
    var _a = (0, file_actions_1.useFileActionProps)(fileActionId), icon = _a.icon, active = _a.active, disabled = _a.disabled;
    var _b = (0, i18n_1.useLocalizedFileActionStrings)(action), buttonName = _b.buttonName, buttonTooltip = _b.buttonTooltip;
    if (!action)
        return null;
    var button = action.button;
    if (!button)
        return null;
    return (react_1.default.createElement(exports.ToolbarButton, { text: buttonName, tooltip: buttonTooltip, icon: icon, iconOnly: button.iconOnly, active: active, onClick: triggerAction, disabled: disabled }));
});
