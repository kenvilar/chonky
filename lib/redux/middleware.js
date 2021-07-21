"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThunkExtraArgument = void 0;
var fuzzy_search_1 = __importDefault(require("fuzzy-search"));
var ThunkExtraArgument = /** @class */ (function () {
    function ThunkExtraArgument() {
        this.cachedCleanFileIds = null;
        this.cachedSearcher = null;
        this.cachedSearchString = '';
        this.cachedSearchResult = null;
        this.getCachedSearch = this.getCachedSearch.bind(this);
    }
    ThunkExtraArgument.prototype.getCachedSearch = function (cleanFileIds, fileMap, searchString) {
        var usingCachedSearcher;
        var searcher;
        if (this.cachedSearcher && this.cachedCleanFileIds === cleanFileIds) {
            usingCachedSearcher = true;
            searcher = this.cachedSearcher;
        }
        else {
            usingCachedSearcher = false;
            searcher = new fuzzy_search_1.default(cleanFileIds.map(function (id) { return fileMap[id]; }), ['name'], { caseSensitive: false });
            this.cachedCleanFileIds = cleanFileIds;
            this.cachedSearcher = searcher;
        }
        if (usingCachedSearcher &&
            this.cachedSearchResult &&
            this.cachedSearchString === searchString) {
            return this.cachedSearchResult;
        }
        else {
            var foundFiles = searcher.search(searchString);
            var foundFileIds_1 = new Set();
            foundFiles.map(function (f) { return foundFileIds_1.add(f.id); });
            this.cachedSearchString = searchString;
            this.cachedSearchResult = foundFileIds_1;
            return foundFileIds_1;
        }
    };
    return ThunkExtraArgument;
}());
exports.ThunkExtraArgument = ThunkExtraArgument;
