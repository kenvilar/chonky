import { Nullable } from 'tsdef';
import { FileArray } from '../../types/file.types';
import { ChonkyThunk } from '../../types/redux.types';
export declare const thunkUpdateRawFolderChain: (rawFolderChain: Nullable<FileArray> | any) => ChonkyThunk;
export declare const thunkUpdateRawFiles: (rawFiles: FileArray | any) => ChonkyThunk;
export declare const thunkSortFiles: () => ChonkyThunk;
export declare const thunkUpdateHiddenFiles: () => ChonkyThunk;
export declare const thunkUpdateDisplayFiles: () => ChonkyThunk;
export declare const thunkUpdateSearchString: (searchString: string) => ChonkyThunk;
