"use strict";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDndHoverOpen = exports.useFileEntryDnD = exports.useFileDrop = exports.useFileDrag = void 0;
var react_1 = require("react");
var react_dnd_html5_backend_1 = require("react-dnd-html5-backend");
var react_redux_1 = require("react-redux");
var essential_1 = require("../action-definitions/essential");
var index_1 = require("../action-definitions/index");
var selectors_1 = require("../redux/selectors");
var dispatchers_thunks_1 = require("../redux/thunks/dispatchers.thunks");
var dnd_types_1 = require("../types/dnd.types");
var dnd_fallback_1 = require("./dnd-fallback");
var file_helper_1 = require("./file-helper");
var hooks_helpers_1 = require("./hooks-helpers");
var useFileDrag = function (file) {
    // Prepare the dnd payload
    var store = react_redux_1.useStore();
    var fileRef = hooks_helpers_1.useInstanceVariable(file);
    var getDndStartPayload = react_1.useCallback(function () {
        var reduxState = store.getState();
        return {
            sourceInstanceId: selectors_1.selectInstanceId(reduxState),
            source: selectors_1.selectCurrentFolder(reduxState),
            // We force non-null type below because by convention, if drag & drop for
            // this file was possible, it must have been non-null.
            draggedFile: fileRef.current,
            selectedFiles: selectors_1.selectSelectedFiles(reduxState),
        };
    }, [store, fileRef]);
    // For drag source
    var dispatch = react_redux_1.useDispatch();
    var canDrag = react_1.useCallback(function () { return file_helper_1.FileHelper.isDraggable(fileRef.current); }, [
        fileRef,
    ]);
    var onDragStart = react_1.useCallback(function () {
        var item = {
            type: dnd_types_1.ChonkyDndFileEntryType,
            payload: getDndStartPayload(),
        };
        dispatch(dispatchers_thunks_1.thunkRequestFileAction(index_1.ChonkyActions.StartDragNDrop, item.payload));
        return item;
    }, [dispatch, getDndStartPayload]);
    var onDragEnd = react_1.useCallback(function (item, monitor) {
        var dropResult = monitor.getDropResult();
        if (!file_helper_1.FileHelper.isDraggable(item.payload.draggedFile) ||
            !dropResult ||
            !dropResult.dropTarget) {
            return;
        }
        dispatch(dispatchers_thunks_1.thunkRequestFileAction(index_1.ChonkyActions.EndDragNDrop, __assign(__assign({}, item.payload), { destination: dropResult.dropTarget, copy: dropResult.dropEffect === 'copy' })));
    }, [dispatch]);
    // Create refs for react-dnd hooks
    var item = react_1.useMemo(function () { return ({
        type: dnd_types_1.ChonkyDndFileEntryType,
        // Payload is actually added in `onDragStart`
        payload: {},
    }); }, []);
    var collect = react_1.useCallback(function (monitor) { return ({ isDragging: monitor.isDragging() }); }, []);
    var _a = dnd_fallback_1.useDragIfAvailable({
        item: item,
        canDrag: canDrag,
        begin: onDragStart,
        end: onDragEnd,
        collect: collect,
    }), dndIsDragging = _a[0].isDragging, drag = _a[1], preview = _a[2];
    react_1.useEffect(function () {
        // Set drag preview to an empty image because `DnDFileListDragLayer` will
        // provide its own preview.
        preview(react_dnd_html5_backend_1.getEmptyImage(), { captureDraggingState: true });
    }, [preview]);
    return { dndIsDragging: dndIsDragging, drag: drag };
};
exports.useFileDrag = useFileDrag;
var useFileDrop = function (_a) {
    var file = _a.file, forceDisableDrop = _a.forceDisableDrop, includeChildrenDrops = _a.includeChildrenDrops;
    var folderChainRef = hooks_helpers_1.useInstanceVariable(react_redux_1.useSelector(selectors_1.selectFolderChain));
    var onDrop = react_1.useCallback(function (item, monitor) {
        if (!monitor.canDrop())
            return;
        var customDropResult = {
            dropTarget: file,
        };
        return customDropResult;
    }, [file]);
    var canDrop = react_1.useCallback(function (item, monitor) {
        if (forceDisableDrop ||
            !file_helper_1.FileHelper.isDroppable(file) ||
            (!monitor.isOver({ shallow: true }) && !includeChildrenDrops)) {
            return false;
        }
        var _a = item.payload, source = _a.source, draggedFile = _a.draggedFile, selectedFiles = _a.selectedFiles;
        // We prevent folders from being dropped into themselves. We also prevent
        // any folder from current folder chain being moved - we can't move the
        // folder that we are currently in.
        var prohibitedFileIds = new Set();
        prohibitedFileIds.add(file.id);
        folderChainRef.current.map(function (folder) {
            if (folder)
                prohibitedFileIds.add(folder.id);
        });
        var movedFiles = __spreadArray([draggedFile], selectedFiles);
        for (var _i = 0, movedFiles_1 = movedFiles; _i < movedFiles_1.length; _i++) {
            var currFile = movedFiles_1[_i];
            if (prohibitedFileIds.has(currFile.id))
                return false;
        }
        // Finally, prohibit files from being moved into their parent folder
        // (which is a no-op).
        return file.id !== (source === null || source === void 0 ? void 0 : source.id);
    }, [forceDisableDrop, file, includeChildrenDrops, folderChainRef]);
    var collect = react_1.useCallback(function (monitor) { return ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
    }); }, []);
    var _b = dnd_fallback_1.useDropIfAvailable({
        accept: dnd_types_1.ChonkyDndFileEntryType,
        drop: onDrop,
        canDrop: canDrop,
        collect: collect,
    }), _c = _b[0], dndIsOver = _c.isOver, dndIsOverCurrent = _c.isOverCurrent, dndCanDrop = _c.canDrop, drop = _b[1];
    return { dndIsOver: dndIsOver, dndIsOverCurrent: dndIsOverCurrent, dndCanDrop: dndCanDrop, drop: drop };
};
exports.useFileDrop = useFileDrop;
var useFileEntryDnD = function (file) {
    var _a = exports.useFileDrag(file), dndIsDragging = _a.dndIsDragging, drag = _a.drag;
    var _b = exports.useFileDrop({ file: file }), dndIsOver = _b.dndIsOver, dndCanDrop = _b.dndCanDrop, drop = _b.drop;
    var dndState = react_1.useMemo(function () { return ({
        dndIsDragging: dndIsDragging,
        dndIsOver: dndIsOver,
        dndCanDrop: dndCanDrop,
    }); }, [dndCanDrop, dndIsDragging, dndIsOver]);
    return {
        drop: drop,
        drag: drag,
        dndState: dndState,
    };
};
exports.useFileEntryDnD = useFileEntryDnD;
var useDndHoverOpen = function (file, dndState) {
    var dispatch = react_redux_1.useDispatch();
    var currentFolderRef = hooks_helpers_1.useInstanceVariable(react_redux_1.useSelector(selectors_1.selectCurrentFolder));
    react_1.useEffect(function () {
        var _a;
        var timeout = null;
        if (dndState.dndIsOver &&
            file_helper_1.FileHelper.isDndOpenable(file) &&
            file.id !== ((_a = currentFolderRef.current) === null || _a === void 0 ? void 0 : _a.id)) {
            timeout = setTimeout(function () {
                return dispatch(dispatchers_thunks_1.thunkRequestFileAction(essential_1.EssentialActions.OpenFiles, {
                    targetFile: file,
                    files: [file],
                }));
            }, 
            // TODO: Make this timeout configurable
            750 // 'kv-custom-chonky' 1500
            );
        }
        return function () {
            if (timeout)
                clearTimeout(timeout);
        };
    }, [dispatch, file, dndState.dndIsOver, currentFolderRef]);
};
exports.useDndHoverOpen = useDndHoverOpen;
