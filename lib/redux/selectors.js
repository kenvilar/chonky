"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSelectedFilesForAction = exports.getSelectedFiles = exports.getIsFileSelected = exports.getFileData = exports.selectContextMenuTriggerFile = exports.selectContextMenuConfig = exports.selectContextMenuMounted = exports.selectLastClickIndex = exports.selectClearSelectionOnOutsideClick = exports.selectIsDnDDisabled = exports.selectDoubleClickDelay = exports.selectThumbnailGenerator = exports.selectOptionValue = exports.selectOptionMap = exports.selectSortOrder = exports.selectSortActionId = exports.selectFileViewConfig = exports.selectDisableSelection = exports.selectSelectedFilesForActionCount = exports.selectSelectedFilesForAction = exports.selectSelectedFiles = exports.selectIsFileSelected = exports.selectSelectionSize = exports.selectSelectedFileIds = exports.selectSelectionMap = exports.selectSearchString = exports.selectFocusSearchInput = exports.selectDisplayFileIds = exports.selectHiddenFileCount = exports.selectHiddenFileIdMap = exports.selectFileData = exports.selectCleanFileIds = exports.selectFileMap = exports.selectRawFiles = exports.selectParentFolder = exports.selectCurrentFolder = exports.selectFolderChain = exports.selectContextMenuItems = exports.selectToolbarItems = exports.selectFileActionData = exports.selectFileActionIds = exports.selectFileActionMap = exports.selectExternalFileActionHandler = exports.selectInstanceId = void 0;
exports.selectInstanceId = function (state) { return state.instanceId; };
exports.selectExternalFileActionHandler = function (state) {
    return state.externalFileActionHandler;
};
exports.selectFileActionMap = function (state) { return state.fileActionMap; };
exports.selectFileActionIds = function (state) { return state.fileActionIds; };
exports.selectFileActionData = function (fileActionId) { return function (state) {
    return exports.selectFileActionMap(state)[fileActionId];
}; };
exports.selectToolbarItems = function (state) { return state.toolbarItems; };
exports.selectContextMenuItems = function (state) { return state.contextMenuItems; };
exports.selectFolderChain = function (state) { return state.folderChain; };
exports.selectCurrentFolder = function (state) {
    var folderChain = exports.selectFolderChain(state);
    var currentFolder = folderChain.length > 0 ? folderChain[folderChain.length - 1] : null;
    return currentFolder;
};
exports.selectParentFolder = function (state) {
    var folderChain = exports.selectFolderChain(state);
    var parentFolder = folderChain.length > 1 ? folderChain[folderChain.length - 2] : null;
    return parentFolder;
};
exports.selectRawFiles = function (state) { return state.rawFiles; };
exports.selectFileMap = function (state) { return state.fileMap; };
exports.selectCleanFileIds = function (state) { return state.cleanFileIds; };
exports.selectFileData = function (fileId) { return function (state) {
    return fileId ? exports.selectFileMap(state)[fileId] : null;
}; };
exports.selectHiddenFileIdMap = function (state) { return state.hiddenFileIdMap; };
exports.selectHiddenFileCount = function (state) {
    return Object.keys(exports.selectHiddenFileIdMap(state)).length;
};
exports.selectDisplayFileIds = function (state) { return state.displayFileIds; };
exports.selectFocusSearchInput = function (state) { return state.focusSearchInput; };
exports.selectSearchString = function (state) { return state.searchString; };
exports.selectSelectionMap = function (state) { return state.selectionMap; };
exports.selectSelectedFileIds = function (state) {
    return Object.keys(exports.selectSelectionMap(state));
};
exports.selectSelectionSize = function (state) {
    return exports.selectSelectedFileIds(state).length;
};
exports.selectIsFileSelected = function (fileId) { return function (state) {
    return !!fileId && !!exports.selectSelectionMap(state)[fileId];
}; };
exports.selectSelectedFiles = function (state) {
    var fileMap = exports.selectFileMap(state);
    return Object.keys(exports.selectSelectionMap(state)).map(function (id) { return fileMap[id]; });
};
exports.selectSelectedFilesForAction = function (fileActionId) { return function (state) {
    var fileActionMap = state.fileActionMap;
    var action = fileActionMap[fileActionId];
    if (!action || !action.requiresSelection)
        return undefined;
    return exports.getSelectedFiles(state, action.fileFilter);
}; };
exports.selectSelectedFilesForActionCount = function (fileActionId) { return function (state) { var _a; return (_a = exports.getSelectedFilesForAction(state, fileActionId)) === null || _a === void 0 ? void 0 : _a.length; }; };
exports.selectDisableSelection = function (state) { return state.disableSelection; };
exports.selectFileViewConfig = function (state) { return state.fileViewConfig; };
exports.selectSortActionId = function (state) { return state.sortActionId; };
exports.selectSortOrder = function (state) { return state.sortOrder; };
exports.selectOptionMap = function (state) { return state.optionMap; };
exports.selectOptionValue = function (optionId) { return function (state) {
    return exports.selectOptionMap(state)[optionId];
}; };
exports.selectThumbnailGenerator = function (state) { return state.thumbnailGenerator; };
exports.selectDoubleClickDelay = function (state) { return state.doubleClickDelay; };
exports.selectIsDnDDisabled = function (state) { return state.disableDragAndDrop; };
exports.selectClearSelectionOnOutsideClick = function (state) {
    return state.clearSelectionOnOutsideClick;
};
exports.selectLastClickIndex = function (state) { return state.lastClickIndex; };
exports.selectContextMenuMounted = function (state) { return state.contextMenuMounted; };
exports.selectContextMenuConfig = function (state) { return state.contextMenuConfig; };
exports.selectContextMenuTriggerFile = function (state) {
    var _a;
    var config = exports.selectContextMenuConfig(state);
    if (!config || !config.triggerFileId)
        return null;
    var fileMap = exports.selectFileMap(state);
    return (_a = fileMap[config.triggerFileId]) !== null && _a !== void 0 ? _a : null;
};
// Selectors meant to be used outside of Redux code
exports.getFileData = function (state, fileId) {
    return fileId ? exports.selectFileMap(state)[fileId] : null;
};
exports.getIsFileSelected = function (state, file) {
    // !!! We deliberately don't use `FileHelper.isSelectable` here as we want to
    //     reflect the state of Redux store accurately.
    return !!exports.selectSelectionMap(state)[file.id];
};
exports.getSelectedFiles = function (state) {
    var filters = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        filters[_i - 1] = arguments[_i];
    }
    var fileMap = state.fileMap, selectionMap = state.selectionMap;
    var selectedFiles = Object.keys(selectionMap).map(function (id) { return fileMap[id]; });
    var filteredSelectedFiles = filters.reduce(function (prevFiles, filter) { return (filter ? prevFiles.filter(filter) : prevFiles); }, selectedFiles);
    return filteredSelectedFiles;
};
exports.getSelectedFilesForAction = function (state, fileActionId) {
    return exports.selectSelectedFilesForAction(fileActionId)(state);
};
