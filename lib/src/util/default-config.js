"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setChonkyDefaults = exports.defaultConfig = void 0;
var index_1 = require("../action-definitions/index");
var ChonkyIconPlaceholder_1 = require("../components/internal/ChonkyIconPlaceholder");
exports.defaultConfig = {
    fileActions: null,
    onFileAction: null,
    thumbnailGenerator: null,
    doubleClickDelay: 300,
    disableSelection: false,
    disableDefaultFileActions: false,
    disableDragAndDrop: false,
    disableDragAndDropProvider: false,
    defaultSortActionId: index_1.ChonkyActions.SortFilesByName.id,
    defaultFileViewActionId: index_1.ChonkyActions.EnableGridView.id,
    clearSelectionOnOutsideClick: true,
    iconComponent: ChonkyIconPlaceholder_1.ChonkyIconPlaceholder,
    darkMode: false,
    i18n: {},
};
var setChonkyDefaults = function (config) {
    for (var _i = 0, _a = Object.keys(config); _i < _a.length; _i++) {
        var key = _a[_i];
        exports.defaultConfig[key] = config[key];
    }
};
exports.setChonkyDefaults = setChonkyDefaults;
