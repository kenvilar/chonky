import { Nullable } from 'tsdef';
import { FileAction } from '../types/action.types';
import { FileArray } from '../types/file.types';
interface SanitizeFiles {
    (mode: 'files', rawArray: FileArray | any): {
        sanitizedArray: FileArray;
        errorMessages: string[];
    };
    (mode: 'folderChain', rawArray: Nullable<FileArray> | any): {
        sanitizedArray: FileArray;
        errorMessages: string[];
    };
    (mode: 'fileActions', rawArray: FileAction[] | any): {
        sanitizedArray: FileAction[];
        errorMessages: string[];
    };
}
export declare const sanitizeInputArray: SanitizeFiles;
export {};
