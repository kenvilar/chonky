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
exports.ChonkyIconPlaceholder = void 0;
var react_1 = __importDefault(require("react"));
var ChonkyIconPlaceholder = function () {
    // This component should not be rendered unless the user has misconfigured Chonky
    var title = 'No icon component found. Please follow Chonky installation instructions to ' +
        'provide a pre-made icon component (or a custom icon).';
    return react_1.default.createElement("span", { title: title }, "\u26A0\uFE0F");
};
exports.ChonkyIconPlaceholder = ChonkyIconPlaceholder;
