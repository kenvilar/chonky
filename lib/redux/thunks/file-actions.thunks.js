"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.thunkApplySelectionTransform = exports.thunkToggleOption = exports.thunkActivateSortAction = exports.thunkUpdateDefaultFileViewActionId = exports.thunkUpdateToolbarNContextMenuItems = exports.thunkUpdateRawFileActions = void 0;
var index_1 = require("../../action-definitions/index");
var sort_types_1 = require("../../types/sort.types");
var files_transforms_1 = require("../files-transforms");
var reducers_1 = require("../reducers");
var selectors_1 = require("../selectors");
var files_thunks_1 = require("./files.thunks");
/**
 * Merges multiple file action arrays into one while removing duplicates
 */
var mergeFileActionsArrays = function () {
    var _a;
    var fileActionArrays = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fileActionArrays[_i] = arguments[_i];
    }
    var seenActionIds = new Set();
    var addToSeen = function (a) { return !!seenActionIds.add(a.id); };
    var wasNotSeen = function (a) { return !seenActionIds.has(a.id); };
    var duplicateFreeArrays = fileActionArrays.map(function (arr) {
        var duplicateFreeArray = arr.filter(wasNotSeen);
        duplicateFreeArray.map(addToSeen);
        return duplicateFreeArray;
    });
    return (_a = new Array()).concat.apply(_a, duplicateFreeArrays);
};
exports.thunkUpdateRawFileActions = function (rawFileActions, disableDefaultFileActions) { return function (dispatch) {
    var _a = files_transforms_1.sanitizeInputArray('fileActions', rawFileActions), sanitizedArray = _a.sanitizedArray, errorMessages = _a.errorMessages;
    // Add default actions unless user disabled them
    var defaultActionsToAdd;
    if (Array.isArray(disableDefaultFileActions)) {
        var disabledActionIds_1 = new Set(disableDefaultFileActions);
        defaultActionsToAdd = index_1.DefaultFileActions.filter(function (action) { return !disabledActionIds_1.has(action.id); });
    }
    else if (disableDefaultFileActions) {
        defaultActionsToAdd = [];
    }
    else {
        defaultActionsToAdd = index_1.DefaultFileActions;
    }
    var fileActions = mergeFileActionsArrays(sanitizedArray, index_1.EssentialFileActions, defaultActionsToAdd);
    var optionDefaults = {};
    fileActions.map(function (a) {
        return a.option ? (optionDefaults[a.option.id] = a.option.defaultValue) : null;
    });
    dispatch(reducers_1.reduxActions.setRawFileActions(rawFileActions));
    dispatch(reducers_1.reduxActions.setFileActionsErrorMessages(errorMessages));
    dispatch(reducers_1.reduxActions.setFileActions(fileActions));
    dispatch(reducers_1.reduxActions.setOptionDefaults(optionDefaults));
    dispatch(exports.thunkUpdateToolbarNContextMenuItems(fileActions));
    dispatch(files_thunks_1.thunkSortFiles());
    dispatch(files_thunks_1.thunkUpdateHiddenFiles());
    dispatch(files_thunks_1.thunkUpdateDisplayFiles());
}; };
exports.thunkUpdateToolbarNContextMenuItems = function (fileActions) { return function (dispatch) {
    var excludedToolbarFileActionIds = new Set([
        // TODO: Move decision to exclude actions somewhere else, as users' custom
        //  components might not give these actions special treatment like Chonky does.
        index_1.ChonkyActions.OpenParentFolder.id,
    ]);
    var toolbarItems = [];
    var seenToolbarGroups = {};
    var contextMenuItems = [];
    var seenContextMenuGroups = {};
    var getGroup = function (itemArray, seenMap, groupName) {
        if (seenMap[groupName])
            return seenMap[groupName];
        var group = { name: groupName, fileActionIds: [] };
        itemArray.push(group);
        seenMap[groupName] = group;
        return group;
    };
    for (var _i = 0, fileActions_1 = fileActions; _i < fileActions_1.length; _i++) {
        var action = fileActions_1[_i];
        var button = action.button;
        if (!button)
            continue;
        if (button.toolbar && !excludedToolbarFileActionIds.has(action.id)) {
            if (button.group) {
                var group = getGroup(toolbarItems, seenToolbarGroups, button.group);
                group.fileActionIds.push(action.id);
            }
            else {
                toolbarItems.push(action.id);
            }
        }
        if (button.contextMenu) {
            if (button.group) {
                var group = getGroup(contextMenuItems, seenContextMenuGroups, button.group);
                group.fileActionIds.push(action.id);
            }
            else {
                contextMenuItems.push(action.id);
            }
        }
    }
    dispatch(reducers_1.reduxActions.updateFileActionMenuItems([toolbarItems, contextMenuItems]));
}; };
exports.thunkUpdateDefaultFileViewActionId = function (fileActionId) { return function (dispatch, getState) {
    var fileActionMap = getState().fileActionMap;
    var action = fileActionId ? fileActionMap[fileActionId] : null;
    if (action && action.fileViewConfig) {
        dispatch(reducers_1.reduxActions.setFileViewConfig(action.fileViewConfig));
    }
}; };
exports.thunkActivateSortAction = function (fileActionId) { return function (dispatch, getState) {
    if (!fileActionId)
        return;
    var _a = getState(), oldActionId = _a.sortActionId, oldOrder = _a.sortOrder, fileActionMap = _a.fileActionMap;
    var action = fileActionMap[fileActionId];
    if (!action || !action.sortKeySelector)
        return;
    var order = oldOrder === sort_types_1.SortOrder.ASC ? sort_types_1.SortOrder.DESC : sort_types_1.SortOrder.ASC;
    if (oldActionId !== fileActionId) {
        order = sort_types_1.SortOrder.ASC;
    }
    dispatch(reducers_1.reduxActions.setSort({ actionId: fileActionId, order: order }));
    dispatch(files_thunks_1.thunkSortFiles());
    dispatch(files_thunks_1.thunkUpdateDisplayFiles());
}; };
exports.thunkToggleOption = function (optionId) { return function (dispatch) {
    dispatch(reducers_1.reduxActions.toggleOption(optionId));
    if (optionId === index_1.ChonkyActions.ToggleShowFoldersFirst.option.id) {
        dispatch(files_thunks_1.thunkSortFiles());
        dispatch(files_thunks_1.thunkUpdateDisplayFiles());
    }
    else if (optionId === index_1.ChonkyActions.ToggleHiddenFiles.option.id) {
        dispatch(files_thunks_1.thunkUpdateHiddenFiles());
        dispatch(files_thunks_1.thunkUpdateDisplayFiles());
    }
}; };
exports.thunkApplySelectionTransform = function (action) { return function (dispatch, getState) {
    var selectionTransform = action.selectionTransform;
    if (!selectionTransform)
        return;
    var state = getState();
    var prevSelection = new Set(Object.keys(selectors_1.selectSelectionMap(state)));
    var hiddenFileIds = new Set(Object.keys(selectors_1.selectHiddenFileIdMap(state)));
    var newSelection = selectionTransform({
        prevSelection: prevSelection,
        fileIds: selectors_1.selectCleanFileIds(state),
        fileMap: selectors_1.selectFileMap(state),
        hiddenFileIds: hiddenFileIds,
    });
    if (!newSelection)
        return;
    if (newSelection.size === 0) {
        dispatch(reducers_1.reduxActions.clearSelection());
    }
    else {
        dispatch(reducers_1.reduxActions.selectFiles({ fileIds: Array.from(newSelection), reset: true }));
    }
}; };
