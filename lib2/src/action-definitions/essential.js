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
exports.EssentialActions = void 0;
var reducers_1 = require("../redux/reducers");
var selectors_1 = require("../redux/selectors");
var dispatchers_thunks_1 = require("../redux/thunks/dispatchers.thunks");
var icons_types_1 = require("../types/icons.types");
var file_helper_1 = require("../util/file-helper");
var helpers_1 = require("../util/helpers");
var logger_1 = require("../util/logger");
var index_1 = require("./index");
exports.EssentialActions = {
    /**
     * Action that is dispatched when the user clicks on a file entry using their mouse.
     * Both single clicks and double clicks trigger this action.
     */
    MouseClickFile: (0, helpers_1.defineFileAction)({
        id: 'mouse_click_file',
        __payloadType: {},
    }, function (_a) {
        var _b;
        var payload = _a.payload, reduxDispatch = _a.reduxDispatch, getReduxState = _a.getReduxState;
        if (payload.clickType === 'double') {
            if (file_helper_1.FileHelper.isOpenable(payload.file)) {
                reduxDispatch((0, dispatchers_thunks_1.thunkRequestFileAction)(index_1.ChonkyActions.OpenFiles, {
                    targetFile: payload.file,
                    // To simulate Windows Explorer and Nautilus behaviour,
                    // a double click on a file only opens that file even if
                    // there is a selection.
                    files: [payload.file],
                }));
            }
        }
        else {
            // We're dealing with a single click
            var disableSelection = (0, selectors_1.selectDisableSelection)(getReduxState());
            if (file_helper_1.FileHelper.isSelectable(payload.file) && !disableSelection) {
                if (payload.ctrlKey) {
                    // Multiple selection
                    reduxDispatch(reducers_1.reduxActions.toggleSelection({
                        fileId: payload.file.id,
                        exclusive: false,
                    }));
                    reduxDispatch(reducers_1.reduxActions.setLastClickIndex(payload.fileDisplayIndex));
                }
                else if (payload.shiftKey) {
                    // Range selection
                    var lastClickIndex = (0, selectors_1.selectLastClickIndex)(getReduxState());
                    if (typeof lastClickIndex === 'number') {
                        // We have the index of the previous click
                        var rangeStart = lastClickIndex;
                        var rangeEnd = payload.fileDisplayIndex;
                        if (rangeStart > rangeEnd) {
                            _b = [rangeEnd, rangeStart], rangeStart = _b[0], rangeEnd = _b[1];
                        }
                        reduxDispatch(reducers_1.reduxActions.selectRange({ rangeStart: rangeStart, rangeEnd: rangeEnd }));
                    }
                    else {
                        // Since we can't do a range selection, do a
                        // multiple selection
                        reduxDispatch(reducers_1.reduxActions.toggleSelection({
                            fileId: payload.file.id,
                            exclusive: false,
                        }));
                        reduxDispatch(reducers_1.reduxActions.setLastClickIndex(payload.fileDisplayIndex));
                    }
                }
                else {
                    // Exclusive selection
                    reduxDispatch(reducers_1.reduxActions.toggleSelection({
                        fileId: payload.file.id,
                        exclusive: true,
                    }));
                    reduxDispatch(reducers_1.reduxActions.setLastClickIndex(payload.fileDisplayIndex));
                }
            }
            else {
                if (!payload.ctrlKey && !disableSelection) {
                    reduxDispatch(reducers_1.reduxActions.clearSelection());
                }
                reduxDispatch(reducers_1.reduxActions.setLastClickIndex(payload.fileDisplayIndex));
            }
        }
    }),
    /**
     * Action that is dispatched when the user "clicks" on a file using their keyboard.
     * Using Space and Enter keys counts as clicking.
     */
    KeyboardClickFile: (0, helpers_1.defineFileAction)({
        id: 'keyboard_click_file',
        __payloadType: {},
    }, function (_a) {
        var payload = _a.payload, reduxDispatch = _a.reduxDispatch, getReduxState = _a.getReduxState;
        reduxDispatch(reducers_1.reduxActions.setLastClickIndex(payload.fileDisplayIndex));
        if (payload.enterKey) {
            // We only dispatch the Open Files action here when the selection is
            // empty. Otherwise, `Enter` key presses are handled by the
            // hotkey manager for the Open Files action.
            if ((0, selectors_1.selectSelectionSize)(getReduxState()) === 0) {
                reduxDispatch((0, dispatchers_thunks_1.thunkRequestFileAction)(index_1.ChonkyActions.OpenFiles, {
                    targetFile: payload.file,
                    files: [payload.file],
                }));
            }
        }
        else if (payload.spaceKey && file_helper_1.FileHelper.isSelectable(payload.file)) {
            reduxDispatch(reducers_1.reduxActions.toggleSelection({
                fileId: payload.file.id,
                exclusive: payload.ctrlKey,
            }));
        }
    }),
    /**
     * Action that is dispatched when user starts dragging some file.
     */
    StartDragNDrop: (0, helpers_1.defineFileAction)({
        id: 'start_drag_n_drop',
        __payloadType: {},
    }, function (_a) {
        var payload = _a.payload, reduxDispatch = _a.reduxDispatch, getReduxState = _a.getReduxState;
        var file = payload.draggedFile;
        if (!(0, selectors_1.getIsFileSelected)(getReduxState(), file)) {
            if (file_helper_1.FileHelper.isSelectable(file)) {
                reduxDispatch(reducers_1.reduxActions.selectFiles({
                    fileIds: [file.id],
                    reset: true,
                }));
            }
        }
    }),
    /**
     * Action that is dispatched when user either cancels the drag & drop interaction,
     * or drops a file somewhere.
     */
    EndDragNDrop: (0, helpers_1.defineFileAction)({
        id: 'end_drag_n_drop',
        __payloadType: {},
    }, function (_a) {
        var payload = _a.payload, reduxDispatch = _a.reduxDispatch, getReduxState = _a.getReduxState;
        if ((0, selectors_1.getIsFileSelected)(getReduxState(), payload.destination)) {
            // Can't drop a selection into itself
            return;
        }
        var _b = payload, draggedFile = _b.draggedFile, selectedFiles = _b.selectedFiles;
        var droppedFiles = selectedFiles.length > 0 ? selectedFiles : [draggedFile];
        reduxDispatch((0, dispatchers_thunks_1.thunkRequestFileAction)(index_1.ChonkyActions.MoveFiles, __assign(__assign({}, payload), { files: droppedFiles })));
    }),
    /**
     * Action that is dispatched when user moves files from one folder to another,
     * usually by dragging & dropping some files into the folder.
     */
    MoveFiles: (0, helpers_1.defineFileAction)({
        id: 'move_files',
        __payloadType: {},
    }),
    /**
     * Action that is dispatched when the selection changes for any reason.
     */
    ChangeSelection: (0, helpers_1.defineFileAction)({
        id: 'change_selection',
        __payloadType: {},
    }),
    /**
     * Action that is dispatched when user wants to open some files. This action is
     * often triggered by other actions.
     */
    OpenFiles: (0, helpers_1.defineFileAction)({
        id: 'open_files',
        __payloadType: {},
    }),
    /**
     * Action that is triggered when user wants to go up a directory.
     */
    OpenParentFolder: (0, helpers_1.defineFileAction)({
        id: 'open_parent_folder',
        hotkeys: ['backspace'],
        button: {
            name: 'Go up a directory',
            toolbar: true,
            contextMenu: false,
            icon: icons_types_1.ChonkyIconName.openParentFolder,
            iconOnly: true,
        },
    }, function (_a) {
        var reduxDispatch = _a.reduxDispatch, getReduxState = _a.getReduxState;
        var parentFolder = (0, selectors_1.selectParentFolder)(getReduxState());
        if (file_helper_1.FileHelper.isOpenable(parentFolder)) {
            reduxDispatch((0, dispatchers_thunks_1.thunkRequestFileAction)(index_1.ChonkyActions.OpenFiles, {
                targetFile: parentFolder,
                files: [parentFolder],
            }));
        }
        else {
            logger_1.Logger.warn('Open parent folder effect was triggered  even though the parent folder' +
                ' is not openable. This indicates a bug in presentation components.');
        }
    }),
    /**
     * Action that is dispatched when user opens the context menu, either by right click
     * on something or using the context menu button on their keyboard.
     */
    OpenFileContextMenu: (0, helpers_1.defineFileAction)({
        id: 'open_file_context_menu',
        __payloadType: {},
    }, function (_a) {
        var payload = _a.payload, reduxDispatch = _a.reduxDispatch, getReduxState = _a.getReduxState;
        // TODO: Check if the context menu component is actually enabled. There is a
        //  chance it doesn't matter if it is enabled or not - if it is not mounted,
        //  the action will simply have no effect. It also allows users to provide
        //  their own components - however, users could also flip the "context menu
        //  component mounted" switch...
        var triggerFile = (0, selectors_1.getFileData)(getReduxState(), payload.triggerFileId);
        if (triggerFile) {
            var fileSelected = (0, selectors_1.getIsFileSelected)(getReduxState(), triggerFile);
            if (!fileSelected) {
                // If file is selected, we leave the selection as is. If it is not
                // selected, it means user right clicked the file with no selection.
                // We simulate the Windows Explorer/Nautilus behaviour of moving
                // selection to this file.
                if (file_helper_1.FileHelper.isSelectable(triggerFile)) {
                    reduxDispatch(reducers_1.reduxActions.selectFiles({
                        fileIds: [payload.triggerFileId],
                        reset: true,
                    }));
                }
                else {
                    reduxDispatch(reducers_1.reduxActions.clearSelection());
                }
            }
        }
        reduxDispatch(reducers_1.reduxActions.showContextMenu({
            triggerFileId: payload.triggerFileId,
            mouseX: payload.clientX - 2,
            mouseY: payload.clientY - 4,
        }));
    }),
};
