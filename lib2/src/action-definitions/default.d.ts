import { Nullable } from 'tsdef';
import { FileSelectionTransform } from '../types/action.types';
import { FileViewMode } from '../types/file-view.types';
import { FileData } from '../types/file.types';
import { ChonkyIconName } from '../types/icons.types';
import { FileHelper } from '../util/file-helper';
export declare const DefaultActions: {
    /**
     * Action that can be used to open currently selected files.
     */
    OpenSelection: import("tsdef").WritableProps<{
        readonly id: "open_selection";
        readonly hotkeys: readonly ["enter"];
        readonly requiresSelection: true;
        readonly fileFilter: typeof FileHelper.isOpenable;
        readonly button: {
            readonly name: "Open selection";
            readonly toolbar: true;
            readonly contextMenu: true;
            readonly group: "Actions";
            readonly icon: ChonkyIconName.openFiles;
        };
    }>;
    /**
     * Action that selects all files.
     */
    SelectAllFiles: import("tsdef").WritableProps<{
        readonly id: "select_all_files";
        readonly hotkeys: readonly ["ctrl+a"];
        readonly button: {
            readonly name: "Select all files";
            readonly toolbar: true;
            readonly contextMenu: true;
            readonly group: "Actions";
            readonly icon: ChonkyIconName.selectAllFiles;
        };
        readonly selectionTransform: FileSelectionTransform;
    }>;
    /**
     * Action that clear the file selection.
     */
    ClearSelection: import("tsdef").WritableProps<{
        readonly id: "clear_selection";
        readonly hotkeys: readonly ["escape"];
        readonly button: {
            readonly name: "Clear selection";
            readonly toolbar: true;
            readonly contextMenu: true;
            readonly group: "Actions";
            readonly icon: ChonkyIconName.clearSelection;
        };
        readonly selectionTransform: FileSelectionTransform;
    }>;
    /**
     * Action that enables List view.
     */
    EnableListView: import("tsdef").WritableProps<{
        readonly id: "enable_list_view";
        readonly fileViewConfig: {
            readonly mode: FileViewMode.List;
            readonly entryHeight: 30;
        };
        readonly button: {
            readonly name: "Switch to List view";
            readonly toolbar: true;
            readonly icon: ChonkyIconName.list;
            readonly iconOnly: true;
        };
    }>;
    /**
     * Action that enables Compact view. Note that compact view is still
     * experimental and should not be used in production.
     */
    EnableCompactView: import("tsdef").WritableProps<{
        readonly id: "enable_compact_view";
        readonly fileViewConfig: {
            readonly mode: FileViewMode.Compact;
            readonly entryHeight: 40;
            readonly entryWidth: 220;
        };
        readonly button: {
            readonly name: "Switch to Compact view";
            readonly toolbar: true;
            readonly icon: ChonkyIconName.compact;
            readonly iconOnly: true;
        };
    }>;
    /**
     * Action that enables Grid view.
     */
    EnableGridView: import("tsdef").WritableProps<{
        readonly id: "enable_grid_view";
        readonly fileViewConfig: {
            readonly mode: FileViewMode.Grid;
            readonly entryWidth: 165;
            readonly entryHeight: 130;
        };
        readonly button: {
            readonly name: "Switch to Grid view";
            readonly toolbar: true;
            readonly icon: ChonkyIconName.smallThumbnail;
            readonly iconOnly: true;
        };
    }>;
    /**
     * Action that sorts files by `file.name`.
     */
    SortFilesByName: import("tsdef").WritableProps<{
        readonly id: "sort_files_by_name";
        readonly sortKeySelector: (file: Nullable<FileData>) => string | undefined;
        readonly button: {
            readonly name: "Sort by name";
            readonly toolbar: true;
            readonly group: "Options";
        };
    }>;
    /**
     * Action that sorts files by `file.size`.
     */
    SortFilesBySize: import("tsdef").WritableProps<{
        readonly id: "sort_files_by_size";
        readonly sortKeySelector: (file: Nullable<FileData>) => number | undefined;
        readonly button: {
            readonly name: "Sort by size";
            readonly toolbar: true;
            readonly group: "Options";
        };
    }>;
    /**
     * Action that sorts files by `file.modDate`.
     */
    SortFilesByDate: import("tsdef").WritableProps<{
        readonly id: "sort_files_by_date";
        readonly sortKeySelector: (file: Nullable<FileData>) => string | Date | undefined;
        readonly button: {
            readonly name: "Sort by date";
            readonly toolbar: true;
            readonly group: "Options";
        };
    }>;
    /**
     * Action that toggles whether hidden files are shown to the user or not.
     */
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
    /**
     * Action that toggles whether folders should appear before files regardless of
     * current sort function.
     */
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
    /**
     * Action that focuses the search input when it is dispatched.
     */
    FocusSearchInput: import("tsdef").WritableProps<{
        readonly id: "focus_search_input";
        readonly hotkeys: readonly ["ctrl+f"];
    }>;
    /**
     * Action that enables List view.
     */
    ToggleDarkMode: import("tsdef").WritableProps<{
        readonly id: "enable_dark_mode";
        readonly option: {
            readonly id: "dark_mode";
            readonly defaultValue: false;
        };
        readonly button: {
            readonly name: "Enable dark mode";
            readonly toolbar: true;
            readonly icon: ChonkyIconName.list;
            readonly iconOnly: true;
        };
    }>;
};
