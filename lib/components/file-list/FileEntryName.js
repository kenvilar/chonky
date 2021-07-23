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
exports.FileEntryName = void 0;
var react_1 = __importDefault(require("react"));
var styles_1 = require("../../util/styles");
var FileEntry_hooks_1 = require("./FileEntry-hooks");
exports.FileEntryName = react_1.default.memo(function (_a) {
    var file = _a.file, className = _a.className;
    var modifierIconComponents = FileEntry_hooks_1.useModifierIconComponents(file);
    var fileNameComponent = FileEntry_hooks_1.useFileNameComponent(file);
    var classes = useStyles();
    return (react_1.default.createElement("span", { className: className, "data-title": file ? file.name : undefined },
        modifierIconComponents.length > 0 && (react_1.default.createElement("span", { className: classes.modifierIcons }, modifierIconComponents)),
        fileNameComponent));
});
var useStyles = styles_1.makeLocalChonkyStyles(function (theme) { return ({
    modifierIcons: {
        color: theme.palette.text.hint,
        position: 'relative',
        fontSize: '0.775em',
        paddingRight: 5,
    },
}); });
