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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultFileActions = exports.EssentialFileActions = exports.ChonkyActions = void 0;
var default_1 = require("./default");
var essential_1 = require("./essential");
var extra_1 = require("./extra");
exports.ChonkyActions = __assign(__assign(__assign({}, essential_1.EssentialActions), default_1.DefaultActions), extra_1.ExtraActions);
exports.EssentialFileActions = [
    exports.ChonkyActions.MouseClickFile,
    exports.ChonkyActions.KeyboardClickFile,
    exports.ChonkyActions.StartDragNDrop,
    exports.ChonkyActions.EndDragNDrop,
    exports.ChonkyActions.MoveFiles,
    exports.ChonkyActions.ChangeSelection,
    exports.ChonkyActions.OpenFiles,
    exports.ChonkyActions.OpenParentFolder,
    exports.ChonkyActions.OpenFileContextMenu,
];
exports.DefaultFileActions = [
    exports.ChonkyActions.OpenSelection,
    exports.ChonkyActions.SelectAllFiles,
    exports.ChonkyActions.ClearSelection,
    exports.ChonkyActions.EnableListView,
    // TODO: Don't enable until compact view is fully supported
    // ChonkyActions.EnableCompactView,
    exports.ChonkyActions.EnableGridView,
    exports.ChonkyActions.SortFilesByName,
    exports.ChonkyActions.SortFilesBySize,
    exports.ChonkyActions.SortFilesByDate,
    exports.ChonkyActions.ToggleHiddenFiles,
    exports.ChonkyActions.ToggleShowFoldersFirst,
    exports.ChonkyActions.FocusSearchInput,
];
