/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */
import React from 'react';
import { FileViewConfigGrid } from '../../types/file-view.types';
export interface FileListGridProps {
    width: number;
    height: number;
}
interface GridConfig {
    rowCount: number;
    columnCount: number;
    gutter: number;
    rowHeight: number;
    columnWidth: number;
}
export declare const isMobileDevice: () => boolean;
export declare const getGridConfig: (width: number, fileCount: number, viewConfig: FileViewConfigGrid, isMobileBreakpoint: boolean) => GridConfig;
export declare const GridContainer: React.FC<FileListGridProps>;
export {};
