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
exports.ListEntry = void 0;
var react_1 = __importStar(require("react"));
var i18n_1 = require("../../util/i18n");
var icon_helper_1 = require("../../util/icon-helper");
var styles_1 = require("../../util/styles");
var TextPlaceholder_1 = require("../external/TextPlaceholder");
var FileEntry_hooks_1 = require("./FileEntry-hooks");
var FileEntryName_1 = require("./FileEntryName");
var GridEntryPreview_1 = require("./GridEntryPreview");
exports.ListEntry = react_1.default.memo(function (_a) {
    var file = _a.file, selected = _a.selected, focused = _a.focused, dndState = _a.dndState;
    var entryState = FileEntry_hooks_1.useFileEntryState(file, selected, focused);
    var dndIconName = FileEntry_hooks_1.useDndIcon(dndState);
    var _b = i18n_1.useLocalizedFileEntryStrings(file), fileModDateString = _b.fileModDateString, fileSizeString = _b.fileSizeString;
    var styleState = react_1.useMemo(function () { return ({
        entryState: entryState,
        dndState: dndState,
    }); }, [dndState, entryState]);
    var classes = useStyles(styleState);
    var commonClasses = GridEntryPreview_1.useCommonEntryStyles(entryState);
    var ChonkyIcon = react_1.useContext(icon_helper_1.ChonkyIconContext);
    var fileEntryHtmlProps = FileEntry_hooks_1.useFileEntryHtmlProps(file);
    return (react_1.default.createElement("div", __assign({ className: classes.listFileEntry }, fileEntryHtmlProps),
        react_1.default.createElement("div", { className: commonClasses.focusIndicator }),
        react_1.default.createElement("div", { className: styles_1.c([
                commonClasses.selectionIndicator,
                classes.listFileEntrySelection,
            ]) }),
        react_1.default.createElement("div", { className: classes.listFileEntryIcon },
            react_1.default.createElement(ChonkyIcon, { icon: dndIconName !== null && dndIconName !== void 0 ? dndIconName : entryState.icon, spin: dndIconName ? false : entryState.iconSpin, fixedWidth: true })),
        react_1.default.createElement("div", { className: classes.listFileEntryName, title: file ? file.name : undefined },
            react_1.default.createElement(FileEntryName_1.FileEntryName, { file: file })),
        react_1.default.createElement("div", { className: classes.listFileEntryProperty }, file ? (fileModDateString !== null && fileModDateString !== void 0 ? fileModDateString : react_1.default.createElement("span", null, "\u2014")) : (react_1.default.createElement(TextPlaceholder_1.TextPlaceholder, { minLength: 5, maxLength: 15 }))),
        react_1.default.createElement("div", { className: classes.listFileEntryProperty }, file ? (fileSizeString !== null && fileSizeString !== void 0 ? fileSizeString : react_1.default.createElement("span", null, "\u2014")) : (react_1.default.createElement(TextPlaceholder_1.TextPlaceholder, { minLength: 10, maxLength: 20 })))));
});
var useStyles = styles_1.makeLocalChonkyStyles(function (theme) { return ({
    listFileEntry: {
        boxShadow: "inset " + theme.palette.divider + " 0 -1px 0",
        fontSize: theme.listFileEntry.fontSize,
        color: function (_a) {
            var dndState = _a.dndState;
            return dndState.dndIsOver
                ? dndState.dndCanDrop
                    ? theme.dnd.canDropColor
                    : theme.dnd.cannotDropColor
                : 'inherit';
        },
        alignItems: 'center',
        position: 'relative',
        display: 'flex',
        height: '100%',
    },
    listFileEntrySelection: {
        opacity: 0.6,
    },
    listFileEntryIcon: {
        color: function (_a) {
            var entryState = _a.entryState, dndState = _a.dndState;
            return dndState.dndIsOver
                ? dndState.dndCanDrop
                    ? theme.dnd.canDropColor
                    : theme.dnd.cannotDropColor
                : entryState.color;
        },
        fontSize: theme.listFileEntry.iconFontSize,
        boxSizing: 'border-box',
        padding: [2, 4],
        zIndex: 20,
    },
    listFileEntryName: {
        textOverflow: 'ellipsis',
        boxSizing: 'border-box',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        flex: '1 1 300px',
        paddingLeft: 8,
        zIndex: 20,
    },
    listFileEntryProperty: {
        fontSize: theme.listFileEntry.propertyFontSize,
        boxSizing: 'border-box',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        flex: '0 1 150px',
        padding: [2, 8],
        zIndex: 20,
    },
}); });
