import { LOAD_SEARCH_ITEMS,SET_SEARCH_TERM } from "./constants";
export function setSearchTerm(searchTerm) {
    return { type: SET_SEARCH_TERM, payload: searchTerm };
  }
  
  export function addAPIData(data) {
    return { type: LOAD_SEARCH_ITEMS, payload: data };
  }
  
