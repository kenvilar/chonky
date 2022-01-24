import { Nullable } from 'tsdef';
import { FileData } from '../types/file.types';
export declare class FileHelper {
    static isDirectory(file: Nullable<FileData>): file is FileData;
    static isHidden(file: Nullable<FileData>): file is FileData;
    static isSymlink(file: Nullable<FileData>): file is FileData;
    static isEncrypted(file: Nullable<FileData>): file is FileData;
    static isClickable(file: Nullable<FileData>): file is FileData;
    static isOpenable(file: Nullable<FileData>): file is FileData;
    static isSelectable(file: Nullable<FileData>): file is FileData;
    static isDraggable(file: Nullable<FileData>): file is FileData;
    static isDroppable(file: Nullable<FileData>): file is FileData;
    static isDndOpenable(file: Nullable<FileData>): file is FileData;
    static getModDate(file: Nullable<FileData>): Nullable<Date>;
    static parseDate(maybeDate: Date | string | any): Nullable<Date>;
    static getChildrenCount(file: Nullable<FileData>): Nullable<number>;
}
