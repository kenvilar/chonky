"use strict";
/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */
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
exports.FullFileBrowser = void 0;
var react_1 = __importDefault(require("react"));
var FileList_1 = require("../file-list/FileList");
var FileBrowser_1 = require("./FileBrowser");
var FileContextMenu_1 = require("./FileContextMenu");
var FileNavbar_1 = require("./FileNavbar");
var FileToolbar_1 = require("./FileToolbar");
exports.FullFileBrowser = react_1.default.memo(react_1.default.forwardRef(function (props, ref) {
    return (react_1.default.createElement(FileBrowser_1.FileBrowser, __assign({ ref: ref }, props),
        react_1.default.createElement(FileNavbar_1.FileNavbar, null),
        react_1.default.createElement(FileToolbar_1.FileToolbar, null),
        react_1.default.createElement(FileList_1.FileList, null),
        react_1.default.createElement(FileContextMenu_1.FileContextMenu, null)));
}));
exports.FullFileBrowser.displayName = 'FullFileBrowser';
