import React from 'react';
import { Nullable } from 'tsdef';
import { FileViewMode } from '../../types/file-view.types';
export interface SmartFileEntryProps {
    fileId: Nullable<string>;
    displayIndex: number;
    fileViewMode: FileViewMode;
}
export declare const SmartFileEntry: React.FC<SmartFileEntryProps>;
