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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileList = void 0;
var react_1 = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var react_virtualized_auto_sizer_1 = __importDefault(require("react-virtualized-auto-sizer"));
var index_1 = require("../../action-definitions/index");
var selectors_1 = require("../../redux/selectors");
var file_view_types_1 = require("../../types/file-view.types");
var icons_types_1 = require("../../types/icons.types");
var dnd_1 = require("../../util/dnd");
var icon_helper_1 = require("../../util/icon-helper");
var styles_1 = require("../../util/styles");
var FileListEmpty_1 = require("./FileListEmpty");
var GridContainer_1 = require("./GridContainer");
var ListContainer_1 = require("./ListContainer");
exports.FileList = react_1.default.memo(function () {
    var displayFileIds = (0, react_redux_1.useSelector)(selectors_1.selectDisplayFileIds);
    var viewConfig = (0, react_redux_1.useSelector)(selectors_1.selectFileViewConfig);
    var currentFolder = (0, react_redux_1.useSelector)(selectors_1.selectCurrentFolder);
    var _a = (0, dnd_1.useFileDrop)({ file: currentFolder }), drop = _a.drop, dndCanDrop = _a.dndCanDrop, dndIsOverCurrent = _a.dndIsOverCurrent;
    var styleState = (0, react_1.useMemo)(function () { return ({ dndCanDrop: dndCanDrop, dndIsOverCurrent: dndIsOverCurrent }); }, [
        dndCanDrop,
        dndIsOverCurrent,
    ]);
    var localClasses = useLocalStyles(styleState);
    var classes = useStyles(viewConfig);
    // In Chonky v0.x, this field was user-configurable. In Chonky v1.x+, we hardcode
    // this to `true` to simplify configuration. Users can just wrap Chonky in their
    // own `div` if they want to have finer control over the height.
    var fillParentContainer = true;
    var listRenderer = (0, react_1.useCallback)(function (_a) {
        var width = _a.width, height = _a.height;
        if (displayFileIds.length === 0) {
            return react_1.default.createElement(FileListEmpty_1.FileListEmpty, { width: width, height: viewConfig.entryHeight });
        }
        else if (viewConfig.mode === file_view_types_1.FileViewMode.List) {
            return react_1.default.createElement(ListContainer_1.ListContainer, { width: width, height: height });
        }
        else {
            return react_1.default.createElement(GridContainer_1.GridContainer, { width: width, height: height });
        }
    }, [displayFileIds, viewConfig]);
    var ChonkyIcon = (0, react_1.useContext)(icon_helper_1.ChonkyIconContext);
    return (react_1.default.createElement("div", { ref: drop, className: (0, styles_1.c)([classes.fileListWrapper, localClasses.fileListWrapper]), role: "list" },
        react_1.default.createElement("div", { className: localClasses.dndDropZone },
            react_1.default.createElement("div", { className: localClasses.dndDropZoneIcon },
                react_1.default.createElement(ChonkyIcon, { icon: dndCanDrop
                        ? icons_types_1.ChonkyIconName.dndCanDrop
                        : icons_types_1.ChonkyIconName.dndCannotDrop }))),
        react_1.default.createElement(react_virtualized_auto_sizer_1.default, { disableHeight: !fillParentContainer }, listRenderer)));
});
var useLocalStyles = (0, styles_1.makeLocalChonkyStyles)(function (theme) { return ({
    fileListWrapper: {
        minHeight: index_1.ChonkyActions.EnableGridView.fileViewConfig.entryHeight + 2,
        background: function (state) {
            return state.dndIsOverCurrent && state.dndCanDrop
                ? state.dndCanDrop
                    ? (0, styles_1.getStripeGradient)(theme.dnd.fileListCanDropMaskOne, theme.dnd.fileListCanDropMaskTwo)
                    : (0, styles_1.getStripeGradient)(theme.dnd.fileListCannotDropMaskOne, theme.dnd.fileListCannotDropMaskTwo)
                : 'none';
        },
    },
    dndDropZone: {
        display: function (state) {
            // When we cannot drop, we don't show an indicator at all
            return state.dndIsOverCurrent && state.dndCanDrop ? 'block' : 'none';
        },
        borderRadius: theme.gridFileEntry.borderRadius,
        pointerEvents: 'none',
        position: 'absolute',
        height: '100%',
        width: '100%',
        zIndex: 2,
    },
    dndDropZoneIcon: {
        backgroundColor: function (state) {
            return state.dndCanDrop ? theme.dnd.canDropMask : theme.dnd.cannotDropMask;
        },
        color: function (state) {
            return state.dndCanDrop ? theme.dnd.canDropColor : theme.dnd.cannotDropColor;
        },
        borderRadius: theme.gridFileEntry.borderRadius,
        transform: 'translateX(-50%) translateY(-50%)',
        position: 'absolute',
        textAlign: 'center',
        lineHeight: '60px',
        fontSize: '2em',
        left: '50%',
        height: 60,
        top: '50%',
        width: 60,
    },
}); });
var useStyles = (0, styles_1.makeGlobalChonkyStyles)(function () { return ({
    fileListWrapper: {
        height: '100%',
        maxHeight: '100%',
    },
}); });
