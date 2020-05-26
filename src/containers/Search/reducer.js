
import { LOAD_SEARCH_ITEMS,SET_SEARCH_TERM } from "./constants";


const initialState={
    searchTerm:'',
    searchResult:[]
    
 }
const  search =(state = initialState, action)=> {
    switch (action.type) {
        case SET_SEARCH_TERM:
          debugger
          return Object.assign({}, state, action.payload)
        case  LOAD_SEARCH_ITEMS:
          debugger
             return Object.assign({}, state, action.payload)

        default:
          return state
      }

  }

export default search