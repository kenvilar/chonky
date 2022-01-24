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
exports.SmartFileEntry = void 0;
var react_1 = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var selectors_1 = require("../../redux/selectors");
var store_1 = require("../../redux/store");
var file_view_types_1 = require("../../types/file-view.types");
var file_helper_1 = require("../../util/file-helper");
var styles_1 = require("../../util/styles");
var ClickableWrapper_1 = require("../internal/ClickableWrapper");
var CompactEntry_1 = require("./CompactEntry");
var DnDFileEntry_1 = require("./DnDFileEntry");
var FileEntry_hooks_1 = require("./FileEntry-hooks");
var GridEntry_1 = require("./GridEntry");
var ListEntry_1 = require("./ListEntry");
var disabledDndState = {
    dndIsDragging: false,
    dndIsOver: false,
    dndCanDrop: false,
};
exports.SmartFileEntry = react_1.default.memo(function (_a) {
    var fileId = _a.fileId, displayIndex = _a.displayIndex, fileViewMode = _a.fileViewMode;
    var classes = useStyles();
    // Basic properties
    var file = (0, store_1.useParamSelector)(selectors_1.selectFileData, fileId);
    var selected = (0, store_1.useParamSelector)(selectors_1.selectIsFileSelected, fileId);
    var dndDisabled = (0, react_redux_1.useSelector)(selectors_1.selectIsDnDDisabled);
    // Clickable wrapper properties
    var fileClickHandlers = (0, FileEntry_hooks_1.useFileClickHandlers)(file, displayIndex);
    var _b = (0, react_1.useState)(false), focused = _b[0], setFocused = _b[1];
    var clickableWrapperProps = __assign(__assign({ wrapperTag: 'div', passthroughProps: { className: classes.fileEntryClickableWrapper } }, (file_helper_1.FileHelper.isClickable(file) ? fileClickHandlers : undefined)), { setFocused: setFocused });
    // File entry properties
    var fileEntryProps = {
        file: file,
        selected: selected,
        focused: focused,
    };
    var EntryComponent;
    if (fileViewMode === file_view_types_1.FileViewMode.List)
        EntryComponent = ListEntry_1.ListEntry;
    else if (fileViewMode === file_view_types_1.FileViewMode.Compact)
        EntryComponent = CompactEntry_1.CompactEntry;
    else
        EntryComponent = GridEntry_1.GridEntry;
    return dndDisabled ? (react_1.default.createElement(ClickableWrapper_1.ClickableWrapper, __assign({}, clickableWrapperProps),
        react_1.default.createElement(EntryComponent, __assign({}, fileEntryProps, { dndState: disabledDndState })))) : (react_1.default.createElement(DnDFileEntry_1.DnDFileEntry, { file: file }, function (dndState) { return (react_1.default.createElement(ClickableWrapper_1.ClickableWrapper, __assign({}, clickableWrapperProps),
        react_1.default.createElement(EntryComponent, __assign({}, fileEntryProps, { dndState: dndState })))); }));
});
var useStyles = (0, styles_1.makeGlobalChonkyStyles)(function (theme) { return ({
    fileEntryClickableWrapper: {
        // We disable default browser outline because Chonky provides its own outline
        // (which doesn't compromise accessibility, hopefully)
        outline: 'none !important',
        position: 'relative',
        height: '100%',
    },
}); });
