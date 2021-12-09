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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = exports.important = exports.makeGlobalChonkyStyles = exports.makeLocalChonkyStyles = exports.getStripeGradient = exports.useIsMobileBreakpoint = exports.mobileThemeOverride = exports.darkThemeOverride = exports.lightTheme = void 0;
var useMediaQuery_1 = __importDefault(require("@material-ui/core/useMediaQuery"));
var classnames_1 = __importDefault(require("classnames"));
var react_jss_1 = require("react-jss");
exports.lightTheme = {
    colors: {
        debugRed: '#fabdbd',
        debugBlue: '#bdd8fa',
        debugGreen: '#d2fabd',
        debugPurple: '#d2bdfa',
        debugYellow: '#fae9bd',
        textActive: '#09f',
    },
    fontSizes: {
        rootPrimary: 15,
    },
    margins: {
        rootLayoutMargin: 8,
    },
    toolbar: {
        size: 30,
        lineHeight: '30px',
        fontSize: 15,
        buttonRadius: 4,
    },
    dnd: {
        canDropColor: 'green',
        cannotDropColor: 'red',
        canDropMask: 'rgba(180, 235, 180, 0.75)',
        cannotDropMask: 'rgba(235, 180, 180, 0.75)',
        fileListCanDropMaskOne: 'rgba(180, 235, 180, 0.1)',
        fileListCanDropMaskTwo: 'rgba(180, 235, 180, 0.2)',
        fileListCannotDropMaskOne: 'rgba(235, 180, 180, 0.1)',
        fileListCannotDropMaskTwo: 'rgba(235, 180, 180, 0.2)',
    },
    dragLayer: {
        border: 'solid 2px #09f',
        padding: '7px 10px',
        borderRadius: 2,
    },
    fileList: {
        desktopGridGutter: 8,
        mobileGridGutter: 5,
    },
    gridFileEntry: {
        childrenCountSize: '1.6em',
        iconColorFocused: '#000',
        iconSize: '2.4em',
        iconColor: '#fff',
        borderRadius: 5,
        fontSize: 14,
        fileColorTint: 'rgba(255, 255, 255, 0.4)',
        folderBackColorTint: 'rgba(255, 255, 255, 0.1)',
        folderFrontColorTint: 'rgba(255, 255, 255, 0.4)',
    },
    listFileEntry: {
        propertyFontSize: 14,
        iconFontSize: '1.1em',
        iconBorderRadius: 5,
        fontSize: 14,
    },
};
exports.darkThemeOverride = {
    gridFileEntry: {
        fileColorTint: 'rgba(50, 50, 50, 0.4)',
        folderBackColorTint: 'rgba(50, 50, 50, 0.4)',
        folderFrontColorTint: 'rgba(50, 50, 50, 0.15)',
    },
};
exports.mobileThemeOverride = {
    fontSizes: {
        rootPrimary: 13,
    },
    margins: {
        rootLayoutMargin: 4,
    },
    toolbar: {
        size: 28,
        lineHeight: '28px',
        fontSize: 13,
    },
    gridFileEntry: {
        fontSize: 13,
    },
    listFileEntry: {
        propertyFontSize: 12,
        iconFontSize: '1em',
        fontSize: 13,
    },
};
exports.useIsMobileBreakpoint = function () {
    return useMediaQuery_1.default('(max-width:480px)');
};
exports.getStripeGradient = function (colorOne, colorTwo) {
    return 'repeating-linear-gradient(' +
        '45deg,' +
        (colorOne + ",") +
        (colorOne + " 10px,") +
        (colorTwo + " 0,") +
        (colorTwo + " 20px") +
        ')';
};
exports.makeLocalChonkyStyles = function (styles) { return react_jss_1.createUseStyles(styles); };
exports.makeGlobalChonkyStyles = function (makeStyles) {
    var selectorMapping = {};
    var makeGlobalStyles = function (theme) {
        var localStyles = makeStyles(theme);
        var globalStyles = {};
        var localSelectors = Object.keys(localStyles);
        localSelectors.map(function (localSelector) {
            var globalSelector = "chonky-" + localSelector;
            var jssSelector = "@global ." + globalSelector;
            globalStyles[jssSelector] = localStyles[localSelector];
            selectorMapping[localSelector] = globalSelector;
        });
        return globalStyles;
    };
    var useStyles = react_jss_1.createUseStyles(makeGlobalStyles);
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var styles = useStyles.apply(void 0, args);
        var classes = {};
        Object.keys(selectorMapping).map(function (localSelector) {
            classes[localSelector] = selectorMapping[localSelector];
        });
        return __assign(__assign({}, classes), styles);
    };
};
exports.important = function (value) { return [value, '!important']; };
exports.c = classnames_1.default;
