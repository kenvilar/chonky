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
exports.FileThumbnail = void 0;
var classnames_1 = __importDefault(require("classnames"));
var react_1 = __importDefault(require("react"));
var styles_1 = require("../../util/styles");
exports.FileThumbnail = react_1.default.memo(function (props) {
    var className = props.className, thumbnailUrl = props.thumbnailUrl;
    var thumbnailStyle = thumbnailUrl
        ? { backgroundImage: "url('" + thumbnailUrl + "')" }
        : {};
    var classes = useStyles();
    return (react_1.default.createElement("div", { className: classnames_1.default([className, classes.fileThumbnail]), style: thumbnailStyle }));
});
var useStyles = styles_1.makeGlobalChonkyStyles(function (theme) { return ({
    fileThumbnail: {
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
    },
}); });
