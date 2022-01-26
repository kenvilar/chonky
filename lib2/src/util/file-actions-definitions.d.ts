import { ChonkyIconName } from '../types/icons.types';
export declare const OldChonkyActions: {
    CopyFiles: {
        id: string;
        requiresSelection: true;
        hotkeys: string[];
        button: {
            name: string;
            toolbar: true;
            contextMenu: true;
            group: string;
            dropdown: boolean;
            icon: ChonkyIconName;
        };
    };
    CreateFolder: {
        id: string;
        button: {
            name: string;
            toolbar: true;
            contextMenu: true;
            tooltip: string;
            icon: ChonkyIconName;
        };
    };
    UploadFiles: {
        id: string;
        button: {
            name: string;
            toolbar: true;
            contextMenu: true;
            tooltip: string;
            icon: ChonkyIconName;
        };
    };
    DownloadFiles: {
        id: string;
        requiresSelection: true;
        button: {
            name: string;
            toolbar: true;
            contextMenu: true;
            group: string;
            tooltip: string;
            dropdown: boolean;
            icon: ChonkyIconName;
        };
    };
    DeleteFiles: {
        id: string;
        requiresSelection: true;
        hotkeys: string[];
        button: {
            name: string;
            toolbar: true;
            contextMenu: true;
            group: string;
            tooltip: string;
            dropdown: boolean;
            icon: ChonkyIconName;
        };
    };
};
