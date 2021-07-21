"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.thunkUpdateSearchString = exports.thunkUpdateDisplayFiles = exports.thunkUpdateHiddenFiles = exports.thunkSortFiles = exports.thunkUpdateRawFiles = exports.thunkUpdateRawFolderChain = void 0;
var fast_sort_1 = __importDefault(require("fast-sort"));
var index_1 = require("../../action-definitions/index");
var sort_types_1 = require("../../types/sort.types");
var file_helper_1 = require("../../util/file-helper");
var files_transforms_1 = require("../files-transforms");
var reducers_1 = require("../reducers");
var selectors_1 = require("../selectors");
var thunkUpdateRawFolderChain = function (rawFolderChain) { return function (dispatch, getState) {
    if (getState().rawFolderChain === rawFolderChain)
        return;
    var _a = files_transforms_1.sanitizeInputArray('folderChain', rawFolderChain), sanitizedArray = _a.sanitizedArray, errorMessages = _a.errorMessages;
    dispatch(reducers_1.reduxActions.setRawFolderChain(rawFolderChain));
    dispatch(reducers_1.reduxActions.setFolderChainErrorMessages(errorMessages));
    dispatch(reducers_1.reduxActions.setFolderChain(sanitizedArray));
}; };
exports.thunkUpdateRawFolderChain = thunkUpdateRawFolderChain;
var thunkUpdateRawFiles = function (rawFiles) { return function (dispatch, getState) {
    if (getState().rawFiles === rawFiles)
        return;
    var _a = files_transforms_1.sanitizeInputArray('files', rawFiles), sanitizedArray = _a.sanitizedArray, errorMessages = _a.errorMessages;
    dispatch(reducers_1.reduxActions.setRawFiles(rawFiles));
    dispatch(reducers_1.reduxActions.setFilesErrorMessages(errorMessages));
    dispatch(reducers_1.reduxActions.setFiles(sanitizedArray));
    dispatch(exports.thunkSortFiles());
    dispatch(exports.thunkUpdateHiddenFiles());
    dispatch(exports.thunkUpdateDisplayFiles());
    dispatch(reducers_1.reduxActions.cleanUpSelection());
}; };
exports.thunkUpdateRawFiles = thunkUpdateRawFiles;
var thunkSortFiles = function () { return function (dispatch, getState) {
    var _a;
    var _b = getState(), fileActionMap = _b.fileActionMap, fileMap = _b.fileMap, fileIds = _b.fileIds, sortActionId = _b.sortActionId, sortOrder = _b.sortOrder, optionMap = _b.optionMap;
    if (!sortActionId) {
        // We allow users to set the sort action ID to `null` if they want to use their
        // own sorting mechanisms instead of relying on Chonky built-in sort.
        dispatch(reducers_1.reduxActions.setSortedFileIds(fileIds));
        return;
    }
    var sortAction = fileActionMap[sortActionId];
    var sortKeySelector = sortAction ? sortAction.sortKeySelector : null;
    var showFolderFirst = optionMap[index_1.ChonkyActions.ToggleShowFoldersFirst.option.id];
    var prepareSortKeySelector = function (selector) { return function (fileId) { return selector(fileId ? fileMap[fileId] : null); }; };
    var sortFunctions = [];
    if (showFolderFirst) {
        // If option is undefined (relevant actions is not enabled), we don't show
        // folders first.
        sortFunctions.push({ desc: prepareSortKeySelector(file_helper_1.FileHelper.isDirectory) });
    }
    if (sortKeySelector) {
        var configKeyName = sortOrder === sort_types_1.SortOrder.ASC ? 'asc' : 'desc';
        sortFunctions.push((_a = {},
            _a[configKeyName] = prepareSortKeySelector(sortKeySelector),
            _a));
    }
    if (sortFunctions.length > 0) {
        // We copy the array because `fast-sort` mutates it
        var sortedFileIds = fast_sort_1.default(__spreadArray([], fileIds)).by(sortFunctions);
        dispatch(reducers_1.reduxActions.setSortedFileIds(sortedFileIds));
    }
    else {
        // When no sorting is required, we keep the original `fileIds` order
        dispatch(reducers_1.reduxActions.setSortedFileIds(fileIds));
    }
}; };
exports.thunkSortFiles = thunkSortFiles;
var thunkUpdateHiddenFiles = function () { return function (dispatch, getState, _a) {
    var getCachedSearch = _a.getCachedSearch;
    var state = getState();
    var showHiddenFiles = selectors_1.selectOptionValue(index_1.ChonkyActions.ToggleHiddenFiles.option.id)(state);
    var searchString = selectors_1.selectSearchString(state);
    if (typeof showHiddenFiles !== 'boolean' && !searchString) {
        // If option is undefined (relevant actions is not enabled), we show hidden
        // files.
        dispatch(reducers_1.reduxActions.setHiddenFileIds({}));
        return;
    }
    var cleanFileIds = selectors_1.selectCleanFileIds(state);
    var fileMap = selectors_1.selectFileMap(state);
    var foundFileIds = searchString
        ? getCachedSearch(cleanFileIds, fileMap, searchString)
        : null;
    var hiddenFileIdMap = {};
    cleanFileIds.map(function (id) {
        var file = id ? fileMap[id] : null;
        if (!file)
            return;
        var hiddenBySearch = foundFileIds ? !foundFileIds.has(file.id) : false;
        var hiddenByOptions = !showHiddenFiles && file_helper_1.FileHelper.isHidden(file);
        if (hiddenBySearch || hiddenByOptions)
            hiddenFileIdMap[file.id] = true;
    });
    dispatch(reducers_1.reduxActions.setHiddenFileIds(hiddenFileIdMap));
}; };
exports.thunkUpdateHiddenFiles = thunkUpdateHiddenFiles;
var thunkUpdateDisplayFiles = function () { return function (dispatch, getState) {
    var _a = getState(), sortedFileIds = _a.sortedFileIds, hiddenFileIdMap = _a.hiddenFileIdMap;
    var displayFileIds = sortedFileIds.filter(function (id) { return !id || !hiddenFileIdMap[id]; });
    dispatch(reducers_1.reduxActions.setDisplayFileIds(displayFileIds));
    dispatch(reducers_1.reduxActions.cleanUpSelection());
}; };
exports.thunkUpdateDisplayFiles = thunkUpdateDisplayFiles;
var thunkUpdateSearchString = function (searchString) { return function (dispatch, getState) {
    var currentSearchString = selectors_1.selectSearchString(getState());
    if (currentSearchString === searchString)
        return;
    dispatch(reducers_1.reduxActions.setSearchString(searchString));
    // TODO: Add thunk for setting search mode once global search is supported
    dispatch(exports.thunkUpdateHiddenFiles());
    dispatch(exports.thunkUpdateDisplayFiles());
}; };
exports.thunkUpdateSearchString = thunkUpdateSearchString;
