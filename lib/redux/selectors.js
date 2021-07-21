"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSelectedFilesForAction = exports.getSelectedFiles = exports.getIsFileSelected = exports.getFileData = exports.selectContextMenuTriggerFile = exports.selectContextMenuConfig = exports.selectContextMenuMounted = exports.selectLastClickIndex = exports.selectClearSelectionOnOutsideClick = exports.selectIsDnDDisabled = exports.selectDoubleClickDelay = exports.selectThumbnailGenerator = exports.selectOptionValue = exports.selectOptionMap = exports.selectSortOrder = exports.selectSortActionId = exports.selectFileViewConfig = exports.selectDisableSelection = exports.selectSelectedFilesForActionCount = exports.selectSelectedFilesForAction = exports.selectSelectedFiles = exports.selectIsFileSelected = exports.selectSelectionSize = exports.selectSelectedFileIds = exports.selectSelectionMap = exports.selectSearchString = exports.selectFocusSearchInput = exports.selectDisplayFileIds = exports.selectHiddenFileCount = exports.selectHiddenFileIdMap = exports.selectFileData = exports.selectCleanFileIds = exports.selectFileMap = exports.selectRawFiles = exports.selectParentFolder = exports.selectCurrentFolder = exports.selectFolderChain = exports.selectContextMenuItems = exports.selectToolbarItems = exports.selectFileActionData = exports.selectFileActionIds = exports.selectFileActionMap = exports.selectExternalFileActionHandler = exports.selectInstanceId = void 0;
var selectInstanceId = function (state) { return state.instanceId; };
exports.selectInstanceId = selectInstanceId;
var selectExternalFileActionHandler = function (state) {
    return state.externalFileActionHandler;
};
exports.selectExternalFileActionHandler = selectExternalFileActionHandler;
var selectFileActionMap = function (state) { return state.fileActionMap; };
exports.selectFileActionMap = selectFileActionMap;
var selectFileActionIds = function (state) { return state.fileActionIds; };
exports.selectFileActionIds = selectFileActionIds;
var selectFileActionData = function (fileActionId) { return function (state) {
    return exports.selectFileActionMap(state)[fileActionId];
}; };
exports.selectFileActionData = selectFileActionData;
var selectToolbarItems = function (state) { return state.toolbarItems; };
exports.selectToolbarItems = selectToolbarItems;
var selectContextMenuItems = function (state) { return state.contextMenuItems; };
exports.selectContextMenuItems = selectContextMenuItems;
var selectFolderChain = function (state) { return state.folderChain; };
exports.selectFolderChain = selectFolderChain;
var selectCurrentFolder = function (state) {
    var folderChain = exports.selectFolderChain(state);
    var currentFolder = folderChain.length > 0 ? folderChain[folderChain.length - 1] : null;
    return currentFolder;
};
exports.selectCurrentFolder = selectCurrentFolder;
var selectParentFolder = function (state) {
    var folderChain = exports.selectFolderChain(state);
    var parentFolder = folderChain.length > 1 ? folderChain[folderChain.length - 2] : null;
    return parentFolder;
};
exports.selectParentFolder = selectParentFolder;
var selectRawFiles = function (state) { return state.rawFiles; };
exports.selectRawFiles = selectRawFiles;
var selectFileMap = function (state) { return state.fileMap; };
exports.selectFileMap = selectFileMap;
var selectCleanFileIds = function (state) { return state.cleanFileIds; };
exports.selectCleanFileIds = selectCleanFileIds;
var selectFileData = function (fileId) { return function (state) {
    return fileId ? exports.selectFileMap(state)[fileId] : null;
}; };
exports.selectFileData = selectFileData;
var selectHiddenFileIdMap = function (state) { return state.hiddenFileIdMap; };
exports.selectHiddenFileIdMap = selectHiddenFileIdMap;
var selectHiddenFileCount = function (state) {
    return Object.keys(exports.selectHiddenFileIdMap(state)).length;
};
exports.selectHiddenFileCount = selectHiddenFileCount;
var selectDisplayFileIds = function (state) { return state.displayFileIds; };
exports.selectDisplayFileIds = selectDisplayFileIds;
var selectFocusSearchInput = function (state) { return state.focusSearchInput; };
exports.selectFocusSearchInput = selectFocusSearchInput;
var selectSearchString = function (state) { return state.searchString; };
exports.selectSearchString = selectSearchString;
var selectSelectionMap = function (state) { return state.selectionMap; };
exports.selectSelectionMap = selectSelectionMap;
var selectSelectedFileIds = function (state) {
    return Object.keys(exports.selectSelectionMap(state));
};
exports.selectSelectedFileIds = selectSelectedFileIds;
var selectSelectionSize = function (state) {
    return exports.selectSelectedFileIds(state).length;
};
exports.selectSelectionSize = selectSelectionSize;
var selectIsFileSelected = function (fileId) { return function (state) {
    return !!fileId && !!exports.selectSelectionMap(state)[fileId];
}; };
exports.selectIsFileSelected = selectIsFileSelected;
var selectSelectedFiles = function (state) {
    var fileMap = exports.selectFileMap(state);
    return Object.keys(exports.selectSelectionMap(state)).map(function (id) { return fileMap[id]; });
};
exports.selectSelectedFiles = selectSelectedFiles;
var selectSelectedFilesForAction = function (fileActionId) { return function (state) {
    var fileActionMap = state.fileActionMap;
    var action = fileActionMap[fileActionId];
    if (!action || !action.requiresSelection)
        return undefined;
    return exports.getSelectedFiles(state, action.fileFilter);
}; };
exports.selectSelectedFilesForAction = selectSelectedFilesForAction;
var selectSelectedFilesForActionCount = function (fileActionId) { return function (state) { var _a; return (_a = exports.getSelectedFilesForAction(state, fileActionId)) === null || _a === void 0 ? void 0 : _a.length; }; };
exports.selectSelectedFilesForActionCount = selectSelectedFilesForActionCount;
var selectDisableSelection = function (state) { return state.disableSelection; };
exports.selectDisableSelection = selectDisableSelection;
var selectFileViewConfig = function (state) { return state.fileViewConfig; };
exports.selectFileViewConfig = selectFileViewConfig;
var selectSortActionId = function (state) { return state.sortActionId; };
exports.selectSortActionId = selectSortActionId;
var selectSortOrder = function (state) { return state.sortOrder; };
exports.selectSortOrder = selectSortOrder;
var selectOptionMap = function (state) { return state.optionMap; };
exports.selectOptionMap = selectOptionMap;
var selectOptionValue = function (optionId) { return function (state) {
    return exports.selectOptionMap(state)[optionId];
}; };
exports.selectOptionValue = selectOptionValue;
var selectThumbnailGenerator = function (state) { return state.thumbnailGenerator; };
exports.selectThumbnailGenerator = selectThumbnailGenerator;
var selectDoubleClickDelay = function (state) { return state.doubleClickDelay; };
exports.selectDoubleClickDelay = selectDoubleClickDelay;
var selectIsDnDDisabled = function (state) { return state.disableDragAndDrop; };
exports.selectIsDnDDisabled = selectIsDnDDisabled;
var selectClearSelectionOnOutsideClick = function (state) {
    return state.clearSelectionOnOutsideClick;
};
exports.selectClearSelectionOnOutsideClick = selectClearSelectionOnOutsideClick;
var selectLastClickIndex = function (state) { return state.lastClickIndex; };
exports.selectLastClickIndex = selectLastClickIndex;
var selectContextMenuMounted = function (state) { return state.contextMenuMounted; };
exports.selectContextMenuMounted = selectContextMenuMounted;
var selectContextMenuConfig = function (state) { return state.contextMenuConfig; };
exports.selectContextMenuConfig = selectContextMenuConfig;
var selectContextMenuTriggerFile = function (state) {
    var _a;
    var config = exports.selectContextMenuConfig(state);
    if (!config || !config.triggerFileId)
        return null;
    var fileMap = exports.selectFileMap(state);
    return (_a = fileMap[config.triggerFileId]) !== null && _a !== void 0 ? _a : null;
};
exports.selectContextMenuTriggerFile = selectContextMenuTriggerFile;
// Selectors meant to be used outside of Redux code
var getFileData = function (state, fileId) {
    return fileId ? exports.selectFileMap(state)[fileId] : null;
};
exports.getFileData = getFileData;
var getIsFileSelected = function (state, file) {
    // !!! We deliberately don't use `FileHelper.isSelectable` here as we want to
    //     reflect the state of Redux store accurately.
    return !!exports.selectSelectionMap(state)[file.id];
};
exports.getIsFileSelected = getIsFileSelected;
var getSelectedFiles = function (state) {
    var filters = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        filters[_i - 1] = arguments[_i];
    }
    var fileMap = state.fileMap, selectionMap = state.selectionMap;
    var selectedFiles = Object.keys(selectionMap).map(function (id) { return fileMap[id]; });
    var filteredSelectedFiles = filters.reduce(function (prevFiles, filter) { return (filter ? prevFiles.filter(filter) : prevFiles); }, selectedFiles);
    return filteredSelectedFiles;
};
exports.getSelectedFiles = getSelectedFiles;
var getSelectedFilesForAction = function (state, fileActionId) {
    return exports.selectSelectedFilesForAction(fileActionId)(state);
};
exports.getSelectedFilesForAction = getSelectedFilesForAction;
