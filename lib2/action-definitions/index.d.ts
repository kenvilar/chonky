export declare const ChonkyActions: {
    CopyFiles: import("tsdef").WritableProps<{
        readonly id: "copy_files";
        readonly requiresSelection: true;
        readonly hotkeys: readonly ["ctrl+c"];
        readonly button: {
            readonly name: "Copy selection";
            readonly toolbar: true;
            readonly contextMenu: true;
            readonly group: "Actions";
            readonly icon: import("..").ChonkyIconName.copy;
        };
    }>;
    CreateFolder: import("tsdef").WritableProps<{
        readonly id: "create_folder";
        readonly button: {
            readonly name: "Create folder";
            readonly toolbar: true;
            readonly tooltip: "Create a folder";
            readonly icon: import("..").ChonkyIconName.folderCreate;
        };
    }>;
    UploadFiles: import("tsdef").WritableProps<{
        readonly id: "upload_files";
        readonly button: {
            readonly name: "Upload files";
            readonly toolbar: true;
            readonly tooltip: "Upload files";
            readonly icon: import("..").ChonkyIconName.upload;
        };
    }>;
    DownloadFiles: import("tsdef").WritableProps<{
        readonly id: "download_files";
        readonly requiresSelection: true;
        readonly button: {
            readonly name: "Download files";
            readonly toolbar: true;
            readonly contextMenu: true;
            readonly group: "Actions";
            readonly icon: import("..").ChonkyIconName.download;
        };
    }>;
    DeleteFiles: import("tsdef").WritableProps<{
        readonly id: "delete_files";
        readonly requiresSelection: true;
        readonly hotkeys: readonly ["delete"];
        readonly button: {
            readonly name: "Delete files";
            readonly toolbar: true;
            readonly contextMenu: true;
            readonly group: "Actions";
            readonly icon: import("..").ChonkyIconName.trash;
        };
    }>;
    OpenSelection: import("tsdef").WritableProps<{
        readonly id: "open_selection";
        readonly hotkeys: readonly ["enter"];
        readonly requiresSelection: true;
        readonly fileFilter: typeof import("..").FileHelper.isOpenable;
        readonly button: {
            readonly name: "Open selection";
            readonly toolbar: true;
            readonly contextMenu: true;
            readonly group: "Actions";
            readonly icon: import("..").ChonkyIconName.openFiles;
        };
    }>;
    SelectAllFiles: import("tsdef").WritableProps<{
        readonly id: "select_all_files";
        readonly hotkeys: readonly ["ctrl+a"];
        readonly button: {
            readonly name: "Select all files";
            readonly toolbar: true;
            readonly contextMenu: true;
            readonly group: "Actions";
            readonly icon: import("..").ChonkyIconName.selectAllFiles;
        };
        readonly selectionTransform: import("..").FileSelectionTransform;
    }>;
    ClearSelection: import("tsdef").WritableProps<{
        readonly id: "clear_selection";
        readonly hotkeys: readonly ["escape"];
        readonly button: {
            readonly name: "Clear selection";
            readonly toolbar: true;
            readonly contextMenu: true;
            readonly group: "Actions";
            readonly icon: import("..").ChonkyIconName.clearSelection;
        };
        readonly selectionTransform: import("..").FileSelectionTransform;
    }>;
    EnableListView: import("tsdef").WritableProps<{
        readonly id: "enable_list_view";
        readonly fileViewConfig: {
            readonly mode: import("..").FileViewMode.List;
            readonly entryHeight: 30;
        };
        readonly button: {
            readonly name: "Switch to List view";
            readonly toolbar: true;
            readonly icon: import("..").ChonkyIconName.list;
            readonly iconOnly: true;
        };
    }>;
    EnableCompactView: import("tsdef").WritableProps<{
        readonly id: "enable_compact_view";
        readonly fileViewConfig: {
            readonly mode: import("..").FileViewMode.Compact;
            readonly entryHeight: 40;
            readonly entryWidth: 220;
        };
        readonly button: {
            readonly name: "Switch to Compact view";
            readonly toolbar: true;
            readonly icon: import("..").ChonkyIconName.compact;
            readonly iconOnly: true;
        };
    }>;
    EnableGridView: import("tsdef").WritableProps<{
        readonly id: "enable_grid_view";
        readonly fileViewConfig: {
            readonly mode: import("..").FileViewMode.Grid;
            readonly entryWidth: 165;
            readonly entryHeight: 130;
        };
        readonly button: {
            readonly name: "Switch to Grid view";
            readonly toolbar: true;
            readonly icon: import("..").ChonkyIconName.smallThumbnail;
            readonly iconOnly: true;
        };
    }>;
    SortFilesByName: import("tsdef").WritableProps<{
        readonly id: "sort_files_by_name";
        readonly sortKeySelector: (file: import("tsdef").Nullable<import("..").FileData>) => string | undefined;
        readonly button: {
            readonly name: "Sort by name";
            readonly toolbar: true;
            readonly group: "Options";
        };
    }>;
    SortFilesBySize: import("tsdef").WritableProps<{
        readonly id: "sort_files_by_size";
        readonly sortKeySelector: (file: import("tsdef").Nullable<import("..").FileData>) => number | undefined;
        readonly button: {
            readonly name: "Sort by size";
            readonly toolbar: true;
            readonly group: "Options";
        };
    }>;
    SortFilesByDate: import("tsdef").WritableProps<{
        readonly id: "sort_files_by_date";
        readonly sortKeySelector: (file: import("tsdef").Nullable<import("..").FileData>) => string | Date | undefined;
        readonly button: {
            readonly name: "Sort by date";
            readonly toolbar: true;
            readonly group: "Options";
        };
    }>;
    ToggleHiddenFiles: import("tsdef").WritableProps<{
        readonly id: "toggle_hidden_files";
        readonly hotkeys: readonly ["ctrl+h"];
        readonly option: {
            readonly id: "show_hidden_files";
            readonly defaultValue: true;
        };
        readonly button: {
            readonly name: "Show hidden files";
            readonly toolbar: true;
            readonly group: "Options";
        };
    }>;
    ToggleShowFoldersFirst: import("tsdef").WritableProps<{
        readonly id: "toggle_show_folders_first";
        readonly option: {
            readonly id: "show_folders_first";
            readonly defaultValue: true;
        };
        readonly button: {
            readonly name: "Show folders first";
            readonly toolbar: true;
            readonly group: "Options";
        };
    }>;
    FocusSearchInput: import("tsdef").WritableProps<{
        readonly id: "focus_search_input";
        readonly hotkeys: readonly ["ctrl+f"];
    }>;
    ToggleDarkMode: import("tsdef").WritableProps<{
        readonly id: "enable_dark_mode";
        readonly option: {
            readonly id: "dark_mode";
            readonly defaultValue: false;
        };
        readonly button: {
            readonly name: "Enable dark mode";
            readonly toolbar: true;
            readonly icon: import("..").ChonkyIconName.list;
            readonly iconOnly: true;
        };
    }>;
    MouseClickFile: import("tsdef").WritableProps<{
        readonly id: "mouse_click_file";
        readonly __payloadType: import("../types/action-payloads.types").MouseClickFilePayload;
    }>;
    KeyboardClickFile: import("tsdef").WritableProps<{
        readonly id: "keyboard_click_file";
        readonly __payloadType: import("../types/action-payloads.types").KeyboardClickFilePayload;
    }>;
    StartDragNDrop: import("tsdef").WritableProps<{
        readonly id: "start_drag_n_drop";
        readonly __payloadType: import("../types/action-payloads.types").StartDragNDropPayload;
    }>;
    EndDragNDrop: import("tsdef").WritableProps<{
        readonly id: "end_drag_n_drop";
        readonly __payloadType: import("../types/action-payloads.types").EndDragNDropPayload;
    }>;
    MoveFiles: import("tsdef").WritableProps<{
        readonly id: "move_files";
        readonly __payloadType: import("../types/action-payloads.types").MoveFilesPayload;
    }>;
    ChangeSelection: import("tsdef").WritableProps<{
        readonly id: "change_selection";
        readonly __payloadType: import("../types/action-payloads.types").ChangeSelectionPayload;
    }>;
    OpenFiles: import("tsdef").WritableProps<{
        readonly id: "open_files";
        readonly __payloadType: import("../types/action-payloads.types").OpenFilesPayload;
    }>;
    OpenParentFolder: import("tsdef").WritableProps<{
        readonly id: "open_parent_folder";
        readonly hotkeys: readonly ["backspace"];
        readonly button: {
            readonly name: "Go up a directory";
            readonly toolbar: true;
            readonly contextMenu: false;
            readonly icon: import("..").ChonkyIconName.openParentFolder;
            readonly iconOnly: true;
        };
    }>;
    OpenFileContextMenu: import("tsdef").WritableProps<{
        readonly id: "open_file_context_menu";
        readonly __payloadType: import("../types/action-payloads.types").OpenFileContextMenuPayload;
    }>;
};
export declare const EssentialFileActions: (import("tsdef").WritableProps<{
    readonly id: "mouse_click_file";
    readonly __payloadType: import("../types/action-payloads.types").MouseClickFilePayload;
}> | import("tsdef").WritableProps<{
    readonly id: "keyboard_click_file";
    readonly __payloadType: import("../types/action-payloads.types").KeyboardClickFilePayload;
}> | import("tsdef").WritableProps<{
    readonly id: "start_drag_n_drop";
    readonly __payloadType: import("../types/action-payloads.types").StartDragNDropPayload;
}> | import("tsdef").WritableProps<{
    readonly id: "end_drag_n_drop";
    readonly __payloadType: import("../types/action-payloads.types").EndDragNDropPayload;
}> | import("tsdef").WritableProps<{
    readonly id: "move_files";
    readonly __payloadType: import("../types/action-payloads.types").MoveFilesPayload;
}> | import("tsdef").WritableProps<{
    readonly id: "change_selection";
    readonly __payloadType: import("../types/action-payloads.types").ChangeSelectionPayload;
}> | import("tsdef").WritableProps<{
    readonly id: "open_files";
    readonly __payloadType: import("../types/action-payloads.types").OpenFilesPayload;
}> | import("tsdef").WritableProps<{
    readonly id: "open_parent_folder";
    readonly hotkeys: readonly ["backspace"];
    readonly button: {
        readonly name: "Go up a directory";
        readonly toolbar: true;
        readonly contextMenu: false;
        readonly icon: import("..").ChonkyIconName.openParentFolder;
        readonly iconOnly: true;
    };
}> | import("tsdef").WritableProps<{
    readonly id: "open_file_context_menu";
    readonly __payloadType: import("../types/action-payloads.types").OpenFileContextMenuPayload;
}>)[];
export declare const DefaultFileActions: (import("tsdef").WritableProps<{
    readonly id: "open_selection";
    readonly hotkeys: readonly ["enter"];
    readonly requiresSelection: true;
    readonly fileFilter: typeof import("..").FileHelper.isOpenable;
    readonly button: {
        readonly name: "Open selection";
        readonly toolbar: true;
        readonly contextMenu: true;
        readonly group: "Actions";
        readonly icon: import("..").ChonkyIconName.openFiles;
    };
}> | import("tsdef").WritableProps<{
    readonly id: "select_all_files";
    readonly hotkeys: readonly ["ctrl+a"];
    readonly button: {
        readonly name: "Select all files";
        readonly toolbar: true;
        readonly contextMenu: true;
        readonly group: "Actions";
        readonly icon: import("..").ChonkyIconName.selectAllFiles;
    };
    readonly selectionTransform: import("..").FileSelectionTransform;
}> | import("tsdef").WritableProps<{
    readonly id: "clear_selection";
    readonly hotkeys: readonly ["escape"];
    readonly button: {
        readonly name: "Clear selection";
        readonly toolbar: true;
        readonly contextMenu: true;
        readonly group: "Actions";
        readonly icon: import("..").ChonkyIconName.clearSelection;
    };
    readonly selectionTransform: import("..").FileSelectionTransform;
}> | import("tsdef").WritableProps<{
    readonly id: "enable_list_view";
    readonly fileViewConfig: {
        readonly mode: import("..").FileViewMode.List;
        readonly entryHeight: 30;
    };
    readonly button: {
        readonly name: "Switch to List view";
        readonly toolbar: true;
        readonly icon: import("..").ChonkyIconName.list;
        readonly iconOnly: true;
    };
}> | import("tsdef").WritableProps<{
    readonly id: "enable_grid_view";
    readonly fileViewConfig: {
        readonly mode: import("..").FileViewMode.Grid;
        readonly entryWidth: 165;
        readonly entryHeight: 130;
    };
    readonly button: {
        readonly name: "Switch to Grid view";
        readonly toolbar: true;
        readonly icon: import("..").ChonkyIconName.smallThumbnail;
        readonly iconOnly: true;
    };
}> | import("tsdef").WritableProps<{
    readonly id: "sort_files_by_name";
    readonly sortKeySelector: (file: import("tsdef").Nullable<import("..").FileData>) => string | undefined;
    readonly button: {
        readonly name: "Sort by name";
        readonly toolbar: true;
        readonly group: "Options";
    };
}> | import("tsdef").WritableProps<{
    readonly id: "sort_files_by_size";
    readonly sortKeySelector: (file: import("tsdef").Nullable<import("..").FileData>) => number | undefined;
    readonly button: {
        readonly name: "Sort by size";
        readonly toolbar: true;
        readonly group: "Options";
    };
}> | import("tsdef").WritableProps<{
    readonly id: "sort_files_by_date";
    readonly sortKeySelector: (file: import("tsdef").Nullable<import("..").FileData>) => string | Date | undefined;
    readonly button: {
        readonly name: "Sort by date";
        readonly toolbar: true;
        readonly group: "Options";
    };
}> | import("tsdef").WritableProps<{
    readonly id: "toggle_hidden_files";
    readonly hotkeys: readonly ["ctrl+h"];
    readonly option: {
        readonly id: "show_hidden_files";
        readonly defaultValue: true;
    };
    readonly button: {
        readonly name: "Show hidden files";
        readonly toolbar: true;
        readonly group: "Options";
    };
}> | import("tsdef").WritableProps<{
    readonly id: "toggle_show_folders_first";
    readonly option: {
        readonly id: "show_folders_first";
        readonly defaultValue: true;
    };
    readonly button: {
        readonly name: "Show folders first";
        readonly toolbar: true;
        readonly group: "Options";
    };
}> | import("tsdef").WritableProps<{
    readonly id: "focus_search_input";
    readonly hotkeys: readonly ["ctrl+f"];
}>)[];
