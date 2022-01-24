"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtraActions = void 0;
var icons_types_1 = require("../types/icons.types");
var helpers_1 = require("../util/helpers");
exports.ExtraActions = {
    /**
     * Action that adds a button and shortcut to copy files.
     */
    CopyFiles: (0, helpers_1.defineFileAction)({
        id: 'copy_files',
        requiresSelection: true,
        hotkeys: ['ctrl+c'],
        button: {
            name: 'Copy selection',
            toolbar: true,
            contextMenu: true,
            group: 'Actions',
            icon: icons_types_1.ChonkyIconName.copy,
        },
    }),
    /**
     * Action that adds a button to create a new folder.
     */
    CreateFolder: (0, helpers_1.defineFileAction)({
        id: 'create_folder',
        button: {
            name: 'Create folder',
            toolbar: true,
            tooltip: 'Create a folder',
            icon: icons_types_1.ChonkyIconName.folderCreate,
        },
    }),
    /**
     * Action that adds a button to upload files.
     */
    UploadFiles: (0, helpers_1.defineFileAction)({
        id: 'upload_files',
        button: {
            name: 'Upload files',
            toolbar: true,
            tooltip: 'Upload files',
            icon: icons_types_1.ChonkyIconName.upload,
        },
    }),
    /**
     * Action that adds a button to download files.
     */
    DownloadFiles: (0, helpers_1.defineFileAction)({
        id: 'download_files',
        requiresSelection: true,
        button: {
            name: 'Download files',
            toolbar: true,
            contextMenu: true,
            group: 'Actions',
            icon: icons_types_1.ChonkyIconName.download,
        },
    }),
    /**
     * Action that adds a button and shortcut to delete files.
     */
    DeleteFiles: (0, helpers_1.defineFileAction)({
        id: 'delete_files',
        requiresSelection: true,
        hotkeys: ['delete'],
        button: {
            name: 'Delete files',
            toolbar: true,
            contextMenu: true,
            group: 'Actions',
            icon: icons_types_1.ChonkyIconName.trash,
        },
    }),
};
