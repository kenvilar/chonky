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
exports.ToolbarDropdown = void 0;
var Menu_1 = __importDefault(require("@material-ui/core/Menu"));
var react_1 = __importStar(require("react"));
var i18n_1 = require("../../util/i18n");
var styles_1 = require("../../util/styles");
var ToolbarButton_1 = require("./ToolbarButton");
var ToolbarDropdownButton_1 = require("./ToolbarDropdownButton");
exports.ToolbarDropdown = react_1.default.memo(function (props) {
    var name = props.name, fileActionIds = props.fileActionIds;
    var _a = react_1.default.useState(null), anchor = _a[0], setAnchor = _a[1];
    var handleClick = (0, react_1.useCallback)(function (event) { return setAnchor(event.currentTarget); }, [setAnchor]);
    var handleClose = (0, react_1.useCallback)(function () { return setAnchor(null); }, [setAnchor]);
    var menuItemComponents = (0, react_1.useMemo)(function () {
        return fileActionIds.map(function (id) { return (react_1.default.createElement(ToolbarDropdownButton_1.SmartToolbarDropdownButton, { key: "menu-item-".concat(id), fileActionId: id, onClickFollowUp: handleClose })); });
    }, [fileActionIds, handleClose]);
    var localizedName = (0, i18n_1.useLocalizedFileActionGroup)(name);
    var classes = useStyles();
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(ToolbarButton_1.ToolbarButton, { text: localizedName, onClick: handleClick, dropdown: true }),
        react_1.default.createElement(Menu_1.default, { autoFocus: true, keepMounted: true, elevation: 2, anchorEl: anchor, onClose: handleClose, open: Boolean(anchor), transitionDuration: 150, classes: { list: classes.dropdownList } }, menuItemComponents)));
});
var useStyles = (0, styles_1.makeGlobalChonkyStyles)(function (theme) { return ({
    dropdownList: {
        paddingBottom: (0, styles_1.important)(0),
        paddingTop: (0, styles_1.important)(0),
    },
}); });
