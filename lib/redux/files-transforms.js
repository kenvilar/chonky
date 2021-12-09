"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeInputArray = void 0;
var logger_1 = require("../util/logger");
exports.sanitizeInputArray = function (mode, rawArray) {
    var sanitizedFiles = [];
    var errorMessages = [];
    if ((mode === 'folderChain' || mode === 'fileActions') && !rawArray) {
        // Do nothing, we allow folder chain to be null.
    }
    else if (!Array.isArray(rawArray)) {
        errorMessages.push("Expected \"" + mode + "\" prop to be an array, got \"" + typeof rawArray + "\" instead.");
    }
    else {
        var nonObjectFileCount = 0;
        var missingFieldFileCount = 0;
        var seenIds = new Set();
        var duplicateIds = new Set();
        for (var i = 0; i < rawArray.length; ++i) {
            var item = rawArray[i];
            if (!item) {
                if (mode === 'fileActions')
                    nonObjectFileCount++;
                else
                    sanitizedFiles.push(null);
            }
            else if (typeof item !== 'object') {
                nonObjectFileCount++;
            }
            else {
                if (!item.id || (mode !== 'fileActions' && !item.name)) {
                    missingFieldFileCount++;
                }
                else if (seenIds.has(item.id)) {
                    duplicateIds.add(item.id);
                }
                else {
                    seenIds.add(item.id);
                    sanitizedFiles.push(item);
                }
            }
        }
        if (nonObjectFileCount) {
            errorMessages.push("Detected " + nonObjectFileCount + " file(s) of invalid type. Remember " +
                "that \"files\" array should contain either objects or nulls.");
        }
        if (missingFieldFileCount) {
            errorMessages.push("Detected " + missingFieldFileCount + " file(s) that are missing the " +
                "required fields. Remember that file object should define an " +
                "\"id\" and a \"name\".");
        }
        if (duplicateIds.size > 0) {
            var repeatedIdsString = '"' + Array.from(duplicateIds).join('", "') + '"';
            errorMessages.push("Detected " + duplicateIds.size + " file IDs that are used multiple " +
                "times. Remember that each file should have a unique IDs. The " +
                ("following IDs were seen multiple times: " + repeatedIdsString));
        }
    }
    if (errorMessages.length > 0) {
        var errorMessageString = '\n- ' + errorMessages.join('\n- ');
        var arrayString = void 0;
        var itemString = void 0;
        if (mode === 'folderChain') {
            arrayString = 'folder chain';
            itemString = 'files';
        }
        else if (mode === 'fileActions') {
            arrayString = 'file actions';
            itemString = 'file actions';
        }
        else {
            // mode === 'files'
            arrayString = 'files';
            itemString = 'files';
        }
        logger_1.Logger.error("Errors were detected when sanitizing the " + arrayString + " array. " +
            ("Offending " + itemString + " were removed from the array. Summary of ") +
            ("validation errors: " + errorMessageString));
    }
    return {
        sanitizedArray: sanitizedFiles,
        errorMessages: errorMessages,
    };
};
