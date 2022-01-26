"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFileActionProps = exports.useFileActionTrigger = void 0;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var index_1 = require("../action-definitions/index");
var selectors_1 = require("../redux/selectors");
var store_1 = require("../redux/store");
var dispatchers_thunks_1 = require("../redux/thunks/dispatchers.thunks");
var icons_types_1 = require("../types/icons.types");
var sort_types_1 = require("../types/sort.types");
var file_helper_1 = require("./file-helper");
var useFileActionTrigger = function (fileActionId) {
    var dispatch = (0, react_redux_1.useDispatch)();
    var fileAction = (0, store_1.useParamSelector)(selectors_1.selectFileActionData, fileActionId);
    return (0, react_1.useCallback)(function () { return dispatch((0, dispatchers_thunks_1.thunkRequestFileAction)(fileAction, undefined)); }, [
        dispatch,
        fileAction,
    ]);
};
exports.useFileActionTrigger = useFileActionTrigger;
var useFileActionProps = function (fileActionId) {
    var _a;
    var parentFolder = (0, react_redux_1.useSelector)(selectors_1.selectParentFolder);
    var fileViewConfig = (0, react_redux_1.useSelector)(selectors_1.selectFileViewConfig);
    var sortActionId = (0, react_redux_1.useSelector)(selectors_1.selectSortActionId);
    var sortOrder = (0, react_redux_1.useSelector)(selectors_1.selectSortOrder);
    var action = (0, store_1.useParamSelector)(selectors_1.selectFileActionData, fileActionId);
    var optionValue = (0, store_1.useParamSelector)(selectors_1.selectOptionValue, (_a = action === null || action === void 0 ? void 0 : action.option) === null || _a === void 0 ? void 0 : _a.id);
    var actionSelectionSize = (0, store_1.useParamSelector)(selectors_1.selectSelectedFilesForActionCount, fileActionId);
    var actionSelectionEmpty = actionSelectionSize === 0;
    return (0, react_1.useMemo)(function () {
        var _a, _b;
        if (!action)
            return { icon: null, active: false, disabled: true };
        var icon = (_b = (_a = action.button) === null || _a === void 0 ? void 0 : _a.icon) !== null && _b !== void 0 ? _b : null;
        if (action.sortKeySelector) {
            if (sortActionId === action.id) {
                if (sortOrder === sort_types_1.SortOrder.ASC) {
                    icon = icons_types_1.ChonkyIconName.sortAsc;
                }
                else {
                    icon = icons_types_1.ChonkyIconName.sortDesc;
                }
            }
            else {
                icon = icons_types_1.ChonkyIconName.placeholder;
            }
        }
        else if (action.option) {
            if (optionValue) {
                icon = icons_types_1.ChonkyIconName.toggleOn;
            }
            else {
                icon = icons_types_1.ChonkyIconName.toggleOff;
            }
        }
        var isSortButtonAndCurrentSort = action.id === sortActionId;
        var isFileViewButtonAndCurrentView = action.fileViewConfig === fileViewConfig;
        var isOptionAndEnabled = action.option ? !!optionValue : false;
        var active = isSortButtonAndCurrentSort ||
            isFileViewButtonAndCurrentView ||
            isOptionAndEnabled;
        var disabled = !!action.requiresSelection && actionSelectionEmpty;
        if (action.id === index_1.ChonkyActions.OpenParentFolder.id) {
            // We treat `open_parent_folder` file action as a special case as it
            // requires the parent folder to be present to work...
            disabled = disabled || !file_helper_1.FileHelper.isOpenable(parentFolder);
        }
        return { icon: icon, active: active, disabled: disabled };
    }, [
        parentFolder,
        fileViewConfig,
        sortActionId,
        sortOrder,
        action,
        optionValue,
        actionSelectionEmpty,
    ]);
};
exports.useFileActionProps = useFileActionProps;
