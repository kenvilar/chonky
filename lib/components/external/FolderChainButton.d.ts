/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */
import React from 'react';
import { FolderChainItem } from './FileNavbar-hooks';
export interface FolderChainButtonProps {
    first: boolean;
    current: boolean;
    item: FolderChainItem;
}
export declare const FolderChainButton: React.FC<FolderChainButtonProps>;
