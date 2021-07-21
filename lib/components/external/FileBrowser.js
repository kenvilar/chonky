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
exports.FileBrowser = void 0;
var styles_1 = require("@material-ui/core/styles");
var deepmerge_1 = __importDefault(require("deepmerge"));
var react_1 = __importStar(require("react"));
var react_dnd_1 = require("react-dnd");
var react_dnd_html5_backend_1 = require("react-dnd-html5-backend");
var react_intl_1 = require("react-intl");
var react_jss_1 = require("react-jss");
var react_redux_1 = require("react-redux");
var shortid_1 = __importDefault(require("shortid"));
var store_1 = require("../../redux/store");
var default_config_1 = require("../../util/default-config");
var helpers_1 = require("../../util/helpers");
var hooks_helpers_1 = require("../../util/hooks-helpers");
var i18n_1 = require("../../util/i18n");
var icon_helper_1 = require("../../util/icon-helper");
var styles_2 = require("../../util/styles");
var ChonkyBusinessLogic_1 = require("../internal/ChonkyBusinessLogic");
var ChonkyIconPlaceholder_1 = require("../internal/ChonkyIconPlaceholder");
var ChonkyPresentationLayer_1 = require("../internal/ChonkyPresentationLayer");
// if (process.env.NODE_ENV === 'development') {
//     const whyDidYouRender = require('@welldone-software/why-did-you-render');
//     whyDidYouRender(React, {
//         trackAllPureComponents: true,
//     });
// }
exports.FileBrowser = react_1.default.forwardRef(function (props, ref) {
    var _a;
    var instanceId = props.instanceId, iconComponent = props.iconComponent, children = props.children;
    var disableDragAndDrop = helpers_1.getValueOrFallback(props.disableDragAndDrop, default_config_1.defaultConfig.disableDragAndDrop, 'boolean');
    var disableDragAndDropProvider = helpers_1.getValueOrFallback(props.disableDragAndDropProvider, default_config_1.defaultConfig.disableDragAndDropProvider, 'boolean');
    var darkMode = helpers_1.getValueOrFallback(props.darkMode, default_config_1.defaultConfig.darkMode, 'boolean');
    var i18n = helpers_1.getValueOrFallback(props.i18n, default_config_1.defaultConfig.i18n);
    var formatters = react_1.useMemo(function () { return (__assign(__assign({}, i18n_1.defaultFormatters), i18n === null || i18n === void 0 ? void 0 : i18n.formatters)); }, [
        i18n,
    ]);
    var chonkyInstanceId = hooks_helpers_1.useStaticValue(function () { return instanceId !== null && instanceId !== void 0 ? instanceId : shortid_1.default.generate(); });
    var store = store_1.useChonkyStore(chonkyInstanceId);
    var isMobileBreakpoint = styles_2.useIsMobileBreakpoint();
    var theme = react_1.useMemo(function () {
        var muiTheme = styles_1.createMuiTheme({
            palette: { type: darkMode ? 'dark' : 'light' },
        });
        var combinedTheme = deepmerge_1.default(muiTheme, deepmerge_1.default(styles_2.lightTheme, darkMode ? styles_2.darkThemeOverride : {}));
        return isMobileBreakpoint
            ? deepmerge_1.default(combinedTheme, styles_2.mobileThemeOverride)
            : combinedTheme;
    }, [darkMode, isMobileBreakpoint]);
    var chonkyComps = (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(ChonkyBusinessLogic_1.ChonkyBusinessLogic, __assign({ ref: ref }, props)),
        react_1.default.createElement(ChonkyPresentationLayer_1.ChonkyPresentationLayer, null, children)));
    return (react_1.default.createElement(react_intl_1.IntlProvider, __assign({ locale: "en", defaultLocale: "en" }, i18n),
        react_1.default.createElement(i18n_1.ChonkyFormattersContext.Provider, { value: formatters },
            react_1.default.createElement(react_redux_1.Provider, { store: store },
                react_1.default.createElement(react_jss_1.ThemeProvider, { theme: theme },
                    react_1.default.createElement(styles_1.ThemeProvider, { theme: theme },
                        react_1.default.createElement(icon_helper_1.ChonkyIconContext.Provider, { value: (_a = iconComponent !== null && iconComponent !== void 0 ? iconComponent : default_config_1.defaultConfig.iconComponent) !== null && _a !== void 0 ? _a : ChonkyIconPlaceholder_1.ChonkyIconPlaceholder }, disableDragAndDrop || disableDragAndDropProvider ? (chonkyComps) : (react_1.default.createElement(react_dnd_1.DndProvider, { backend: react_dnd_html5_backend_1.HTML5Backend }, chonkyComps)))))))));
});
exports.FileBrowser.displayName = 'FileBrowser';
