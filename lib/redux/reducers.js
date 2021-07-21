"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootReducer = exports.reduxActions = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var file_helper_1 = require("../util/file-helper");
var state_1 = require("./state");
exports.reduxActions = (_a = toolkit_1.createSlice({
    name: 'root',
    initialState: state_1.initialRootState,
    reducers: {
        setExternalFileActionHandler: function (state, action) {
            var _a;
            state.externalFileActionHandler = (_a = action.payload) !== null && _a !== void 0 ? _a : null;
        },
        setRawFileActions: function (state, action) {
            state.rawFileActions = action.payload;
        },
        setFileActionsErrorMessages: function (state, action) {
            state.fileActionsErrorMessages = action.payload;
        },
        setFileActions: function (state, action) {
            var fileActionMap = {};
            action.payload.map(function (a) { return (fileActionMap[a.id] = a); });
            var fileIds = action.payload.map(function (a) { return a.id; });
            state.fileActionMap = fileActionMap;
            state.fileActionIds = fileIds;
        },
        updateFileActionMenuItems: function (state, action) {
            var _a;
            _a = action.payload, state.toolbarItems = _a[0], state.contextMenuItems = _a[1];
        },
        setRawFolderChain: function (state, action) {
            state.rawFolderChain = action.payload;
        },
        setFolderChainErrorMessages: function (state, action) {
            state.folderChainErrorMessages = action.payload;
        },
        setFolderChain: function (state, action) {
            state.folderChain = action.payload;
        },
        setRawFiles: function (state, action) {
            state.rawFiles = action.payload;
        },
        setFilesErrorMessages: function (state, action) {
            state.filesErrorMessages = action.payload;
        },
        setFiles: function (state, action) {
            var fileMap = {};
            action.payload.map(function (f) { return (f ? (fileMap[f.id] = f) : null); });
            var fileIds = action.payload.map(function (f) { return (f ? f.id : null); });
            var cleanFileIds = fileIds.filter(function (f) { return !!f; });
            state.fileMap = fileMap;
            state.fileIds = fileIds;
            state.cleanFileIds = cleanFileIds;
        },
        setSortedFileIds: function (state, action) {
            state.sortedFileIds = action.payload;
        },
        setHiddenFileIds: function (state, action) {
            state.hiddenFileIdMap = action.payload;
        },
        setDisplayFileIds: function (state, action) {
            state.displayFileIds = action.payload;
        },
        setFocusSearchInput: function (state, action) {
            state.focusSearchInput = action.payload;
        },
        setSearchString: function (state, action) {
            state.searchString = action.payload;
        },
        selectAllFiles: function (state) {
            state.fileIds
                .filter(function (id) { return id && file_helper_1.FileHelper.isSelectable(state.fileMap[id]); })
                .map(function (id) { return (id ? (state.selectionMap[id] = true) : null); });
        },
        selectRange: function (state, action) {
            if (state.disableSelection)
                return;
            state.selectionMap = {};
            state.displayFileIds
                .slice(action.payload.rangeStart, action.payload.rangeEnd + 1)
                .filter(function (id) { return id && file_helper_1.FileHelper.isSelectable(state.fileMap[id]); })
                .map(function (id) { return (state.selectionMap[id] = true); });
        },
        selectFiles: function (state, action) {
            if (state.disableSelection)
                return;
            if (action.payload.reset)
                state.selectionMap = {};
            action.payload.fileIds
                .filter(function (id) { return id && file_helper_1.FileHelper.isSelectable(state.fileMap[id]); })
                .map(function (id) { return (state.selectionMap[id] = true); });
        },
        toggleSelection: function (state, action) {
            if (state.disableSelection)
                return;
            var oldValue = !!state.selectionMap[action.payload.fileId];
            if (action.payload.exclusive)
                state.selectionMap = {};
            if (oldValue)
                delete state.selectionMap[action.payload.fileId];
            else if (file_helper_1.FileHelper.isSelectable(state.fileMap[action.payload.fileId])) {
                state.selectionMap[action.payload.fileId] = true;
            }
        },
        cleanUpSelection: function (state) {
            // Make sure files that are not visible anymore are not a part of the
            // selection.
            var newSelectionMap = {};
            state.displayFileIds.map(function (id) {
                if (id && id in state.selectionMap)
                    newSelectionMap[id] = true;
            });
            state.selectionMap = newSelectionMap;
        },
        clearSelection: function (state) {
            if (state.disableSelection)
                return;
            if (Object.keys(state.selectionMap).length !== 0)
                state.selectionMap = {};
        },
        setSelectionDisabled: function (state, action) {
            state.disableSelection = action.payload;
        },
        setFileViewConfig: function (state, action) {
            state.fileViewConfig = action.payload;
        },
        setSort: function (state, action) {
            state.sortActionId = action.payload.actionId;
            state.sortOrder = action.payload.order;
        },
        setOptionDefaults: function (state, action) {
            for (var _i = 0, _a = Object.keys(action.payload); _i < _a.length; _i++) {
                var optionId = _a[_i];
                if (optionId in state.optionMap)
                    continue;
                state.optionMap[optionId] = action.payload[optionId];
            }
        },
        toggleOption: function (state, action) {
            state.optionMap[action.payload] = !state.optionMap[action.payload];
        },
        setThumbnailGenerator: function (state, action) {
            state.thumbnailGenerator = action.payload;
        },
        setDoubleClickDelay: function (state, action) {
            state.doubleClickDelay = action.payload;
        },
        setDisableDragAndDrop: function (state, action) {
            state.disableDragAndDrop = action.payload;
        },
        setClearSelectionOnOutsideClick: function (state, action) {
            state.clearSelectionOnOutsideClick = action.payload;
        },
        setLastClickIndex: function (state, action) {
            state.lastClickIndex = action.payload;
        },
        setContextMenuMounted: function (state, action) {
            state.contextMenuMounted = action.payload;
        },
        showContextMenu: function (state, action) {
            state.contextMenuConfig = action.payload;
        },
        hideContextMenu: function (state) {
            if (!state.contextMenuConfig)
                return;
            state.contextMenuConfig = null;
        },
    },
}), _a.actions), exports.rootReducer = _a.reducer;
