"use strict";
/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DnDFileListDragLayer = void 0;
var react_1 = __importDefault(require("react"));
var react_dnd_1 = require("react-dnd");
var dnd_types_1 = require("../../types/dnd.types");
var styles_1 = require("../../util/styles");
var layerStyles = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 100,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
};
var getItemStyles = function (initialCursorOffset, initialFileOffset, currentFileOffset) {
    if (!initialCursorOffset || !initialFileOffset || !currentFileOffset) {
        return {
            display: 'none',
        };
    }
    var x = initialCursorOffset.x + (currentFileOffset.x - initialFileOffset.x);
    var y = initialCursorOffset.y + (currentFileOffset.y - initialFileOffset.y);
    var transform = "translate(" + x + "px, " + y + "px)";
    return {
        transform: transform,
        WebkitTransform: transform,
    };
};
var DnDFileListDragLayer = function () {
    var classes = useStyles();
    var _a = react_dnd_1.useDragLayer(function (monitor) { return ({
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
        initialCursorOffset: monitor.getInitialClientOffset(),
        initialFileOffset: monitor.getInitialSourceClientOffset(),
        currentFileOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging(),
    }); }), itemType = _a.itemType, item = _a.item, initialCursorOffset = _a.initialCursorOffset, initialFileOffset = _a.initialFileOffset, currentFileOffset = _a.currentFileOffset, isDragging = _a.isDragging;
    if (!isDragging || itemType !== dnd_types_1.ChonkyDndFileEntryType || !item.payload) {
        return null;
    }
    var selectionSize = item.payload.selectedFiles.length;
    return (react_1.default.createElement("div", { style: layerStyles },
        react_1.default.createElement("div", { style: getItemStyles(initialCursorOffset, initialFileOffset, currentFileOffset) },
            react_1.default.createElement("div", { className: classes.fileDragPreview },
                react_1.default.createElement("b", null, item.payload.draggedFile.name),
                selectionSize > 1 && (react_1.default.createElement(react_1.default.Fragment, null,
                    ' and ',
                    react_1.default.createElement("strong", null,
                        selectionSize - 1,
                        " other file",
                        selectionSize - 1 !== 1 ? 's' : '')))))));
};
exports.DnDFileListDragLayer = DnDFileListDragLayer;
var useStyles = styles_1.makeGlobalChonkyStyles(function (theme) { return ({
    fileDragPreview: {
        boxShadow: "2px 2px 5px " + theme.palette.divider,
        backgroundColor: theme.palette.background.default,
        borderRadius: theme.dragLayer.borderRadius,
        fontSize: theme.fontSizes.rootPrimary,
        color: theme.palette.text.primary,
        padding: theme.dragLayer.padding,
        border: theme.dragLayer.border,
        display: 'inline-block',
    },
}); });
