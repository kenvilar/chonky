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
exports.ToolbarInfo = void 0;
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var react_1 = __importDefault(require("react"));
var react_intl_1 = require("react-intl");
var react_redux_1 = require("react-redux");
var selectors_1 = require("../../redux/selectors");
var i18n_1 = require("../../util/i18n");
var styles_1 = require("../../util/styles");
exports.ToolbarInfo = react_1.default.memo(function () {
    var classes = useStyles();
    var displayFileIds = react_redux_1.useSelector(selectors_1.selectDisplayFileIds);
    var selectionSize = react_redux_1.useSelector(selectors_1.selectSelectionSize);
    var hiddenCount = react_redux_1.useSelector(selectors_1.selectHiddenFileCount);
    var intl = react_intl_1.useIntl();
    var fileCountString = intl.formatMessage({
        id: i18n_1.getI18nId(i18n_1.I18nNamespace.Toolbar, 'visibleFileCount'),
        defaultMessage: "{fileCount, plural,\n                =0 {# items}\n                one {# item}\n                other {# items}\n            }",
    }, { fileCount: displayFileIds.length });
    var selectedString = intl.formatMessage({
        id: i18n_1.getI18nId(i18n_1.I18nNamespace.Toolbar, 'selectedFileCount'),
        defaultMessage: "{fileCount, plural,\n                =0 {}\n                other {# selected}\n            }",
    }, { fileCount: selectionSize });
    var hiddenString = intl.formatMessage({
        id: i18n_1.getI18nId(i18n_1.I18nNamespace.Toolbar, 'hiddenFileCount'),
        defaultMessage: "{fileCount, plural,\n                =0 {}\n                other {# hidden}\n            }",
    }, { fileCount: hiddenCount });
    return (react_1.default.createElement("div", { className: classes.infoContainer },
        react_1.default.createElement(Typography_1.default, { className: classes.infoText, variant: "body1" },
            fileCountString,
            (selectedString || hiddenString) && (react_1.default.createElement("span", { className: classes.extraInfoSpan },
                "(",
                react_1.default.createElement("span", { className: classes.selectionSizeText }, selectedString),
                selectedString && hiddenString && ', ',
                react_1.default.createElement("span", { className: classes.hiddenCountText }, hiddenString),
                ")")))));
});
var useStyles = styles_1.makeGlobalChonkyStyles(function (theme) { return ({
    infoContainer: {
        height: theme.toolbar.size,
        display: 'flex',
    },
    infoText: {
        lineHeight: styles_1.important(theme.toolbar.lineHeight),
        fontSize: styles_1.important(theme.toolbar.fontSize),
        marginLeft: styles_1.important(12),
        height: theme.toolbar.size,
    },
    extraInfoSpan: {
        marginRight: styles_1.important(8),
        marginLeft: styles_1.important(8),
        opacity: 0.8,
    },
    selectionSizeText: {
        color: theme.colors.textActive,
    },
    hiddenCountText: {},
}); });
