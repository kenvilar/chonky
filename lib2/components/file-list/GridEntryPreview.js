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
exports.useCommonEntryStyles = exports.GridEntryPreviewFile = exports.GridEntryPreviewFolder = void 0;
var react_1 = __importStar(require("react"));
var icon_helper_1 = require("../../util/icon-helper");
var styles_1 = require("../../util/styles");
var FileThumbnail_1 = require("./FileThumbnail");
var GridEntryDndIndicator_1 = require("./GridEntryDndIndicator");
exports.GridEntryPreviewFolder = react_1.default.memo(function (props) {
    var _a;
    var externalClassName = props.className, entryState = props.entryState, dndState = props.dndState;
    var folderClasses = useFolderStyles(entryState);
    var fileClasses = useFileStyles(entryState);
    var commonClasses = exports.useCommonEntryStyles(entryState);
    var className = styles_1.c((_a = {},
        _a[folderClasses.previewFile] = true,
        _a[externalClassName || ''] = !!externalClassName,
        _a));
    return (react_1.default.createElement("div", { className: className },
        react_1.default.createElement("div", { className: folderClasses.folderBackSideMid },
            react_1.default.createElement("div", { className: folderClasses.folderBackSideTop }),
            react_1.default.createElement("div", { className: folderClasses.folderFrontSide },
                react_1.default.createElement(GridEntryDndIndicator_1.GridEntryDndIndicator, { className: fileClasses.dndIndicator, dndState: dndState }),
                react_1.default.createElement("div", { className: styles_1.c([
                        fileClasses.fileIcon,
                        folderClasses.fileIcon,
                    ]) }, entryState.childrenCount),
                react_1.default.createElement("div", { className: commonClasses.selectionIndicator }),
                react_1.default.createElement(FileThumbnail_1.FileThumbnail, { className: fileClasses.thumbnail, thumbnailUrl: entryState.thumbnailUrl })))));
});
var useFolderStyles = styles_1.makeLocalChonkyStyles(function (theme) { return ({
    previewFile: {
        borderRadius: theme.gridFileEntry.borderRadius,
        position: 'relative',
        overflow: 'hidden',
    },
    folderBackSideTop: {
        backgroundColor: function (state) { return state.color; },
        boxShadow: function (state) {
            var color = theme.gridFileEntry.folderBackColorTint;
            if (state.focused)
                color = 'rgba(0, 0, 0, 0.3)';
            else if (state.selected)
                color = 'rgba(0, 153, 255, .4)';
            return "inset " + color + " 0 0 0 999px";
        },
        borderTopLeftRadius: theme.gridFileEntry.borderRadius,
        borderTopRightRadius: 10,
        position: 'absolute',
        right: '60%',
        height: 13,
        top: -10,
        left: 0,
        '&:after': {
            borderRightColor: theme.palette.background.paper,
            borderTopColor: theme.palette.background.paper,
            borderBottomColor: 'transparent',
            borderLeftColor: 'transparent',
            borderWidth: [0, 15, 10, 0],
            borderStyle: 'solid',
            position: 'absolute',
            display: 'block',
            content: '""',
            right: 0,
            top: 0,
        },
    },
    folderBackSideMid: {
        backgroundColor: function (state) { return state.color; },
        boxShadow: function (state) {
            var color = theme.gridFileEntry.folderBackColorTint;
            if (state.focused)
                color = 'rgba(0, 0, 0, 0.3)';
            else if (state.selected)
                color = 'rgba(0, 153, 255, .4)';
            return "inset " + color + " 0 0 0 999px";
        },
        borderTopRightRadius: theme.gridFileEntry.borderRadius,
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        top: 10,
    },
    folderFrontSide: {
        boxShadow: function (state) {
            var shadows = [];
            if (state.focused)
                shadows.push('inset rgba(0, 0, 0, 1) 0 0 0 3px');
            if (state.selected)
                shadows.push('inset rgba(0, 153, 255, .65) 0 0 0 3px');
            shadows.push("inset " + theme.gridFileEntry.folderFrontColorTint + " 0 0 0 999px");
            return shadows.join(', ');
        },
        backgroundColor: function (state) { return state.color; },
        borderRadius: theme.gridFileEntry.borderRadius,
        position: 'absolute',
        overflow: 'hidden',
        bottom: 0,
        right: 0,
        left: 0,
        top: 10,
    },
    fileIcon: {
        fontSize: styles_1.important(theme.gridFileEntry.childrenCountSize),
    },
}); });
exports.GridEntryPreviewFile = react_1.default.memo(function (props) {
    var _a;
    var externalClassName = props.className, entryState = props.entryState, dndState = props.dndState;
    var fileClasses = useFileStyles(entryState);
    var commonClasses = exports.useCommonEntryStyles(entryState);
    var ChonkyIcon = react_1.useContext(icon_helper_1.ChonkyIconContext);
    var className = styles_1.c((_a = {},
        _a[fileClasses.previewFile] = true,
        _a[externalClassName || ''] = !!externalClassName,
        _a));
    return (react_1.default.createElement("div", { className: className },
        react_1.default.createElement(GridEntryDndIndicator_1.GridEntryDndIndicator, { className: fileClasses.dndIndicator, dndState: dndState }),
        react_1.default.createElement("div", { className: fileClasses.fileIcon },
            react_1.default.createElement(ChonkyIcon, { icon: entryState.icon, spin: entryState.iconSpin })),
        react_1.default.createElement("div", { className: commonClasses.selectionIndicator }),
        react_1.default.createElement(FileThumbnail_1.FileThumbnail, { className: fileClasses.thumbnail, thumbnailUrl: entryState.thumbnailUrl })));
});
var useFileStyles = styles_1.makeLocalChonkyStyles(function (theme) { return ({
    previewFile: {
        boxShadow: function (state) {
            var shadows = [];
            if (state.selected)
                shadows.push('inset rgba(0,153,255, .65) 0 0 0 3px');
            if (state.focused)
                shadows.push('inset rgba(0, 0, 0, 1) 0 0 0 3px');
            shadows.push("inset " + theme.gridFileEntry.fileColorTint + " 0 0 0 999px");
            return shadows.join(', ');
        },
        backgroundColor: function (state) { return state.color; },
        borderRadius: theme.gridFileEntry.borderRadius,
        position: 'relative',
        overflow: 'hidden',
    },
    dndIndicator: {
        zIndex: 14,
    },
    fileIcon: {
        transform: 'translateX(-50%) translateY(-50%)',
        fontSize: theme.gridFileEntry.iconSize,
        opacity: function (state) {
            return state.thumbnailUrl && !state.focused ? 0 : 1;
        },
        color: function (state) {
            return state.focused
                ? theme.gridFileEntry.iconColorFocused
                : theme.gridFileEntry.iconColor;
        },
        position: 'absolute',
        left: '50%',
        zIndex: 12,
        top: '50%',
    },
    thumbnail: {
        borderRadius: theme.gridFileEntry.borderRadius,
        position: 'absolute',
        zIndex: 6,
        bottom: 5,
        right: 5,
        left: 5,
        top: 5,
    },
}); });
exports.useCommonEntryStyles = styles_1.makeLocalChonkyStyles(function (theme) { return ({
    selectionIndicator: {
        display: function (state) { return (state.selected ? 'block' : 'none'); },
        background: 'repeating-linear-gradient(' +
            '45deg,' +
            'rgba(0,153,255,.14),' +
            'rgba(0,153,255,.14) 10px,' +
            'rgba(0,153,255,.25) 0,' +
            'rgba(0,153,255,.25) 20px' +
            ')',
        backgroundColor: 'rgba(0, 153, 255, .14)',
        position: 'absolute',
        height: '100%',
        width: '100%',
        zIndex: 10,
    },
    focusIndicator: {
        display: function (state) { return (state.focused ? 'block' : 'none'); },
        boxShadow: 'inset rgba(0, 0, 0, 1) 0 0 0 2px',
        position: 'absolute',
        height: '100%',
        width: '100%',
        zIndex: 11,
    },
}); });
