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
var Button_1 = __importDefault(require("@material-ui/core/Button"));
var InputAdornment_1 = __importDefault(require("@material-ui/core/InputAdornment"));
var TextField_1 = __importDefault(require("@material-ui/core/TextField"));
var react_1 = __importStar(require("react"));
var react_intl_1 = require("react-intl");
var react_redux_1 = require("react-redux");
// import { selectSearchString } from '../../redux/selectors';
var files_thunks_1 = require("../../redux/thunks/files.thunks");
var icons_types_1 = require("../../types/icons.types");
var i18n_1 = require("../../util/i18n");
var icon_helper_1 = require("../../util/icon-helper");
var styles_1 = require("../../util/styles");
exports.ToolbarSearch = react_1.default.memo(function () {
    var _a;
    var intl = react_intl_1.useIntl();
    var searchPlaceholderString = intl.formatMessage({
        id: i18n_1.getI18nId(i18n_1.I18nNamespace.Toolbar, 'searchPlaceholder'),
        defaultMessage: 'Search',
    });
    var classes = useStyles();
    var ChonkyIcon = react_1.useContext(icon_helper_1.ChonkyIconContext);
    var searchInputRef = react_1.useRef();
    var dispatch = react_redux_1.useDispatch();
    // const reduxSearchString = useSelector(selectSearchString);
    var _b = react_1.useState(''), localSearchString = _b[0], setLocalSearchString = _b[1];
    // const [debouncedLocalSearchString] = useDebounce(localSearchString, 2000);
    var _c = react_1.useState(true), searchDisabled = _c[0], setSearchDisabled = _c[1];
    var _d = react_1.useState(false), showLoadingIndicator = _d[0], setShowLoadingIndicator = _d[1];
    // useEffect(() => {
    //     dispatch(
    //         reduxActions.setFocusSearchInput(() => {
    //             if (searchInputRef.current) searchInputRef.current.focus();
    //         })
    //     );
    //     return () => {
    //         dispatch(reduxActions.setFocusSearchInput(null));
    //     };
    // }, [dispatch]);
    // useEffect(() => {
    //     setShowLoadingIndicator(false);
    //     dispatch(thunkUpdateSearchString(debouncedLocalSearchString));
    // }, [debouncedLocalSearchString, dispatch]);
    var handleChange = react_1.useCallback(function (event) {
        // setShowLoadingIndicator(true);
        if (event.currentTarget.value.trim()) {
            setSearchDisabled(false);
        }
        setLocalSearchString(event.currentTarget.value.trim());
        // setTimeout(() => {
        //     event.currentTarget.value = event.currentTarget?.value?.trim();
        // }, 1000);
    }, []);
    var handleKeyUp = react_1.useCallback(function (event) {
        // Remove focus from the search input field when user presses escape.
        // Note: We use KeyUp instead of KeyPress because some browser plugins can
        //       intercept KeyPress events with Escape key.
        //       @see https://stackoverflow.com/a/37461974
        if (event.key === 'Escape') {
            // setSearchDisabled(true);
            setLocalSearchString('');
            // dispatch(thunkUpdateSearchString(''));
            // if (searchInputRef.current) searchInputRef.current.blur();
        }
    }, []);
    var handleOnClick = function () {
        setShowLoadingIndicator(true);
        setSearchDisabled(true);
        setTimeout(function () {
            dispatch(files_thunks_1.thunkUpdateSearchString(localSearchString));
            setShowLoadingIndicator(false);
            setSearchDisabled(false);
        }, 1000);
    };
    var className = styles_1.c((_a = {},
        _a[classes.baseButton] = true,
        _a[classes.activeButton] = !searchDisabled,
        _a));
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(TextField_1.default, { className: classes.searchFieldContainer, size: "small", variant: "outlined", value: localSearchString.trim(), placeholder: searchPlaceholderString, onChange: handleChange, onBlur: function (e) {
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
            }, inputProps: { className: classes.searchFieldInputInner } }),
        react_1.default.createElement(Button_1.default, { className: className, title: 'Submit', disabled: searchDisabled || !handleOnClick },
            react_1.default.createElement("span", null, "Submit"))));
});
var useStyles = styles_1.makeGlobalChonkyStyles(function (theme) { return ({
    searchFieldContainer: {
        height: theme.toolbar.size,
        width: 150,
    },
    searchIcon: {
        fontSize: '0.9em',
        opacity: 0.75,
    },
    searchFieldInput: {
        lineHeight: styles_1.important(0),
        padding: styles_1.important(0),
        margin: styles_1.important(0),
        fontSize: styles_1.important(theme.toolbar.fontSize),
        borderRadius: theme.toolbar.buttonRadius,
        height: theme.toolbar.size - 4,
        paddingLeft: styles_1.important(8),
        marginTop: 2,
    },
    searchFieldInputInner: {
        lineHeight: styles_1.important(theme.toolbar.size - 4 + "px"),
        fontSize: styles_1.important(theme.toolbar.fontSize),
        height: styles_1.important(theme.toolbar.size - 4),
        padding: styles_1.important([0, 8, 0, 0]),
        margin: styles_1.important(0),
        '-webkit-appearance': 'none',
    },
    baseButton: {
        marginTop: 2,
        fontSize: styles_1.important(theme.toolbar.fontSize),
        textTransform: styles_1.important('none'),
        letterSpacing: styles_1.important(0),
        minWidth: styles_1.important('auto'),
        lineHeight: styles_1.important(theme.toolbar.size - 4 + "px"),
        height: styles_1.important(40),
        paddingBottom: styles_1.important(0),
        paddingTop: styles_1.important(0),
    },
    iconWithText: {
        marginRight: 8,
    },
    iconOnlyButton: {
        width: theme.toolbar.size,
        textAlign: 'center',
    },
    iconDropdown: {
        fontSize: '0.7em',
        marginLeft: 2,
        marginTop: 1,
    },
    activeButton: {
        color: styles_1.important(theme.colors.textActive),
    },
}); });
