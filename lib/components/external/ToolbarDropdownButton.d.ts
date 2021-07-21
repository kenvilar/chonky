/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */
import React from 'react';
import { Nullable } from 'tsdef';
import { ChonkyIconName } from '../../types/icons.types';
export interface ToolbarDropdownButtonProps {
    text: string;
    active?: boolean;
    icon?: Nullable<ChonkyIconName | string>;
    onClick?: () => void;
    disabled?: boolean;
}
export declare const ToolbarDropdownButton: React.ForwardRefExoticComponent<ToolbarDropdownButtonProps & React.RefAttributes<HTMLLIElement>>;
export interface SmartToolbarDropdownButtonProps {
    fileActionId: string;
    onClickFollowUp?: () => void;
}
export declare const SmartToolbarDropdownButton: React.ForwardRefExoticComponent<SmartToolbarDropdownButtonProps & React.RefAttributes<HTMLLIElement>>;
