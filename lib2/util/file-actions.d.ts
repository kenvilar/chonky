import { Nullable } from 'tsdef';
import { ChonkyIconName } from '../types/icons.types';
export declare const useFileActionTrigger: (fileActionId: string) => () => import("redux-thunk").ThunkAction<void, import("../types/redux.types").RootState, import("../types/redux.types").ChonkyThunkExtraArgument, import("redux").Action<string>>;
export declare const useFileActionProps: (fileActionId: string) => {
    icon: Nullable<ChonkyIconName | string>;
    active: boolean;
    disabled: boolean;
};
