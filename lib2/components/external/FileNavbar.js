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
exports.FileNavbar = void 0;
var Box_1 = __importDefault(require("@material-ui/core/Box"));
var Breadcrumbs_1 = __importDefault(require("@material-ui/core/Breadcrumbs"));
var react_1 = __importStar(require("react"));
var index_1 = require("../../action-definitions/index");
var styles_1 = require("../../util/styles");
var FileNavbar_hooks_1 = require("./FileNavbar-hooks");
var FolderChainButton_1 = require("./FolderChainButton");
var ToolbarButton_1 = require("./ToolbarButton");
exports.FileNavbar = react_1.default.memo(function () {
    var classes = useStyles();
    var folderChainItems = FileNavbar_hooks_1.useFolderChainItems();
    var folderChainComponents = react_1.useMemo(function () {
        var components = [];
        for (var i = 0; i < folderChainItems.length; ++i) {
            var key = "folder-chain-" + i;
            var component = (react_1.default.createElement(FolderChainButton_1.FolderChainButton, { key: key, first: i === 0, current: i === folderChainItems.length - 1, item: folderChainItems[i] }));
            components.push(component);
        }
        return components;
    }, [folderChainItems]);
    return (react_1.default.createElement(Box_1.default, { className: classes.navbarWrapper },
        react_1.default.createElement(Box_1.default, { className: classes.navbarContainer },
            react_1.default.createElement(ToolbarButton_1.SmartToolbarButton, { fileActionId: index_1.ChonkyActions.OpenParentFolder.id }),
            react_1.default.createElement(Breadcrumbs_1.default, { className: classes.navbarBreadcrumbs, classes: { separator: classes.separator } }, folderChainComponents))));
});
var useStyles = styles_1.makeGlobalChonkyStyles(function (theme) { return ({
    navbarWrapper: {
        paddingBottom: theme.margins.rootLayoutMargin,
    },
    navbarContainer: {
        display: 'flex',
    },
    upDirectoryButton: {
        fontSize: styles_1.important(theme.toolbar.fontSize),
        height: theme.toolbar.size,
        width: theme.toolbar.size,
        padding: '0px !important',
    },
    navbarBreadcrumbs: {
        fontSize: styles_1.important(theme.toolbar.fontSize),
        flexGrow: 100,
    },
    separator: {
        marginRight: styles_1.important(4),
        marginLeft: styles_1.important(4),
    },
}); });
