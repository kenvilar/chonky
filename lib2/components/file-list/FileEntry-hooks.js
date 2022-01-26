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
exports.useFileClickHandlers = exports.useThumbnailUrl = exports.useFileNameComponent = exports.useModifierIconComponents = exports.useDndIcon = exports.useFileEntryState = exports.useFileEntryHtmlProps = void 0;
var path_1 = __importDefault(require("path"));
var react_1 = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var index_1 = require("../../action-definitions/index");
var selectors_1 = require("../../redux/selectors");
var dispatchers_thunks_1 = require("../../redux/thunks/dispatchers.thunks");
var icons_types_1 = require("../../types/icons.types");
var file_helper_1 = require("../../util/file-helper");
var icon_helper_1 = require("../../util/icon-helper");
var logger_1 = require("../../util/logger");
var TextPlaceholder_1 = require("../external/TextPlaceholder");
exports.useFileEntryHtmlProps = function (file) {
    return react_1.useMemo(function () {
        var dataProps = {
            'data-test-id': 'file-entry',
            'data-chonky-file-id': file ? file.id : undefined,
        };
        return __assign({ role: 'listitem' }, dataProps);
    }, [file]);
};
exports.useFileEntryState = function (file, selected, focused) {
    var iconData = icon_helper_1.useIconData(file);
    var _a = exports.useThumbnailUrl(file), thumbnailUrl = _a.thumbnailUrl, thumbnailLoading = _a.thumbnailLoading;
    return react_1.useMemo(function () {
        var fileColor = thumbnailUrl
            ? icon_helper_1.ColorsDark[iconData.colorCode]
            : icon_helper_1.ColorsLight[iconData.colorCode];
        var iconSpin = thumbnailLoading || !file;
        var icon = thumbnailLoading ? icons_types_1.ChonkyIconName.loading : iconData.icon;
        return {
            childrenCount: file_helper_1.FileHelper.getChildrenCount(file),
            icon: file && file.icon !== undefined ? file.icon : icon,
            iconSpin: iconSpin,
            thumbnailUrl: thumbnailUrl,
            color: file && file.color !== undefined ? file.color : fileColor,
            selected: selected,
            focused: !!focused,
        };
    }, [file, focused, iconData, selected, thumbnailLoading, thumbnailUrl]);
};
exports.useDndIcon = function (dndState) {
    var dndIconName = null;
    if (dndState.dndIsOver) {
        var showDropIcon = dndState.dndCanDrop;
        dndIconName = showDropIcon
            ? icons_types_1.ChonkyIconName.dndCanDrop
            : icons_types_1.ChonkyIconName.dndCannotDrop;
    }
    else if (dndState.dndIsDragging) {
        dndIconName = icons_types_1.ChonkyIconName.dndDragging;
    }
    return dndIconName;
};
exports.useModifierIconComponents = function (file) {
    var modifierIcons = react_1.useMemo(function () {
        var modifierIcons = [];
        if (file_helper_1.FileHelper.isHidden(file))
            modifierIcons.push(icons_types_1.ChonkyIconName.hidden);
        if (file_helper_1.FileHelper.isSymlink(file))
            modifierIcons.push(icons_types_1.ChonkyIconName.symlink);
        if (file_helper_1.FileHelper.isEncrypted(file))
            modifierIcons.push(icons_types_1.ChonkyIconName.lock);
        return modifierIcons;
    }, [file]);
    var ChonkyIcon = react_1.useContext(icon_helper_1.ChonkyIconContext);
    var modifierIconComponents = react_1.useMemo(function () {
        return modifierIcons.map(function (icon, index) { return (react_1.default.createElement(ChonkyIcon, { key: "file-modifier-" + index, icon: icon })); });
    }, 
    // For some reason ESLint marks `ChonkyIcon` as an unnecessary dependency,
    // but we expect it can change at runtime so we disable the check.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ChonkyIcon, modifierIcons]);
    return modifierIconComponents;
};
exports.useFileNameComponent = function (file) {
    return react_1.useMemo(function () {
        var _a;
        if (!file)
            return react_1.default.createElement(TextPlaceholder_1.TextPlaceholder, { minLength: 15, maxLength: 20 });
        var name;
        var extension = null;
        var isDir = file_helper_1.FileHelper.isDirectory(file);
        if (isDir) {
            name = file.name;
        }
        else {
            extension = (_a = file.ext) !== null && _a !== void 0 ? _a : path_1.default.extname(file.name);
            name = file.name.substr(0, file.name.length - extension.length);
        }
        return (react_1.default.createElement(react_1.default.Fragment, null,
            name,
            extension && (react_1.default.createElement("span", { className: "chonky-file-entry-description-title-extension" }, extension))));
    }, [file]);
};
exports.useThumbnailUrl = function (file) {
    var thumbnailGenerator = react_redux_1.useSelector(selectors_1.selectThumbnailGenerator);
    var _a = react_1.useState(null), thumbnailUrl = _a[0], setThumbnailUrl = _a[1];
    var _b = react_1.useState(false), thumbnailLoading = _b[0], setThumbnailLoading = _b[1];
    react_1.useEffect(function () {
        var loadingCancelled = false;
        if (file) {
            if (thumbnailGenerator) {
                setThumbnailLoading(true);
                Promise.resolve()
                    .then(function () { return thumbnailGenerator(file); })
                    .then(function (thumbnailUrl) {
                    if (loadingCancelled)
                        return;
                    setThumbnailLoading(false);
                    if (thumbnailUrl && typeof thumbnailUrl === 'string') {
                        setThumbnailUrl(thumbnailUrl);
                    }
                })
                    .catch(function (error) {
                    if (!loadingCancelled)
                        setThumbnailLoading(false);
                    logger_1.Logger.error("User-defined \"thumbnailGenerator\" handler threw an error: " + error.message);
                });
            }
            else if (file.thumbnailUrl) {
                setThumbnailUrl(file.thumbnailUrl);
            }
        }
        return function () {
            loadingCancelled = true;
        };
    }, [file, setThumbnailUrl, setThumbnailLoading, thumbnailGenerator]);
    return { thumbnailUrl: thumbnailUrl, thumbnailLoading: thumbnailLoading };
};
exports.useFileClickHandlers = function (file, displayIndex) {
    var dispatch = react_redux_1.useDispatch();
    // Prepare base handlers
    var onMouseClick = react_1.useCallback(function (event, clickType) {
        if (!file)
            return;
        dispatch(dispatchers_thunks_1.thunkRequestFileAction(index_1.ChonkyActions.MouseClickFile, {
            clickType: clickType,
            file: file,
            fileDisplayIndex: displayIndex,
            altKey: event.altKey,
            ctrlKey: event.ctrlKey,
            shiftKey: event.shiftKey,
        }));
    }, [dispatch, file, displayIndex]);
    var onKeyboardClick = react_1.useCallback(function (event) {
        if (!file)
            return;
        dispatch(dispatchers_thunks_1.thunkRequestFileAction(index_1.ChonkyActions.KeyboardClickFile, {
            file: file,
            fileDisplayIndex: displayIndex,
            enterKey: event.enterKey,
            spaceKey: event.spaceKey,
            altKey: event.altKey,
            ctrlKey: event.ctrlKey,
            shiftKey: event.shiftKey,
        }));
    }, [dispatch, file, displayIndex]);
    // Prepare single/double click handlers
    var onSingleClick = react_1.useCallback(function (event) { return onMouseClick(event, 'single'); }, [onMouseClick]);
    var onDoubleClick = react_1.useCallback(function (event) { return onMouseClick(event, 'double'); }, [onMouseClick]);
    return {
        onSingleClick: onSingleClick,
        onDoubleClick: onDoubleClick,
        onKeyboardClick: onKeyboardClick,
    };
};
