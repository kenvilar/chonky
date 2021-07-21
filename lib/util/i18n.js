"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChonkyFormattersContext = exports.defaultFormatters = exports.useLocalizedFileEntryStrings = exports.useLocalizedFileActionStrings = exports.useLocalizedFileActionGroup = exports.getActionI18nId = exports.getI18nId = exports.I18nNamespace = void 0;
var filesize_1 = __importDefault(require("filesize"));
var react_1 = require("react");
var react_intl_1 = require("react-intl");
var file_helper_1 = require("./file-helper");
var I18nNamespace;
(function (I18nNamespace) {
    I18nNamespace["Toolbar"] = "toolbar";
    I18nNamespace["FileList"] = "fileList";
    I18nNamespace["FileEntry"] = "fileEntry";
    I18nNamespace["FileContextMenu"] = "contextMenu";
    I18nNamespace["FileActions"] = "actions";
    I18nNamespace["FileActionGroups"] = "actionGroups";
})(I18nNamespace = exports.I18nNamespace || (exports.I18nNamespace = {}));
var getI18nId = function (namespace, stringId) {
    return "chonky." + namespace + "." + stringId;
};
exports.getI18nId = getI18nId;
var getActionI18nId = function (actionId, stringId) {
    return "chonky." + I18nNamespace.FileActions + "." + actionId + "." + stringId;
};
exports.getActionI18nId = getActionI18nId;
var useLocalizedFileActionGroup = function (groupName) {
    var intl = react_intl_1.useIntl();
    return react_1.useMemo(function () {
        return intl.formatMessage({
            id: exports.getI18nId(I18nNamespace.FileActionGroups, groupName),
            defaultMessage: groupName,
        });
    }, [groupName, intl]);
};
exports.useLocalizedFileActionGroup = useLocalizedFileActionGroup;
var useLocalizedFileActionStrings = function (action) {
    var intl = react_intl_1.useIntl();
    return react_1.useMemo(function () {
        var _a, _b, _c;
        if (!action) {
            return {
                buttonName: '',
                buttonTooltip: undefined,
            };
        }
        var buttonName = intl.formatMessage({
            id: exports.getActionI18nId(action.id, 'button.name'),
            defaultMessage: (_a = action.button) === null || _a === void 0 ? void 0 : _a.name,
        });
        var buttonTooltip = undefined;
        if ((_b = action.button) === null || _b === void 0 ? void 0 : _b.tooltip) {
            // We only translate the tooltip if the original action has a tooltip.
            buttonTooltip = intl.formatMessage({
                id: exports.getActionI18nId(action.id, 'button.tooltip'),
                defaultMessage: (_c = action.button) === null || _c === void 0 ? void 0 : _c.tooltip,
            });
        }
        return {
            buttonName: buttonName,
            buttonTooltip: buttonTooltip,
        };
    }, [action, intl]);
};
exports.useLocalizedFileActionStrings = useLocalizedFileActionStrings;
var useLocalizedFileEntryStrings = function (file) {
    var intl = react_intl_1.useIntl();
    var formatters = react_1.useContext(exports.ChonkyFormattersContext);
    return react_1.useMemo(function () {
        return {
            fileModDateString: formatters.formatFileModDate(intl, file),
            fileSizeString: formatters.formatFileSize(intl, file),
        };
    }, [file, formatters, intl]);
};
exports.useLocalizedFileEntryStrings = useLocalizedFileEntryStrings;
exports.defaultFormatters = {
    formatFileModDate: function (intl, file) {
        var safeModDate = file_helper_1.FileHelper.getModDate(file);
        if (safeModDate) {
            return intl.formatDate(safeModDate, {
                dateStyle: 'medium',
                timeStyle: 'short',
            });
        }
        else {
            return null;
        }
    },
    formatFileSize: function (intl, file) {
        if (!file || typeof file.size !== 'number')
            return null;
        var size = file.size;
        var sizeData = filesize_1.default(size, { bits: false, output: 'object' });
        if (sizeData.symbol === 'B') {
            return Math.round(sizeData.value / 10) / 100.0 + " KB";
        }
        else if (sizeData.symbol === 'KB') {
            return Math.round(sizeData.value) + " " + sizeData.symbol;
        }
        return sizeData.value + " " + sizeData.symbol;
    },
};
exports.ChonkyFormattersContext = react_1.createContext(exports.defaultFormatters);
