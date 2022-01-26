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
exports.ListContainer = void 0;
var react_1 = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var react_window_1 = require("react-window");
var selectors_1 = require("../../redux/selectors");
var file_view_types_1 = require("../../types/file-view.types");
var hooks_helpers_1 = require("../../util/hooks-helpers");
var styles_1 = require("../../util/styles");
var FileEntry_1 = require("./FileEntry");
exports.ListContainer = react_1.default.memo(function (props) {
    var width = props.width, height = props.height;
    var viewConfig = (0, react_redux_1.useSelector)(selectors_1.selectFileViewConfig);
    var displayFileIds = (0, react_redux_1.useSelector)(selectors_1.selectDisplayFileIds);
    var listRef = (0, react_1.useRef)();
    var displayFileIdsRef = (0, hooks_helpers_1.useInstanceVariable)((0, react_redux_1.useSelector)(selectors_1.selectDisplayFileIds));
    var getItemKey = (0, react_1.useCallback)(function (index) { var _a; return (_a = displayFileIdsRef.current[index]) !== null && _a !== void 0 ? _a : "loading-file-".concat(index); }, [displayFileIdsRef]);
    var classes = useStyles();
    var listComponent = (0, react_1.useMemo)(function () {
        // When entry size is null, we use List view
        var rowRenderer = function (data) {
            var _a;
            return (react_1.default.createElement("div", { style: data.style },
                react_1.default.createElement(FileEntry_1.SmartFileEntry, { fileId: (_a = displayFileIds[data.index]) !== null && _a !== void 0 ? _a : null, displayIndex: data.index, fileViewMode: file_view_types_1.FileViewMode.List })));
        };
        return (react_1.default.createElement(react_window_1.FixedSizeList, { ref: listRef, className: classes.listContainer, itemSize: viewConfig.entryHeight, height: height, itemCount: displayFileIds.length, width: width, itemKey: getItemKey }, rowRenderer));
    }, [
        classes.listContainer,
        viewConfig.entryHeight,
        height,
        displayFileIds,
        width,
        getItemKey,
    ]);
    return listComponent;
});
var useStyles = (0, styles_1.makeLocalChonkyStyles)(function (theme) { return ({
    listContainer: {
        borderTop: "solid 1px ".concat(theme.palette.divider),
    },
}); });
