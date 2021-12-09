"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStoreWatchers = void 0;
var react_1 = require("react");
var redux_watch_1 = __importDefault(require("redux-watch"));
var action_definitions_1 = require("../action-definitions");
var reducers_1 = require("./reducers");
var selectors_1 = require("./selectors");
var dispatchers_thunks_1 = require("./thunks/dispatchers.thunks");
exports.useStoreWatchers = function (store) {
    react_1.useEffect(function () {
        var selectionWatcher = redux_watch_1.default(function () { return selectors_1.selectSelectionMap(store.getState()); });
        var onSelectionChange = function (newSelection, oldSelection) {
            // We don't check for deep equality here as we expect the
            // reducers to prevent all unnecessary updates.
            if (newSelection === oldSelection)
                return;
            // Notify users the selection has changed.
            var selectedFilesIds = selectors_1.selectSelectedFileIds(store.getState());
            var selection = new Set(selectedFilesIds);
            store.dispatch(dispatchers_thunks_1.thunkRequestFileAction(action_definitions_1.ChonkyActions.ChangeSelection, {
                selection: selection,
            }));
        };
        var displayFileIdsWatcher = redux_watch_1.default(function () {
            return selectors_1.selectDisplayFileIds(store.getState());
        });
        var onDisplayFileIdsChange = function (oldDisplayFileIds, newDisplayFileIds) {
            var oldLastClickIndex = selectors_1.selectLastClickIndex(store.getState());
            var newLastClickIndex = oldLastClickIndex;
            if (typeof oldLastClickIndex === 'number') {
                if (oldLastClickIndex > newDisplayFileIds.length - 1) {
                    // Reset last click index if it goes beyond the size of the new
                    // array.
                    newLastClickIndex = null;
                }
                else if (oldDisplayFileIds[oldLastClickIndex] !==
                    newDisplayFileIds[oldLastClickIndex]) {
                    // Reset last click index if the file ID at the last index has
                    // changed.
                    newLastClickIndex = null;
                }
            }
            // Update last click index in the interface
            if (oldLastClickIndex !== newLastClickIndex) {
                store.dispatch(reducers_1.reduxActions.setLastClickIndex(newLastClickIndex));
            }
        };
        var unsubscribeCallbacks = [
            store.subscribe(selectionWatcher(onSelectionChange)),
            store.subscribe(displayFileIdsWatcher(onDisplayFileIdsChange)),
        ];
        return function () {
            for (var _i = 0, unsubscribeCallbacks_1 = unsubscribeCallbacks; _i < unsubscribeCallbacks_1.length; _i++) {
                var unsubscribe = unsubscribeCallbacks_1[_i];
                unsubscribe();
            }
        };
    }, [store]);
};
