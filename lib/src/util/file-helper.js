"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileHelper = void 0;
var logger_1 = require("./logger");
var FileHelper = /** @class */ (function () {
    function FileHelper() {
    }
    FileHelper.isDirectory = function (file) {
        // Not a directory by default
        return !!file && file.isDir === true;
    };
    FileHelper.isHidden = function (file) {
        // Not hidden by default
        return !!file && file.isHidden === true;
    };
    FileHelper.isSymlink = function (file) {
        // Not a symlink by default
        return !!file && file.isSymlink === true;
    };
    FileHelper.isEncrypted = function (file) {
        // Not encrypted by default
        return !!file && file.isEncrypted === true;
    };
    FileHelper.isClickable = function (file) {
        // Clickable by default
        return !!file;
    };
    FileHelper.isOpenable = function (file) {
        // Openable by default
        return !!file && file.openable !== false;
    };
    FileHelper.isSelectable = function (file) {
        // Selectable by default
        return !!file && file.selectable !== false;
    };
    FileHelper.isDraggable = function (file) {
        // File & folders are draggable by default, `null` is not
        return !!file && file.draggable !== false;
    };
    FileHelper.isDroppable = function (file) {
        // Folders are droppable by default, files are not
        if (!file)
            return false;
        if (file.isDir && file.droppable !== false)
            return true;
        return file.droppable === true;
    };
    FileHelper.isDndOpenable = function (file) {
        // Folders are DnD openable by default, files are not
        if (!FileHelper.isOpenable(file))
            return false;
        if (file.isDir && file.dndOpenable !== false)
            return true;
        return file.dndOpenable === true;
    };
    FileHelper.getModDate = function (file) {
        if (!file || file.modDate === null || file.modDate === undefined)
            return null;
        return FileHelper.parseDate(file.modDate);
    };
    FileHelper.parseDate = function (maybeDate) {
        if (typeof maybeDate === 'string' || typeof maybeDate === 'number') {
            // We allow users to provide string and numerical representations of dates.
            try {
                return new Date(maybeDate);
            }
            catch (error) {
                logger_1.Logger.error("Could not convert provided string/number into a date: ".concat(error.message, " "), 'Invalid value:', maybeDate);
            }
        }
        if (maybeDate instanceof Date && !isNaN(maybeDate.getTime())) {
            // We only allow valid dates objects
            return maybeDate;
        }
        // If we have an invalid date representation, we just return null.
        logger_1.Logger.warn('Unsupported date representation:', maybeDate);
        return null;
    };
    FileHelper.getChildrenCount = function (file) {
        if (!file || typeof file.childrenCount !== 'number')
            return null;
        return file.childrenCount;
    };
    return FileHelper;
}());
exports.FileHelper = FileHelper;
