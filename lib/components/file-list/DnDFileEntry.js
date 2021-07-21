"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStyles = exports.DnDFileEntry = void 0;
var react_1 = __importDefault(require("react"));
var dnd_1 = require("../../util/dnd");
var file_helper_1 = require("../../util/file-helper");
var styles_1 = require("../../util/styles");
exports.DnDFileEntry = react_1.default.memo(function (_a) {
    var file = _a.file, children = _a.children;
    var _b = dnd_1.useFileEntryDnD(file), drop = _b.drop, drag = _b.drag, dndState = _b.dndState;
    dnd_1.useDndHoverOpen(file, dndState);
    var classes = exports.useStyles();
    return (react_1.default.createElement("div", { ref: drop, className: classes.fillParent },
        react_1.default.createElement("div", { ref: file_helper_1.FileHelper.isDraggable(file) ? drag : null, className: classes.fillParent }, children(dndState))));
});
exports.useStyles = styles_1.makeLocalChonkyStyles(function (theme) { return ({
    fillParent: {
        height: '100%',
    },
}); });
