import { Nilable } from 'tsdef';
import { FileAction } from '../../types/action.types';
import { ChonkyThunk } from '../../types/redux.types';
export declare const thunkUpdateRawFileActions: (rawFileActions: FileAction[] | any, disableDefaultFileActions: Nilable<boolean | string[]>) => ChonkyThunk;
export declare const thunkUpdateToolbarNContextMenuItems: (fileActions: FileAction[]) => ChonkyThunk;
export declare const thunkUpdateDefaultFileViewActionId: (fileActionId: Nilable<string>) => ChonkyThunk;
export declare const thunkActivateSortAction: (fileActionId: Nilable<string>) => ChonkyThunk;
export declare const thunkToggleOption: (optionId: string) => ChonkyThunk;
export declare const thunkApplySelectionTransform: (action: FileAction) => ChonkyThunk;
