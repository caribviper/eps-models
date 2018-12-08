import { RegistryItem } from './../../entities/planning/registry-item';
export declare class ScoredRow {
    score: number;
    doc: RegistryItem;
    id: string;
    readonly registry: RegistryItem;
}
export declare class SearchFetchResults {
    q: string;
    fetch_duration: number;
    total_rows: number;
    limit: number;
    search_duration: number;
    skip: number;
    rows: ScoredRow[];
    bookmark: string;
    static initialise(results: SearchFetchResults): SearchFetchResults;
}
