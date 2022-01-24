import { Nullable } from 'tsdef';
import { FileData } from '../../types/file.types';
export interface FolderChainItem {
    file: Nullable<FileData>;
    disabled: boolean;
    onClick?: () => void;
}
export declare const useFolderChainItems: () => FolderChainItem[];
