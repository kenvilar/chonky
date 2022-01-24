import { Nullable } from 'tsdef';
import { DndEntryState } from '../types/file-list.types';
import { FileData } from '../types/file.types';
export declare const useFileDrag: (file: Nullable<FileData>) => {
    dndIsDragging: any;
    drag: import("react-dnd").ConnectDragSource;
};
interface UseFileDropParams {
    file: Nullable<FileData>;
    forceDisableDrop?: boolean;
    includeChildrenDrops?: boolean;
}
export declare const useFileDrop: ({ file, forceDisableDrop, includeChildrenDrops, }: UseFileDropParams) => {
    dndIsOver: any;
    dndIsOverCurrent: any;
    dndCanDrop: any;
    drop: import("react-dnd").ConnectDropTarget;
};
export declare const useFileEntryDnD: (file: Nullable<FileData>) => {
    drop: import("react-dnd").ConnectDropTarget;
    drag: import("react-dnd").ConnectDragSource;
    dndState: DndEntryState;
};
export declare const useDndHoverOpen: (file: Nullable<FileData>, dndState: DndEntryState) => void;
export {};
