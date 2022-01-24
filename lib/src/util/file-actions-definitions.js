"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OldChonkyActions = void 0;
var icons_types_1 = require("../types/icons.types");
var validateActionTypes = function (actionMap) { return actionMap; };
exports.OldChonkyActions = validateActionTypes({
    // Optional actions
    CopyFiles: {
        id: 'copy_files',
        requiresSelection: true,
        hotkeys: ['ctrl+c'],
        button: {
            name: 'Copy selection',
            toolbar: true,
            contextMenu: true,
            group: 'Actions',
            dropdown: true,
            icon: icons_types_1.ChonkyIconName.copy,
        },
    },
    CreateFolder: {
        id: 'create_folder',
        button: {
            name: 'Create folder',
            toolbar: true,
            contextMenu: true,
            tooltip: 'Create a folder',
            icon: icons_types_1.ChonkyIconName.folderCreate,
        },
    },
    UploadFiles: {
        id: 'upload_files',
        button: {
            name: 'Upload files',
            toolbar: true,
            contextMenu: true,
            tooltip: 'Upload files',
            icon: icons_types_1.ChonkyIconName.upload,
        },
    },
    DownloadFiles: {
        id: 'download_files',
        requiresSelection: true,
        button: {
            name: 'Download files',
            toolbar: true,
            contextMenu: true,
            group: 'Actions',
            tooltip: 'Download files',
            dropdown: true,
            icon: icons_types_1.ChonkyIconName.download,
        },
    },
    DeleteFiles: {
        id: 'delete_files',
        requiresSelection: true,
        hotkeys: ['delete'],
        button: {
            name: 'Delete files',
            toolbar: true,
            contextMenu: true,
            group: 'Actions',
            tooltip: 'Delete files',
            dropdown: true,
            icon: icons_types_1.ChonkyIconName.trash,
        },
    },
});
