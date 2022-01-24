"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.triggerDispatchAfterEffect = exports.thunkRequestFileAction = exports.thunkDispatchFileAction = void 0;
var logger_1 = require("../../util/logger");
var reducers_1 = require("../reducers");
var selectors_1 = require("../selectors");
var file_actions_thunks_1 = require("./file-actions.thunks");
/**
 * Thunk that dispatches actions to the external (user-provided) action handler.
 */
var thunkDispatchFileAction = function (data) { return function (dispatch, getState) {
    logger_1.Logger.debug("FILE ACTION DISPATCH: [".concat(data.id, "]"), 'data:', data);
    var state = getState();
    var action = (0, selectors_1.selectFileActionMap)(state)[data.id];
    var externalFileActionHandler = (0, selectors_1.selectExternalFileActionHandler)(state);
    if (action) {
        if (externalFileActionHandler) {
            Promise.resolve(externalFileActionHandler(data)).catch(function (error) {
                return logger_1.Logger.error("User-defined file action handler threw an error: ".concat(error.message));
            });
        }
    }
    else {
        logger_1.Logger.warn("Internal components dispatched the \"".concat(data.id, "\" file action, but such ") +
            "action was not registered.");
    }
}; };
exports.thunkDispatchFileAction = thunkDispatchFileAction;
/**
 * Thunk that is used by internal components (and potentially the user) to "request"
 * actions. When action is requested, Chonky "prepares" the action data by extracting it
 * from Redux state. Once action data is ready, Chonky executes some side effect and/or
 * dispatches the action to the external action handler.
 */
var thunkRequestFileAction = function (action, payload) { return function (dispatch, getState) {
    logger_1.Logger.debug("FILE ACTION REQUEST: [".concat(action.id, "]"), 'action:', action, 'payload:', payload);
    var state = getState();
    var instanceId = (0, selectors_1.selectInstanceId)(state);
    if (!(0, selectors_1.selectFileActionMap)(state)[action.id]) {
        logger_1.Logger.warn("The action \"".concat(action.id, "\" was requested, but it is not registered. The ") +
            "action will still be dispatched, but this might indicate a bug in " +
            "the code. Please register your actions by passing them to " +
            "\"fileActions\" prop.");
    }
    // Determine files for the action if action requires selection
    var selectedFiles = (0, selectors_1.selectSelectedFiles)(state);
    var selectedFilesForAction = action.fileFilter
        ? selectedFiles.filter(action.fileFilter)
        : selectedFiles;
    if (action.requiresSelection && selectedFilesForAction.length === 0) {
        logger_1.Logger.warn("Internal components requested the \"".concat(action.id, "\" file ") +
            "action, but the selection for this action was empty. This " +
            "might a bug in the code of the presentational components.");
        return;
    }
    var contextMenuTriggerFile = (0, selectors_1.selectContextMenuTriggerFile)(state);
    var actionState = {
        instanceId: instanceId,
        selectedFiles: selectedFiles,
        selectedFilesForAction: selectedFilesForAction,
        contextMenuTriggerFile: contextMenuTriggerFile,
    };
    // === Update sort state if necessary
    var sortKeySelector = action.sortKeySelector;
    if (sortKeySelector)
        dispatch((0, file_actions_thunks_1.thunkActivateSortAction)(action.id));
    // === Update file view state if necessary
    var fileViewConfig = action.fileViewConfig;
    if (fileViewConfig)
        dispatch(reducers_1.reduxActions.setFileViewConfig(fileViewConfig));
    // === Update option state if necessary
    var option = action.option;
    if (option)
        dispatch((0, file_actions_thunks_1.thunkToggleOption)(option.id));
    // === Apply selection transform if necessary
    var selectionTransform = action.selectionTransform;
    if (selectionTransform)
        dispatch((0, file_actions_thunks_1.thunkApplySelectionTransform)(action));
    // Apply the effect
    var effect = action.effect;
    var maybeEffectPromise = undefined;
    if (effect) {
        try {
            maybeEffectPromise = effect({
                action: action,
                payload: payload,
                state: actionState,
                reduxDispatch: dispatch,
                getReduxState: getState,
            });
        }
        catch (error) {
            logger_1.Logger.error("User-defined effect function for action ".concat(action.id, " threw an ") +
                "error: ".concat(error.message));
        }
    }
    // Dispatch the action to user code. Deliberately call it after all other
    // operations are over.
    return Promise.resolve(maybeEffectPromise)
        .then(function (effectResult) {
        var data = {
            id: action.id,
            action: action,
            payload: payload,
            state: actionState,
        };
        (0, exports.triggerDispatchAfterEffect)(dispatch, data, effectResult);
    })
        .catch(function (error) {
        logger_1.Logger.error("User-defined effect function for action ".concat(action.id, " returned a ") +
            "promise that was rejected: ".concat(error.message));
        var data = {
            id: action.id,
            action: action,
            payload: payload,
            state: actionState,
        };
        (0, exports.triggerDispatchAfterEffect)(dispatch, data, undefined);
    });
}; };
exports.thunkRequestFileAction = thunkRequestFileAction;
var triggerDispatchAfterEffect = function (dispatch, data, effectResult) {
    var preventDispatch = effectResult === true;
    if (!preventDispatch)
        dispatch((0, exports.thunkDispatchFileAction)(data));
};
exports.triggerDispatchAfterEffect = triggerDispatchAfterEffect;
