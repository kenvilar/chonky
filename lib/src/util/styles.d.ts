import { Theme as MuiTheme } from '@material-ui/core/styles';
import { Styles } from 'jss';
import { DeepPartial } from 'tsdef';
export declare const lightTheme: {
    colors: {
        debugRed: string;
        debugBlue: string;
        debugGreen: string;
        debugPurple: string;
        debugYellow: string;
        textActive: string;
    };
    fontSizes: {
        rootPrimary: number;
    };
    margins: {
        rootLayoutMargin: number;
    };
    toolbar: {
        size: number;
        lineHeight: string;
        fontSize: number;
        buttonRadius: number;
    };
    dnd: {
        canDropColor: string;
        cannotDropColor: string;
        canDropMask: string;
        cannotDropMask: string;
        fileListCanDropMaskOne: string;
        fileListCanDropMaskTwo: string;
        fileListCannotDropMaskOne: string;
        fileListCannotDropMaskTwo: string;
    };
    dragLayer: {
        border: string;
        padding: string;
        borderRadius: number;
    };
    fileList: {
        desktopGridGutter: number;
        mobileGridGutter: number;
    };
    gridFileEntry: {
        childrenCountSize: string;
        iconColorFocused: string;
        iconSize: string;
        iconColor: string;
        borderRadius: number;
        fontSize: number;
        fileColorTint: string;
        folderBackColorTint: string;
        folderFrontColorTint: string;
    };
    listFileEntry: {
        propertyFontSize: number;
        iconFontSize: string;
        iconBorderRadius: number;
        fontSize: number;
    };
};
export declare type ChonkyTheme = typeof lightTheme;
export declare const darkThemeOverride: DeepPartial<ChonkyTheme>;
export declare const mobileThemeOverride: DeepPartial<ChonkyTheme>;
export declare const useIsMobileBreakpoint: () => boolean;
export declare const getStripeGradient: (colorOne: string, colorTwo: string) => string;
export declare const makeLocalChonkyStyles: <C extends string = string>(styles: (theme: ChonkyTheme & MuiTheme) => Styles<C>) => (data?: unknown) => import("jss").Classes<C>;
export declare const makeGlobalChonkyStyles: <C extends string = string>(makeStyles: (theme: ChonkyTheme & MuiTheme) => Styles<C>) => (...args: any[]) => import("jss").Classes<C>;
export declare const important: <T>(value: T) => (string | T)[];
export declare const c: import("classnames/types").ClassNamesExport;
