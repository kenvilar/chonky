import { FileBrowserProps } from '../types/file-browser.types';
export declare type ChonkyConfig = Pick<FileBrowserProps, 'fileActions' | 'onFileAction' | 'thumbnailGenerator' | 'doubleClickDelay' | 'disableSelection' | 'disableDefaultFileActions' | 'disableDragAndDrop' | 'disableDragAndDropProvider' | 'defaultSortActionId' | 'defaultFileViewActionId' | 'clearSelectionOnOutsideClick' | 'iconComponent' | 'darkMode' | 'i18n'>;
export declare const defaultConfig: ChonkyConfig;
export declare const setChonkyDefaults: (config: Partial<ChonkyConfig>) => void;
