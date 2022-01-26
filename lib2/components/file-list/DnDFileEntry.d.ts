import React from 'react';
import { Nullable } from 'tsdef';
import { DndEntryState } from '../../types/file-list.types';
import { FileData } from '../../types/file.types';
export interface DnDFileEntryProps {
    file: Nullable<FileData>;
    children: (dndState: DndEntryState) => React.ReactElement;
}
export declare const DnDFileEntry: React.MemoExoticComponent<({ file, children }: DnDFileEntryProps) => JSX.Element>;
export declare const useStyles: (data?: unknown) => Record<"fillParent", string>;
