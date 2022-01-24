import { Nullable } from 'tsdef';
import { ChonkyIconName } from '../types/icons.types';
export declare const useFileActionTrigger: (fileActionId: string) => () => import("../types/redux.types").ChonkyThunk<void>;
export declare const useFileActionProps: (fileActionId: string) => {
    icon: Nullable<ChonkyIconName | string>;
    active: boolean;
    disabled: boolean;
};
