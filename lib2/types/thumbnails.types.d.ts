import { Nilable } from 'tsdef';
import { FileData } from './file.types';
export declare type ThumbnailGenerator = (file: FileData) => Nilable<string> | Promise<Nilable<string>>;
