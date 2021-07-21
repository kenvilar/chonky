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
    logger_1.Logger.debug("FILE ACTION DISPATCH: [" + data.id + "]", 'data:', data);
    var state = getState();
    var action = selectors_1.selectFileActionMap(state)[data.id];
    var externalFileActionHandler = selectors_1.selectExternalFileActionHandler(state);
    if (action) {
        if (externalFileActionHandler) {
            Promise.resolve(externalFileActionHandler(data)).catch(function (error) {
                return logger_1.Logger.error("User-defined file action handler threw an error: " + error.message);
            });
        }
    }
    else {
        logger_1.Logger.warn("Internal components dispatched the \"" + data.id + "\" file action, but such " +
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
    logger_1.Logger.debug("FILE ACTION REQUEST: [" + action.id + "]", 'action:', action, 'payload:', payload);
    var state = getState();
    var instanceId = selectors_1.selectInstanceId(state);
    if (!selectors_1.selectFileActionMap(state)[action.id]) {
        logger_1.Logger.warn("The action \"" + action.id + "\" was requested, but it is not registered. The " +
            "action will still be dispatched, but this might indicate a bug in " +
            "the code. Please register your actions by passing them to " +
            "\"fileActions\" prop.");
    }
    // Determine files for the action if action requires selection
    var selectedFiles = selectors_1.selectSelectedFiles(state);
    var selectedFilesForAction = action.fileFilter
        ? selectedFiles.filter(action.fileFilter)
        : selectedFiles;
    if (action.requiresSelection && selectedFilesForAction.length === 0) {
        logger_1.Logger.warn("Internal components requested the \"" + action.id + "\" file " +
            "action, but the selection for this action was empty. This " +
            "might a bug in the code of the presentational components.");
        return;
    }
    var contextMenuTriggerFile = selectors_1.selectContextMenuTriggerFile(state);
    var actionState = {
        instanceId: instanceId,
        selectedFiles: selectedFiles,
        selectedFilesForAction: selectedFilesForAction,
        contextMenuTriggerFile: contextMenuTriggerFile,
    };
    // === Update sort state if necessary
    var sortKeySelector = action.sortKeySelector;
    if (sortKeySelector)
        dispatch(file_actions_thunks_1.thunkActivateSortAction(action.id));
    // === Update file view state if necessary
    var fileViewConfig = action.fileViewConfig;
    if (fileViewConfig)
        dispatch(reducers_1.reduxActions.setFileViewConfig(fileViewConfig));
    // === Update option state if necessary
    var option = action.option;
    if (option)
        dispatch(file_actions_thunks_1.thunkToggleOption(option.id));
    // === Apply selection transform if necessary
    var selectionTransform = action.selectionTransform;
    if (selectionTransform)
        dispatch(file_actions_thunks_1.thunkApplySelectionTransform(action));
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
            logger_1.Logger.error("User-defined effect function for action " + action.id + " threw an " +
                ("error: " + error.message));
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
        exports.triggerDispatchAfterEffect(dispatch, data, effectResult);
    })
        .catch(function (error) {
        logger_1.Logger.error("User-defined effect function for action " + action.id + " returned a " +
            ("promise that was rejected: " + error.message));
        var data = {
            id: action.id,
            action: action,
            payload: payload,
            state: actionState,
        };
        exports.triggerDispatchAfterEffect(dispatch, data, undefined);
    });
}; };
exports.thunkRequestFileAction = thunkRequestFileAction;
var triggerDispatchAfterEffect = function (dispatch, data, effectResult) {
    var preventDispatch = effectResult === true;
    if (!preventDispatch)
        dispatch(exports.thunkDispatchFileAction(data));
};
exports.triggerDispatchAfterEffect = triggerDispatchAfterEffect;
