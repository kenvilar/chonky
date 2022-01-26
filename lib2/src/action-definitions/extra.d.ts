import { ChonkyIconName } from '../types/icons.types';
export declare const ExtraActions: {
    /**
     * Action that adds a button and shortcut to copy files.
     */
    CopyFiles: import("tsdef").WritableProps<{
        readonly id: "copy_files";
        readonly requiresSelection: true;
        readonly hotkeys: readonly ["ctrl+c"];
        readonly button: {
            readonly name: "Copy selection";
            readonly toolbar: true;
            readonly contextMenu: true;
            readonly group: "Actions";
            readonly icon: ChonkyIconName.copy;
        };
    }>;
    /**
     * Action that adds a button to create a new folder.
     */
    CreateFolder: import("tsdef").WritableProps<{
        readonly id: "create_folder";
        readonly button: {
            readonly name: "Create folder";
            readonly toolbar: true;
            readonly tooltip: "Create a folder";
            readonly icon: ChonkyIconName.folderCreate;
        };
    }>;
    /**
     * Action that adds a button to upload files.
     */
    UploadFiles: import("tsdef").WritableProps<{
        readonly id: "upload_files";
        readonly button: {
            readonly name: "Upload files";
            readonly toolbar: true;
            readonly tooltip: "Upload files";
            readonly icon: ChonkyIconName.upload;
        };
    }>;
    /**
     * Action that adds a button to download files.
     */
    DownloadFiles: import("tsdef").WritableProps<{
        readonly id: "download_files";
        readonly requiresSelection: true;
        readonly button: {
            readonly name: "Download files";
            readonly toolbar: true;
            readonly contextMenu: true;
            readonly group: "Actions";
            readonly icon: ChonkyIconName.download;
        };
    }>;
    /**
     * Action that adds a button and shortcut to delete files.
     */
    DeleteFiles: import("tsdef").WritableProps<{
        readonly id: "delete_files";
        readonly requiresSelection: true;
        readonly hotkeys: readonly ["delete"];
        readonly button: {
            readonly name: "Delete files";
            readonly toolbar: true;
            readonly contextMenu: true;
            readonly group: "Actions";
            readonly icon: ChonkyIconName.trash;
        };
    }>;
};
