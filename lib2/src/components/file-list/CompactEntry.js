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
exports.CompactEntry = void 0;
var react_1 = __importStar(require("react"));
var i18n_1 = require("../../util/i18n");
var icon_helper_1 = require("../../util/icon-helper");
var styles_1 = require("../../util/styles");
var TextPlaceholder_1 = require("../external/TextPlaceholder");
var FileEntry_hooks_1 = require("./FileEntry-hooks");
var FileEntryName_1 = require("./FileEntryName");
exports.CompactEntry = react_1.default.memo(function (_a) {
    var file = _a.file, selected = _a.selected, focused = _a.focused, dndState = _a.dndState;
    var entryState = (0, FileEntry_hooks_1.useFileEntryState)(file, selected, focused);
    var _b = (0, i18n_1.useLocalizedFileEntryStrings)(file), fileModDateString = _b.fileModDateString, fileSizeString = _b.fileSizeString;
    var classes = useStyles(entryState);
    var ChonkyIcon = (0, react_1.useContext)(icon_helper_1.ChonkyIconContext);
    var fileEntryHtmlProps = (0, FileEntry_hooks_1.useFileEntryHtmlProps)(file);
    return (react_1.default.createElement("div", __assign({ className: classes.listFileEntry }, fileEntryHtmlProps),
        react_1.default.createElement("div", { className: classes.listFileEntryIcon },
            react_1.default.createElement(ChonkyIcon, { icon: entryState.icon, spin: entryState.iconSpin, fixedWidth: true })),
        react_1.default.createElement("div", { className: classes.listFileEntryDescription },
            react_1.default.createElement("div", { className: classes.listFileEntryName },
                react_1.default.createElement(FileEntryName_1.FileEntryName, { file: file })),
            react_1.default.createElement("div", { className: classes.listFileEntryProperties },
                react_1.default.createElement("div", { className: classes.listFileEntryProperty }, file ? (fileModDateString !== null && fileModDateString !== void 0 ? fileModDateString : react_1.default.createElement("span", null, "\u2014")) : (react_1.default.createElement(TextPlaceholder_1.TextPlaceholder, { minLength: 5, maxLength: 15 }))),
                react_1.default.createElement("div", { className: classes.listFileEntryProperty }, file ? (fileSizeString !== null && fileSizeString !== void 0 ? fileSizeString : react_1.default.createElement("span", null, "\u2014")) : (react_1.default.createElement(TextPlaceholder_1.TextPlaceholder, { minLength: 10, maxLength: 20 }))))),
        react_1.default.createElement("div", { className: "chonky-file-entry-outline" }),
        react_1.default.createElement("div", { className: "chonky-file-entry-selection" })));
});
var useStyles = (0, styles_1.makeLocalChonkyStyles)(function (theme) { return ({
    listFileEntry: {
        fontSize: theme.listFileEntry.fontSize,
        alignItems: 'center',
        position: 'relative',
        display: 'flex',
        height: '100%',
    },
    listFileEntryIcon: {
        backgroundColor: function (state) { return state.color; },
        boxShadow: 'inset rgba(255, 255, 255, 0.5) 0 0 0 999px',
        borderRadius: theme.listFileEntry.iconBorderRadius,
        fontSize: theme.listFileEntry.iconFontSize,
        color: '#fff',
        padding: 8,
    },
    listFileEntryDescription: {
        flexDirection: 'column',
        display: 'flex',
        flexGrow: 1,
    },
    listFileEntryName: {
        padding: [0, 8, 4, 8],
    },
    listFileEntryProperties: {
        fontSize: theme.listFileEntry.propertyFontSize,
        flexDirection: 'row',
        display: 'flex',
    },
    listFileEntryProperty: {
        padding: [0, 8],
        opacity: 0.4,
    },
}); });
