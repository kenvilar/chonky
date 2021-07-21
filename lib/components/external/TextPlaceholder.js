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
exports.TextPlaceholder = void 0;
var react_1 = __importDefault(require("react"));
var styles_1 = require("../../util/styles");
var getRandomInt = function (min, max) {
    return min + Math.floor(Math.random() * Math.floor(max - min));
};
exports.TextPlaceholder = react_1.default.memo(function (props) {
    var minLength = props.minLength, maxLength = props.maxLength;
    var placeholderLength = getRandomInt(minLength, maxLength);
    var whitespace = '&nbsp;'.repeat(placeholderLength);
    var classes = useStyles();
    return (react_1.default.createElement("span", { className: classes.textPlaceholder, dangerouslySetInnerHTML: { __html: whitespace } }));
});
var useStyles = styles_1.makeLocalChonkyStyles(function (theme) { return ({
    '@keyframes loading-placeholder': {
        '0%': { opacity: 0.2 },
        '50%': { opacity: 0.4 },
        '100%': { opacity: 0.2 },
    },
    textPlaceholder: {
        animationName: '$loading-placeholder',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear',
        animationDuration: '1.5s',
        backgroundColor: '#ccc',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        borderRadius: 4,
        maxWidth: '40%',
        minWidth: 20,
    },
}); });
