/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */
import React from 'react';
import { Nullable } from 'tsdef';
import { FileData } from '../../types/file.types';
export interface FileEntryNameProps {
    file: Nullable<FileData>;
    className?: string;
}
export declare const FileEntryName: React.FC<FileEntryNameProps>;
