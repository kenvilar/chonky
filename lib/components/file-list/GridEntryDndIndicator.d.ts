/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */
import React from 'react';
import { DndEntryState } from '../../types/file-list.types';
export interface DnDIndicatorProps {
    className: string;
    dndState: DndEntryState;
}
export declare const GridEntryDndIndicator: React.FC<DnDIndicatorProps>;
