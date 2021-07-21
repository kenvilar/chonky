import { Nullable } from 'tsdef';
import { FileData } from './file.types';
export declare type FileSortKeySelector = (file: Nullable<FileData>) => any;
export declare enum SortOrder {
    ASC = "asc",
    DESC = "desc"
}
