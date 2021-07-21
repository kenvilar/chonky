/// <reference types="react" />
import { Nullable, Undefinable } from 'tsdef';
import { FileAction } from '../types/action.types';
import { FileData } from '../types/file.types';
import { ChonkyFormatters } from '../types/i18n.types';
export declare enum I18nNamespace {
    Toolbar = "toolbar",
    FileList = "fileList",
    FileEntry = "fileEntry",
    FileContextMenu = "contextMenu",
    FileActions = "actions",
    FileActionGroups = "actionGroups"
}
export declare const getI18nId: (namespace: I18nNamespace, stringId: string) => string;
export declare const getActionI18nId: (actionId: string, stringId: string) => string;
export declare const useLocalizedFileActionGroup: (groupName: string) => string;
export declare const useLocalizedFileActionStrings: (action: Nullable<FileAction>) => {
    buttonName: string;
    buttonTooltip: Undefinable<string>;
};
export declare const useLocalizedFileEntryStrings: (file: Nullable<FileData>) => {
    fileModDateString: Nullable<string>;
    fileSizeString: Nullable<string>;
};
export declare const defaultFormatters: ChonkyFormatters;
export declare const ChonkyFormattersContext: import("react").Context<ChonkyFormatters>;
