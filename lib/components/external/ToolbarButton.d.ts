/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */
import React from 'react';
import { Nullable } from 'tsdef';
import { ChonkyIconName } from '../../types/icons.types';
export interface ToolbarButtonProps {
    className?: string;
    text: string;
    tooltip?: string;
    active?: boolean;
    icon?: Nullable<ChonkyIconName | string>;
    iconOnly?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    dropdown?: boolean;
}
export declare const ToolbarButton: React.FC<ToolbarButtonProps>;
export interface SmartToolbarButtonProps {
    fileActionId: string;
}
export declare const SmartToolbarButton: React.FC<SmartToolbarButtonProps>;
