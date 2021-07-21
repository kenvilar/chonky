import { HTMLProps } from 'react';
import { Nullable } from 'tsdef';
import { DndEntryState } from '../../types/file-list.types';
import { FileData } from '../../types/file.types';
import { ChonkyIconName } from '../../types/icons.types';
import { KeyboardClickEvent, MouseClickEvent } from '../internal/ClickableWrapper';
import { FileEntryState } from './GridEntryPreview';
export declare const useFileEntryHtmlProps: (file: Nullable<FileData>) => HTMLProps<HTMLDivElement>;
export declare const useFileEntryState: (file: Nullable<FileData>, selected: boolean, focused: boolean) => FileEntryState;
export declare const useDndIcon: (dndState: DndEntryState) => ChonkyIconName.dndDragging | ChonkyIconName.dndCanDrop | ChonkyIconName.dndCannotDrop | null;
export declare const useModifierIconComponents: (file: Nullable<FileData>) => JSX.Element[];
export declare const useFileNameComponent: (file: Nullable<FileData>) => JSX.Element;
export declare const useThumbnailUrl: (file: Nullable<FileData>) => {
    thumbnailUrl: Nullable<string>;
    thumbnailLoading: boolean;
};
export declare const useFileClickHandlers: (file: Nullable<FileData>, displayIndex: number) => {
    onSingleClick: (event: MouseClickEvent) => void;
    onDoubleClick: (event: MouseClickEvent) => void;
    onKeyboardClick: (event: KeyboardClickEvent) => void;
};
