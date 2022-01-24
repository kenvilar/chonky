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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FolderChainButton = void 0;
var react_1 = __importStar(require("react"));
var icons_types_1 = require("../../types/icons.types");
var dnd_1 = require("../../util/dnd");
var icon_helper_1 = require("../../util/icon-helper");
var styles_1 = require("../../util/styles");
var FileEntry_hooks_1 = require("../file-list/FileEntry-hooks");
var ToolbarButton_1 = require("./ToolbarButton");
exports.FolderChainButton = react_1.default.memo(function (_a) {
    var _b;
    var first = _a.first, current = _a.current, item = _a.item;
    var file = item.file, disabled = item.disabled, onClick = item.onClick;
    var _c = (0, dnd_1.useFileDrop)({
        file: file,
        forceDisableDrop: !file || current,
    }), dndIsOver = _c.dndIsOver, dndCanDrop = _c.dndCanDrop, drop = _c.drop;
    var dndState = (0, react_1.useMemo)(function () { return ({
        dndIsOver: dndIsOver,
        dndCanDrop: dndCanDrop,
        dndIsDragging: false,
    }); }, [dndCanDrop, dndIsOver]);
    (0, dnd_1.useDndHoverOpen)(file, dndState);
    var dndIconName = (0, FileEntry_hooks_1.useDndIcon)(dndState);
    var ChonkyIcon = (0, react_1.useContext)(icon_helper_1.ChonkyIconContext);
    var classes = useStyles(dndState);
    var className = (0, styles_1.c)((_b = {},
        _b[classes.baseBreadcrumb] = true,
        _b[classes.disabledBreadcrumb] = disabled,
        _b[classes.currentBreadcrumb] = current,
        _b));
    var text = file ? file.name : 'Loading...';
    var icon = first && (file === null || file === void 0 ? void 0 : file.folderChainIcon) === undefined
        ? icons_types_1.ChonkyIconName.folder
        : file === null || file === void 0 ? void 0 : file.folderChainIcon;
    return (react_1.default.createElement("div", { className: classes.buttonContainer, ref: file ? drop : null },
        file && dndIconName && (react_1.default.createElement("div", { className: classes.dndIndicator },
            react_1.default.createElement(ChonkyIcon, { icon: dndIconName, fixedWidth: true }))),
        react_1.default.createElement(ToolbarButton_1.ToolbarButton, { icon: icon, className: className, text: text, disabled: disabled, onClick: onClick })));
});
var useStyles = (0, styles_1.makeLocalChonkyStyles)(function (theme) { return ({
    buttonContainer: {
        position: 'relative',
    },
    baseBreadcrumb: {
        color: function (dndState) {
            var color = theme.palette.text.primary;
            if (dndState.dndIsOver) {
                color = dndState.dndCanDrop
                    ? theme.dnd.canDropColor
                    : theme.dnd.cannotDropColor;
            }
            return (0, styles_1.important)(color);
        },
    },
    disabledBreadcrumb: {
        // Constant function here is on purpose. Without the function, the color here
        // does not override the `baseBreadcrumb` color from above.
        color: function () { return (0, styles_1.important)(theme.palette.text.disabled); },
    },
    currentBreadcrumb: {
        textDecoration: (0, styles_1.important)('underline'),
    },
    dndIndicator: {
        color: function (dndState) {
            return dndState.dndCanDrop ? theme.dnd.canDropColor : theme.dnd.cannotDropColor;
        },
        backgroundColor: function (dndState) {
            return dndState.dndCanDrop ? theme.dnd.canDropMask : theme.dnd.cannotDropMask;
        },
        lineHeight: "calc(".concat(theme.toolbar.lineHeight, " - 6px)"),
        transform: 'translateX(-50%) translateY(-50%)',
        borderRadius: theme.toolbar.buttonRadius,
        height: theme.toolbar.size - 6,
        width: theme.toolbar.size - 6,
        boxSizing: 'border-box',
        position: 'absolute',
        textAlign: 'center',
        left: '50%',
        top: '50%',
        zIndex: 5,
    },
}); });
