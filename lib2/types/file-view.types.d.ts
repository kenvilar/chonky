export declare enum FileViewMode {
    List = "list",
    Compact = "compact",
    Grid = "grid"
}
export declare type FileViewConfigList = {
    mode: FileViewMode.List;
    entryHeight: number;
};
export declare type FileViewConfigGrid = {
    mode: FileViewMode.Compact | FileViewMode.Grid;
    entryWidth: number;
    entryHeight: number;
};
export declare type FileViewConfig = FileViewConfigList | FileViewConfigGrid;
