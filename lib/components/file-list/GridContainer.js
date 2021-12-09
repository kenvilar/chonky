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
exports.GridContainer = exports.getGridConfig = exports.isMobileDevice = void 0;
var react_1 = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var react_window_1 = require("react-window");
var selectors_1 = require("../../redux/selectors");
var hooks_helpers_1 = require("../../util/hooks-helpers");
var styles_1 = require("../../util/styles");
var FileEntry_1 = require("./FileEntry");
exports.isMobileDevice = function () {
    // noinspection JSDeprecatedSymbols
    return (typeof window.orientation !== 'undefined' ||
        navigator.userAgent.indexOf('IEMobile') !== -1);
};
exports.getGridConfig = function (width, fileCount, viewConfig, isMobileBreakpoint) {
    var gutter = isMobileBreakpoint ? 5 : 8;
    var scrollbar = exports.isMobileDevice() ? 0 : 18;
    var columnCount;
    var columnWidth;
    if (isMobileBreakpoint) {
        columnCount = 2;
        columnWidth = (width - gutter - scrollbar) / columnCount;
    }
    else {
        columnWidth = viewConfig.entryWidth;
        columnCount = Math.max(1, Math.floor((width - scrollbar) / (columnWidth + gutter)));
    }
    var rowCount = Math.ceil(fileCount / columnCount);
    return {
        rowCount: rowCount,
        columnCount: columnCount,
        gutter: gutter,
        rowHeight: viewConfig.entryHeight,
        columnWidth: columnWidth,
    };
};
exports.GridContainer = react_1.default.memo(function (props) {
    var width = props.width, height = props.height;
    var viewConfig = react_redux_1.useSelector(selectors_1.selectFileViewConfig);
    var displayFileIds = react_redux_1.useSelector(selectors_1.selectDisplayFileIds);
    var fileCount = react_1.useMemo(function () { return displayFileIds.length; }, [displayFileIds]);
    var gridRef = react_1.useRef();
    var isMobileBreakpoint = styles_1.useIsMobileBreakpoint();
    // Whenever the grid config changes at runtime, we call a method on the
    // `VariableSizeGrid` handle to reset column width/row height cache.
    // !!! Note that we deliberately update the `gridRef` firsts and update the React
    //     state AFTER that. This is needed to avoid file entries jumping up/down.
    var _a = react_1.useState(exports.getGridConfig(width, fileCount, viewConfig, isMobileBreakpoint)), gridConfig = _a[0], setGridConfig = _a[1];
    var gridConfigRef = react_1.useRef(gridConfig);
    react_1.useEffect(function () {
        var oldConf = gridConfigRef.current;
        var newConf = exports.getGridConfig(width, fileCount, viewConfig, isMobileBreakpoint);
        gridConfigRef.current = newConf;
        if (gridRef.current) {
            if (oldConf.rowCount !== newConf.rowCount) {
                gridRef.current.resetAfterRowIndex(Math.min(oldConf.rowCount, newConf.rowCount) - 1);
            }
            if (oldConf.columnCount !== newConf.columnCount) {
                gridRef.current.resetAfterColumnIndex(Math.min(oldConf.columnCount, newConf.rowCount) - 1);
            }
            if (oldConf.columnWidth !== newConf.columnWidth) {
                gridRef.current.resetAfterIndices({ columnIndex: 0, rowIndex: 0 });
            }
        }
        setGridConfig(newConf);
    }, [
        setGridConfig,
        gridConfigRef,
        isMobileBreakpoint,
        width,
        viewConfig,
        fileCount,
    ]);
    var sizers = react_1.useMemo(function () {
        var gc = gridConfigRef;
        return {
            getColumnWidth: function (index) {
                return gc.current.columnWidth +
                    (index === gc.current.columnCount - 1 ? 0 : gc.current.gutter);
            },
            getRowHeight: function (index) {
                return gc.current.rowHeight +
                    (index === gc.current.rowCount - 1 ? 0 : gc.current.gutter);
            },
        };
    }, [gridConfigRef]);
    var displayFileIdsRef = hooks_helpers_1.useInstanceVariable(react_redux_1.useSelector(selectors_1.selectDisplayFileIds));
    var getItemKey = react_1.useCallback(function (data) {
        var _a;
        var index = data.rowIndex * gridConfigRef.current.columnCount + data.columnIndex;
        return (_a = displayFileIdsRef.current[index]) !== null && _a !== void 0 ? _a : "loading-file-" + index;
    }, [gridConfigRef, displayFileIdsRef]);
    var cellRenderer = react_1.useCallback(function (data) {
        var gc = gridConfigRef;
        var index = data.rowIndex * gc.current.columnCount + data.columnIndex;
        var fileId = displayFileIds[index];
        if (displayFileIds[index] === undefined)
            return null;
        var styleWithGutter = __assign(__assign({}, data.style), { paddingRight: data.columnIndex === gc.current.columnCount - 1
                ? 0
                : gc.current.gutter, paddingBottom: data.rowIndex === gc.current.rowCount - 1 ? 0 : gc.current.gutter, boxSizing: 'border-box' });
        return (react_1.default.createElement("div", { style: styleWithGutter },
            react_1.default.createElement(FileEntry_1.SmartFileEntry, { fileId: fileId !== null && fileId !== void 0 ? fileId : null, displayIndex: index, fileViewMode: viewConfig.mode })));
    }, [displayFileIds, viewConfig.mode]);
    var classes = useStyles();
    var gridComponent = react_1.useMemo(function () {
        return (react_1.default.createElement(react_window_1.VariableSizeGrid, { ref: gridRef, className: classes.gridContainer, estimatedRowHeight: gridConfig.rowHeight + gridConfig.gutter, rowHeight: sizers.getRowHeight, estimatedColumnWidth: gridConfig.columnWidth + gridConfig.gutter, columnWidth: sizers.getColumnWidth, columnCount: gridConfig.columnCount, height: height, rowCount: gridConfig.rowCount, width: width, itemKey: getItemKey }, cellRenderer));
    }, [
        classes.gridContainer,
        gridConfig.rowHeight,
        gridConfig.gutter,
        gridConfig.columnWidth,
        gridConfig.columnCount,
        gridConfig.rowCount,
        sizers.getRowHeight,
        sizers.getColumnWidth,
        height,
        width,
        getItemKey,
        cellRenderer,
    ]);
    return gridComponent;
});
var useStyles = styles_1.makeGlobalChonkyStyles(function () { return ({
    gridContainer: {},
}); });
