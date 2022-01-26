"use strict";
/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolbarSearch = void 0;
var InputAdornment_1 = __importDefault(require("@material-ui/core/InputAdornment"));
var TextField_1 = __importDefault(require("@material-ui/core/TextField"));
var react_1 = __importStar(require("react"));
var react_intl_1 = require("react-intl");
var react_redux_1 = require("react-redux");
var reducers_1 = require("../../redux/reducers");
var selectors_1 = require("../../redux/selectors");
var files_thunks_1 = require("../../redux/thunks/files.thunks");
var icons_types_1 = require("../../types/icons.types");
var hooks_helpers_1 = require("../../util/hooks-helpers");
var i18n_1 = require("../../util/i18n");
var icon_helper_1 = require("../../util/icon-helper");
var styles_1 = require("../../util/styles");
exports.ToolbarSearch = react_1.default.memo(function () {
    var intl = (0, react_intl_1.useIntl)();
    var searchPlaceholderString = intl.formatMessage({
        id: (0, i18n_1.getI18nId)(i18n_1.I18nNamespace.Toolbar, 'searchPlaceholder'),
        defaultMessage: 'Search',
    });
    var classes = useStyles();
    var ChonkyIcon = (0, react_1.useContext)(icon_helper_1.ChonkyIconContext);
    var searchInputRef = (0, react_1.useRef)();
    var dispatch = (0, react_redux_1.useDispatch)();
    var reduxSearchString = (0, react_redux_1.useSelector)(selectors_1.selectSearchString);
    var _a = (0, react_1.useState)(reduxSearchString), localSearchString = _a[0], setLocalSearchString = _a[1];
    var debouncedLocalSearchString = (0, hooks_helpers_1.useDebounce)(localSearchString, 2000)[0];
    var _b = (0, react_1.useState)(false), showLoadingIndicator = _b[0], setShowLoadingIndicator = _b[1];
    (0, react_1.useEffect)(function () {
        dispatch(reducers_1.reduxActions.setFocusSearchInput(function () {
            if (searchInputRef.current)
                searchInputRef.current.focus();
        }));
        return function () {
            dispatch(reducers_1.reduxActions.setFocusSearchInput(null));
        };
    }, [dispatch]);
    (0, react_1.useEffect)(function () {
        setShowLoadingIndicator(false);
        dispatch((0, files_thunks_1.thunkUpdateSearchString)(debouncedLocalSearchString));
    }, [debouncedLocalSearchString, dispatch]);
    var handleChange = (0, react_1.useCallback)(function (event) {
        setShowLoadingIndicator(true);
        setLocalSearchString(event.currentTarget.value.trim());
        setTimeout(function () {
            var _a, _b;
            event.currentTarget.value = (_b = (_a = event.currentTarget) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.trim();
        }, 1000);
    }, []);
    var handleKeyUp = (0, react_1.useCallback)(function (event) {
        // Remove focus from the search input field when user presses escape.
        // Note: We use KeyUp instead of KeyPress because some browser plugins can
        //       intercept KeyPress events with Escape key.
        //       @see https://stackoverflow.com/a/37461974
        if (event.key === 'Escape') {
            setLocalSearchString('');
            dispatch((0, files_thunks_1.thunkUpdateSearchString)(''));
            if (searchInputRef.current)
                searchInputRef.current.blur();
        }
    }, [dispatch]);
    return (react_1.default.createElement(TextField_1.default, { className: classes.searchFieldContainer, size: "small", variant: "outlined", value: localSearchString.trim(), placeholder: searchPlaceholderString, onChange: handleChange, onBlur: function (e) {
            setTimeout(function () {
                var _a, _b;
                e.target.value = (_b = (_a = e.target) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.trim();
            });
        }, inputRef: searchInputRef, InputProps: {
            onKeyUp: handleKeyUp,
            startAdornment: (react_1.default.createElement(InputAdornment_1.default, { className: classes.searchIcon, position: "start" },
                react_1.default.createElement(ChonkyIcon, { icon: showLoadingIndicator
                        ? icons_types_1.ChonkyIconName.loading
                        : icons_types_1.ChonkyIconName.search, spin: showLoadingIndicator }))),
            className: classes.searchFieldInput,
        }, inputProps: { className: classes.searchFieldInputInner } }));
});
var useStyles = (0, styles_1.makeGlobalChonkyStyles)(function (theme) { return ({
    searchFieldContainer: {
        height: theme.toolbar.size,
        width: 150,
    },
    searchIcon: {
        fontSize: '0.9em',
        opacity: 0.75,
    },
    searchFieldInput: {
        lineHeight: (0, styles_1.important)(0),
        padding: (0, styles_1.important)(0),
        margin: (0, styles_1.important)(0),
        fontSize: (0, styles_1.important)(theme.toolbar.fontSize),
        borderRadius: theme.toolbar.buttonRadius,
        height: theme.toolbar.size - 4,
        paddingLeft: (0, styles_1.important)(8),
        marginTop: 2,
    },
    searchFieldInputInner: {
        lineHeight: (0, styles_1.important)("".concat(theme.toolbar.size - 4, "px")),
        fontSize: (0, styles_1.important)(theme.toolbar.fontSize),
        height: (0, styles_1.important)(theme.toolbar.size - 4),
        padding: (0, styles_1.important)([0, 8, 0, 0]),
        margin: (0, styles_1.important)(0),
        '-webkit-appearance': 'none',
    },
}); });
