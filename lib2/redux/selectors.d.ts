import { Nilable, Nullable } from 'tsdef';
import { FileData, FileFilter } from '../types/file.types';
import { RootState } from '../types/redux.types';
export declare const selectInstanceId: (state: RootState) => string;
export declare const selectExternalFileActionHandler: (state: RootState) => Nullable<import("..").GenericFileActionHandler<import("..").FileAction>>;
export declare const selectFileActionMap: (state: RootState) => import("../types/action.types").FileActionMap;
export declare const selectFileActionIds: (state: RootState) => string[];
export declare const selectFileActionData: (fileActionId: string) => (state: RootState) => import("..").FileAction;
export declare const selectToolbarItems: (state: RootState) => import("../types/action-menus.types").FileActionMenuItem[];
export declare const selectContextMenuItems: (state: RootState) => import("../types/action-menus.types").FileActionMenuItem[];
export declare const selectFolderChain: (state: RootState) => import("../types/file.types").FileArray;
export declare const selectCurrentFolder: (state: RootState) => Nullable<FileData>;
export declare const selectParentFolder: (state: RootState) => Nullable<FileData>;
export declare const selectRawFiles: (state: RootState) => any;
export declare const selectFileMap: (state: RootState) => import("../types/file.types").FileMap;
export declare const selectCleanFileIds: (state: RootState) => string[];
export declare const selectFileData: (fileId: Nullable<string>) => (state: RootState) => Nullable<FileData>;
export declare const selectHiddenFileIdMap: (state: RootState) => import("../types/file.types").FileIdTrueMap;
export declare const selectHiddenFileCount: (state: RootState) => number;
export declare const selectDisplayFileIds: (state: RootState) => (string | null)[];
export declare const selectFocusSearchInput: (state: RootState) => Nullable<() => void>;
export declare const selectSearchString: (state: RootState) => string;
export declare const selectSelectionMap: (state: RootState) => import("../types/file.types").FileIdTrueMap;
export declare const selectSelectedFileIds: (state: RootState) => string[];
export declare const selectSelectionSize: (state: RootState) => number;
export declare const selectIsFileSelected: (fileId: Nullable<string>) => (state: RootState) => boolean;
export declare const selectSelectedFiles: (state: RootState) => FileData[];
export declare const selectSelectedFilesForAction: (fileActionId: string) => (state: RootState) => FileData[] | undefined;
export declare const selectSelectedFilesForActionCount: (fileActionId: string) => (state: RootState) => number | undefined;
export declare const selectDisableSelection: (state: RootState) => boolean;
export declare const selectFileViewConfig: (state: RootState) => import("../types/file-view.types").FileViewConfig;
export declare const selectSortActionId: (state: RootState) => string | null;
export declare const selectSortOrder: (state: RootState) => import("../types/sort.types").SortOrder;
export declare const selectOptionMap: (state: RootState) => import("../types/options.types").OptionMap;
export declare const selectOptionValue: (optionId: string) => (state: RootState) => any;
export declare const selectThumbnailGenerator: (state: RootState) => Nullable<import("..").ThumbnailGenerator>;
export declare const selectDoubleClickDelay: (state: RootState) => number;
export declare const selectIsDnDDisabled: (state: RootState) => boolean;
export declare const selectClearSelectionOnOutsideClick: (state: RootState) => boolean;
export declare const selectLastClickIndex: (state: RootState) => number | null;
export declare const selectContextMenuMounted: (state: RootState) => boolean;
export declare const selectContextMenuConfig: (state: RootState) => Nullable<import("../types/context-menu.types").ContextMenuConfig>;
export declare const selectContextMenuTriggerFile: (state: RootState) => Nullable<FileData>;
export declare const getFileData: (state: RootState, fileId: Nullable<string>) => Nullable<FileData>;
export declare const getIsFileSelected: (state: RootState, file: FileData) => boolean;
export declare const getSelectedFiles: (state: RootState, ...filters: Nilable<FileFilter>[]) => FileData[];
export declare const getSelectedFilesForAction: (state: RootState, fileActionId: string) => FileData[] | undefined;
