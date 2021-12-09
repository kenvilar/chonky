import { Nullable } from 'tsdef';
import { DndEntryState } from '../types/file-list.types';
import { FileData } from '../types/file.types';
export declare const useFileDrag: (file: Nullable<FileData>) => {
    dndIsDragging: any;
    drag: import("react-dnd").DragElementWrapper<import("react-dnd").DragSourceOptions>;
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
    drop: import("react-dnd").DragElementWrapper<any>;
};
export declare const useFileEntryDnD: (file: Nullable<FileData>) => {
    drop: import("react-dnd").DragElementWrapper<any>;
    drag: import("react-dnd").DragElementWrapper<import("react-dnd").DragSourceOptions>;
    dndState: DndEntryState;
};
export declare const useDndHoverOpen: (file: Nullable<FileData>, dndState: DndEntryState) => void;
export {};
