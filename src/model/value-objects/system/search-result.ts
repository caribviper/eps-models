import { RegistryItem } from './../../entities/planning/registry-item';


/**Implements a scored row result */
export class ScoredRow {
  score: number;
  doc: RegistryItem;
  id: string;

  /**Gets the registry item */
  get registry(): RegistryItem {
    if(!!this.doc)
      return RegistryItem.mapToEntity(this.doc);
    return null;
  }
}

/**Fetch results from a search */
export class SearchFetchResults {
  q: string;
  fetch_duration: number;
  total_rows: number;
  limit: number
  search_duration: number;
  skip: number;
  rows: ScoredRow[];

  /**
   * Apply new settings to the search results. Ensuring that it has all properties of the SearchFetchResults class
   * @param results Search results to be converted
   */
  public static initialise(results: SearchFetchResults) : SearchFetchResults {
    let s: SearchFetchResults = Object.assign(new SearchFetchResults(), results);
    for(let i=0; i<s.rows.length;i++){
      s.rows[i] = Object.assign(new ScoredRow(), s.rows[i]);
    }
    return s;
  }
}
