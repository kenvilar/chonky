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
exports.FileListEmpty = void 0;
var react_1 = __importStar(require("react"));
var react_intl_1 = require("react-intl");
var icons_types_1 = require("../../types/icons.types");
var i18n_1 = require("../../util/i18n");
var icon_helper_1 = require("../../util/icon-helper");
var styles_1 = require("../../util/styles");
exports.FileListEmpty = function (props) {
    var width = props.width, height = props.height;
    var classes = useStyles();
    var ChonkyIcon = react_1.useContext(icon_helper_1.ChonkyIconContext);
    var style = {
        width: width,
        height: height,
    };
    var intl = react_intl_1.useIntl();
    var emptyString = intl.formatMessage({
        id: i18n_1.getI18nId(i18n_1.I18nNamespace.FileList, 'nothingToShow'),
        defaultMessage: 'Nothing to show',
    });
    return (react_1.default.createElement("div", { className: classes.fileListEmpty, style: style },
        react_1.default.createElement("div", { className: classes.fileListEmptyContent },
            react_1.default.createElement(ChonkyIcon, { icon: icons_types_1.ChonkyIconName.folderOpen }),
            "\u00A0 ",
            emptyString)));
};
var useStyles = styles_1.makeGlobalChonkyStyles(function (theme) { return ({
    fileListEmpty: {
        color: theme.palette.text.disabled,
        position: 'relative',
        textAlign: 'center',
        fontSize: '1.2em',
    },
    fileListEmptyContent: {
        transform: 'translateX(-50%) translateY(-50%)',
        position: 'absolute',
        left: '50%',
        top: '50%',
    },
}); });
