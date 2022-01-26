import React from 'react';
import { Nullable } from 'tsdef';
export declare const findClosestChonkyFileId: (element: HTMLElement | any) => Nullable<string>;
export declare const useContextMenuTrigger: () => (event: React.MouseEvent<HTMLDivElement>) => void;
export declare const useContextMenuDismisser: () => () => {
    payload: undefined;
    type: string;
};
