"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultActions = void 0;
var selectors_1 = require("../redux/selectors");
var dispatchers_thunks_1 = require("../redux/thunks/dispatchers.thunks");
var file_view_types_1 = require("../types/file-view.types");
var icons_types_1 = require("../types/icons.types");
var file_helper_1 = require("../util/file-helper");
var helpers_1 = require("../util/helpers");
var essential_1 = require("./essential");
exports.DefaultActions = {
    /**
     * Action that can be used to open currently selected files.
     */
    OpenSelection: helpers_1.defineFileAction({
        id: 'open_selection',
        hotkeys: ['enter'],
        requiresSelection: true,
        fileFilter: file_helper_1.FileHelper.isOpenable,
        button: {
            name: 'Open selection',
            toolbar: true,
            contextMenu: true,
            group: 'Actions',
            icon: icons_types_1.ChonkyIconName.openFiles,
        },
    }, function (_a) {
        var state = _a.state, reduxDispatch = _a.reduxDispatch;
        reduxDispatch(dispatchers_thunks_1.thunkRequestFileAction(essential_1.EssentialActions.OpenFiles, {
            files: state.selectedFilesForAction,
        }));
        return undefined;
    }),
    /**
     * Action that selects all files.
     */
    SelectAllFiles: helpers_1.defineFileAction({
        id: 'select_all_files',
        hotkeys: ['ctrl+a'],
        button: {
            name: 'Select all files',
            toolbar: true,
            contextMenu: true,
            group: 'Actions',
            icon: icons_types_1.ChonkyIconName.selectAllFiles,
        },
        selectionTransform: (function (_a) {
            var fileIds = _a.fileIds, hiddenFileIds = _a.hiddenFileIds;
            var newSelection = new Set();
            fileIds.map(function (fileId) {
                // We don't need to check if file is selectable because Chonky does
                // it own checks internally.
                if (!hiddenFileIds.has(fileId))
                    newSelection.add(fileId);
            });
            return newSelection;
        }),
    }),
    /**
     * Action that clear the file selection.
     */
    ClearSelection: helpers_1.defineFileAction({
        id: 'clear_selection',
        hotkeys: ['escape'],
        button: {
            name: 'Clear selection',
            toolbar: true,
            contextMenu: true,
            group: 'Actions',
            icon: icons_types_1.ChonkyIconName.clearSelection,
        },
        selectionTransform: (function (_a) {
            var prevSelection = _a.prevSelection;
            if (prevSelection.size === 0)
                return null;
            return new Set();
        }),
    }),
    /**
     * Action that enables List view.
     */
    EnableListView: helpers_1.defineFileAction({
        id: 'enable_list_view',
        fileViewConfig: {
            mode: file_view_types_1.FileViewMode.List,
            entryHeight: 30,
        },
        button: {
            name: 'Switch to List view',
            toolbar: true,
            icon: icons_types_1.ChonkyIconName.list,
            iconOnly: true,
        },
    }),
    /**
     * Action that enables Compact view. Note that compact view is still
     * experimental and should not be used in production.
     */
    EnableCompactView: helpers_1.defineFileAction({
        // TODO: Don't enable until compact view is fully supported
        id: 'enable_compact_view',
        fileViewConfig: {
            mode: file_view_types_1.FileViewMode.Compact,
            entryHeight: 40,
            entryWidth: 220,
        },
        button: {
            name: 'Switch to Compact view',
            toolbar: true,
            icon: icons_types_1.ChonkyIconName.compact,
            iconOnly: true,
        },
    }),
    /**
     * Action that enables Grid view.
     */
    EnableGridView: helpers_1.defineFileAction({
        id: 'enable_grid_view',
        fileViewConfig: { mode: file_view_types_1.FileViewMode.Grid, entryWidth: 165, entryHeight: 130 },
        button: {
            name: 'Switch to Grid view',
            toolbar: true,
            icon: icons_types_1.ChonkyIconName.smallThumbnail,
            iconOnly: true,
        },
    }),
    /**
     * Action that sorts files by `file.name`.
     */
    SortFilesByName: helpers_1.defineFileAction({
        id: 'sort_files_by_name',
        sortKeySelector: function (file) {
            return file ? file.name.toLowerCase() : undefined;
        },
        button: {
            name: 'Sort by name',
            toolbar: true,
            group: 'Options',
        },
    }),
    /**
     * Action that sorts files by `file.size`.
     */
    SortFilesBySize: helpers_1.defineFileAction({
        id: 'sort_files_by_size',
        sortKeySelector: function (file) { return (file ? file.size : undefined); },
        button: {
            name: 'Sort by size',
            toolbar: true,
            group: 'Options',
        },
    }),
    /**
     * Action that sorts files by `file.modDate`.
     */
    SortFilesByDate: helpers_1.defineFileAction({
        id: 'sort_files_by_date',
        sortKeySelector: function (file) {
            return file ? file.modDate : undefined;
        },
        button: {
            name: 'Sort by date',
            toolbar: true,
            group: 'Options',
        },
    }),
    /**
     * Action that toggles whether hidden files are shown to the user or not.
     */
    ToggleHiddenFiles: helpers_1.defineFileAction({
        id: 'toggle_hidden_files',
        hotkeys: ['ctrl+h'],
        option: {
            id: 'show_hidden_files',
            defaultValue: true,
        },
        button: {
            name: 'Show hidden files',
            toolbar: true,
            group: 'Options',
        },
    }),
    /**
     * Action that toggles whether folders should appear before files regardless of
     * current sort function.
     */
    ToggleShowFoldersFirst: helpers_1.defineFileAction({
        id: 'toggle_show_folders_first',
        option: {
            id: 'show_folders_first',
            defaultValue: true,
        },
        button: {
            name: 'Show folders first',
            toolbar: true,
            group: 'Options',
        },
    }),
    /**
     * Action that focuses the search input when it is dispatched.
     */
    FocusSearchInput: helpers_1.defineFileAction({
        id: 'focus_search_input',
        hotkeys: ['ctrl+f'],
    }, function (_a) {
        var getReduxState = _a.getReduxState;
        var focusSearchInput = selectors_1.selectFocusSearchInput(getReduxState());
        if (focusSearchInput)
            focusSearchInput();
    }),
    /**
     * Action that enables List view.
     */
    ToggleDarkMode: helpers_1.defineFileAction({
        id: 'enable_dark_mode',
        option: {
            id: 'dark_mode',
            defaultValue: false,
        },
        button: {
            name: 'Enable dark mode',
            toolbar: true,
            icon: icons_types_1.ChonkyIconName.list,
            iconOnly: true,
        },
    }),
};
