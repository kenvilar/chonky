"use strict";
/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChonkyBusinessLogic = exports.ChonkyBusinessLogicInner = void 0;
var react_1 = __importDefault(require("react"));
var reducers_1 = require("../../redux/reducers");
var state_1 = require("../../redux/state");
var store_1 = require("../../redux/store");
var file_actions_thunks_1 = require("../../redux/thunks/file-actions.thunks");
var files_thunks_1 = require("../../redux/thunks/files.thunks");
var default_config_1 = require("../../util/default-config");
var file_browser_handle_1 = require("../../util/file-browser-handle");
var helpers_1 = require("../../util/helpers");
exports.ChonkyBusinessLogicInner = react_1.default.forwardRef(function (props, ref) {
    var _a;
    // ==== Update Redux state
    store_1.useDTE(files_thunks_1.thunkUpdateRawFiles, (_a = props.files) !== null && _a !== void 0 ? _a : state_1.initialRootState.rawFiles);
    store_1.useDTE(files_thunks_1.thunkUpdateRawFolderChain, props.folderChain);
    store_1.useDTE(file_actions_thunks_1.thunkUpdateRawFileActions, helpers_1.getValueOrFallback(props.fileActions, default_config_1.defaultConfig.fileActions), helpers_1.getValueOrFallback(props.disableDefaultFileActions, default_config_1.defaultConfig.disableDefaultFileActions));
    store_1.useDTE(reducers_1.reduxActions.setExternalFileActionHandler, helpers_1.getValueOrFallback(props.onFileAction, default_config_1.defaultConfig.onFileAction));
    store_1.useDTE(reducers_1.reduxActions.setSelectionDisabled, helpers_1.getValueOrFallback(props.disableSelection, default_config_1.defaultConfig.disableSelection, 'boolean'));
    store_1.useDTE(file_actions_thunks_1.thunkActivateSortAction, helpers_1.getValueOrFallback(props.defaultSortActionId, default_config_1.defaultConfig.defaultSortActionId));
    store_1.useDTE(file_actions_thunks_1.thunkUpdateDefaultFileViewActionId, helpers_1.getValueOrFallback(props.defaultFileViewActionId, default_config_1.defaultConfig.defaultFileViewActionId, 'string'));
    store_1.useDTE(reducers_1.reduxActions.setThumbnailGenerator, helpers_1.getValueOrFallback(props.thumbnailGenerator, default_config_1.defaultConfig.thumbnailGenerator));
    store_1.useDTE(reducers_1.reduxActions.setDoubleClickDelay, helpers_1.getValueOrFallback(props.doubleClickDelay, default_config_1.defaultConfig.doubleClickDelay, 'number'));
    store_1.useDTE(reducers_1.reduxActions.setDisableDragAndDrop, helpers_1.getValueOrFallback(props.disableDragAndDrop, default_config_1.defaultConfig.disableDragAndDrop, 'boolean'));
    store_1.useDTE(reducers_1.reduxActions.setClearSelectionOnOutsideClick, helpers_1.getValueOrFallback(props.clearSelectionOnOutsideClick, default_config_1.defaultConfig.clearSelectionOnOutsideClick, 'boolean'));
    // ==== Setup the imperative handle for external use
    file_browser_handle_1.useFileBrowserHandle(ref);
    return null;
});
exports.ChonkyBusinessLogicInner.displayName = 'ChonkyBusinessLogicInner';
exports.ChonkyBusinessLogic = react_1.default.memo(exports.ChonkyBusinessLogicInner);
exports.ChonkyBusinessLogic.displayName = 'ChonkyBusinessLogic';
