import { Undefinable } from 'tsdef';
import { FileActionData } from '../../types/action-handler.types';
import { FileAction } from '../../types/action.types';
import { ChonkyDispatch, ChonkyThunk } from '../../types/redux.types';
/**
 * Thunk that dispatches actions to the external (user-provided) action handler.
 */
export declare const thunkDispatchFileAction: (data: FileActionData<FileAction>) => ChonkyThunk;
/**
 * Thunk that is used by internal components (and potentially the user) to "request"
 * actions. When action is requested, Chonky "prepares" the action data by extracting it
 * from Redux state. Once action data is ready, Chonky executes some side effect and/or
 * dispatches the action to the external action handler.
 */
export declare const thunkRequestFileAction: <Action extends FileAction>(action: Action, payload: Action["__payloadType"]) => ChonkyThunk;
export declare const triggerDispatchAfterEffect: <Action extends FileAction>(dispatch: ChonkyDispatch, data: FileActionData<Action>, effectResult: Undefinable<boolean>) => void;
