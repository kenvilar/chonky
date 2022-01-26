"use strict";
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
exports.FileToolbar = void 0;
var react_1 = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var selectors_1 = require("../../redux/selectors");
var styles_1 = require("../../util/styles");
var ToolbarButton_1 = require("./ToolbarButton");
var ToolbarDropdown_1 = require("./ToolbarDropdown");
var ToolbarInfo_1 = require("./ToolbarInfo");
var ToolbarSearch_1 = require("./ToolbarSearch");
exports.FileToolbar = react_1.default.memo(function () {
    var classes = useStyles();
    var toolbarItems = (0, react_redux_1.useSelector)(selectors_1.selectToolbarItems);
    var toolbarItemComponents = (0, react_1.useMemo)(function () {
        var components = [];
        for (var i = 0; i < toolbarItems.length; ++i) {
            var item = toolbarItems[i];
            var key = "toolbar-item-".concat(typeof item === 'string' ? item : item.name);
            var component = typeof item === 'string' ? (react_1.default.createElement(ToolbarButton_1.SmartToolbarButton, { key: key, fileActionId: item })) : (react_1.default.createElement(ToolbarDropdown_1.ToolbarDropdown, { key: key, name: item.name, fileActionIds: item.fileActionIds }));
            components.push(component);
        }
        return components;
    }, [toolbarItems]);
    return (react_1.default.createElement("div", { className: classes.toolbarWrapper },
        react_1.default.createElement("div", { className: classes.toolbarContainer },
            react_1.default.createElement("div", { className: classes.toolbarLeft },
                react_1.default.createElement(ToolbarSearch_1.ToolbarSearch, null),
                react_1.default.createElement(ToolbarInfo_1.ToolbarInfo, null)),
            react_1.default.createElement("div", { className: classes.toolbarRight }, toolbarItemComponents))));
});
var useStyles = (0, styles_1.makeGlobalChonkyStyles)(function (theme) { return ({
    toolbarWrapper: {},
    toolbarContainer: {
        flexWrap: 'wrap-reverse',
        display: 'flex',
    },
    toolbarLeft: {
        paddingBottom: theme.margins.rootLayoutMargin,
        flexWrap: 'nowrap',
        flexGrow: 10000,
        display: 'flex',
    },
    toolbarLeftFiller: {
        flexGrow: 10000,
    },
    toolbarRight: {
        paddingBottom: theme.margins.rootLayoutMargin,
        flexWrap: 'nowrap',
        display: 'flex',
    },
}); });
