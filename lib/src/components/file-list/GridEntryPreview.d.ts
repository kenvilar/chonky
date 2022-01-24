/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */
import React from 'react';
import { Nullable } from 'tsdef';
import { DndEntryState } from '../../types/file-list.types';
import { ChonkyIconName } from '../../types/icons.types';
export declare type FileEntryState = {
    childrenCount: Nullable<number>;
    color: string;
    icon: ChonkyIconName | string;
    thumbnailUrl: Nullable<string>;
    iconSpin: boolean;
    selected: boolean;
    focused: boolean;
};
export interface FileEntryPreviewProps {
    className?: string;
    entryState: FileEntryState;
    dndState: DndEntryState;
}
export declare const GridEntryPreviewFolder: React.FC<FileEntryPreviewProps>;
export declare const GridEntryPreviewFile: React.FC<FileEntryPreviewProps>;
export declare const useCommonEntryStyles: (data?: unknown) => import("jss").Classes<"selectionIndicator" | "focusIndicator">;
