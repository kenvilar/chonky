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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridEntryDndIndicator = void 0;
var react_1 = __importStar(require("react"));
var icon_helper_1 = require("../../util/icon-helper");
var styles_1 = require("../../util/styles");
var FileEntry_hooks_1 = require("./FileEntry-hooks");
exports.GridEntryDndIndicator = react_1.default.memo(function (props) {
    var _a;
    var externalClassName = props.className, dndState = props.dndState;
    var dndIconName = (0, FileEntry_hooks_1.useDndIcon)(dndState);
    var classes = useStyles(dndState);
    var ChonkyIcon = (0, react_1.useContext)(icon_helper_1.ChonkyIconContext);
    if (!dndIconName)
        return null;
    var className = (0, styles_1.c)((_a = {},
        _a[classes.dndIndicator] = true,
        _a[externalClassName] = true,
        _a));
    return (react_1.default.createElement("div", { className: className },
        react_1.default.createElement(ChonkyIcon, { icon: dndIconName })));
});
var useStyles = (0, styles_1.makeLocalChonkyStyles)(function (theme) { return ({
    dndIndicator: {
        color: function (dndState) {
            return dndState.dndIsOver
                ? dndState.dndCanDrop
                    ? theme.dnd.canDropColor
                    : theme.dnd.cannotDropColor
                : '#000';
        },
        boxSizing: 'border-box',
        position: 'absolute',
        fontSize: '1.2em',
        opacity: 0.6,
        padding: 6,
        '&:before': {
            borderBottom: '50px solid transparent',
            borderLeft: '50px solid #fff',
            position: 'absolute',
            content: '""',
            zIndex: -1,
            left: 0,
            top: 0,
        },
    },
}); });
