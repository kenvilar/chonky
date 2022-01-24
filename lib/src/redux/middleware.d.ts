import { FileMap } from '../types/file.types';
import { ChonkyThunkExtraArgument } from '../types/redux.types';
export declare class ThunkExtraArgument implements ChonkyThunkExtraArgument {
    constructor();
    private cachedCleanFileIds;
    private cachedSearcher;
    private cachedSearchString;
    private cachedSearchResult;
    getCachedSearch(cleanFileIds: string[], fileMap: FileMap, searchString: string): Set<string>;
}
