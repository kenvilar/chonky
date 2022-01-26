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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridEntry = void 0;
var react_1 = __importDefault(require("react"));
var file_helper_1 = require("../../util/file-helper");
var styles_1 = require("../../util/styles");
var FileEntry_hooks_1 = require("./FileEntry-hooks");
var FileEntryName_1 = require("./FileEntryName");
var GridEntryPreview_1 = require("./GridEntryPreview");
exports.GridEntry = react_1.default.memo(function (_a) {
    var _b;
    var file = _a.file, selected = _a.selected, focused = _a.focused, dndState = _a.dndState;
    var isDirectory = file_helper_1.FileHelper.isDirectory(file);
    var entryState = FileEntry_hooks_1.useFileEntryState(file, selected, focused);
    var classes = useFileEntryStyles(entryState);
    var fileEntryHtmlProps = FileEntry_hooks_1.useFileEntryHtmlProps(file);
    var entryClassName = styles_1.c((_b = {},
        _b[classes.gridFileEntry] = true,
        _b));
    return (react_1.default.createElement("div", __assign({ className: entryClassName }, fileEntryHtmlProps),
        isDirectory ? (react_1.default.createElement(GridEntryPreview_1.GridEntryPreviewFolder, { className: classes.gridFileEntryPreview, entryState: entryState, dndState: dndState })) : (react_1.default.createElement(GridEntryPreview_1.GridEntryPreviewFile, { className: classes.gridFileEntryPreview, entryState: entryState, dndState: dndState })),
        react_1.default.createElement("div", { className: classes.gridFileEntryNameContainer },
            react_1.default.createElement(FileEntryName_1.FileEntryName, { className: classes.gridFileEntryName, file: file }))));
});
var useFileEntryStyles = styles_1.makeLocalChonkyStyles(function (theme) { return ({
    gridFileEntry: {
        flexDirection: 'column',
        display: 'flex',
        height: '100%',
    },
    gridFileEntryPreview: {
        flexGrow: 1,
    },
    gridFileEntryNameContainer: {
        fontSize: theme.gridFileEntry.fontSize,
        wordBreak: 'break-word',
        textAlign: 'center',
        paddingTop: 5,
    },
    gridFileEntryName: {
        backgroundColor: function (state) {
            return state.selected ? 'rgba(0,153,255, .25)' : 'transparent';
        },
        textDecoration: function (state) {
            return state.focused ? 'underline' : 'none';
        },
        borderRadius: 3,
        padding: [2, 4],
    },
}); });
