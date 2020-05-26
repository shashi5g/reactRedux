import { LOAD_CHRACTER_LIST,SORT_BY_PRICE } from "./constants";
 const initialState={
    info : {
        "count": 0,
        "pages": 0,
        "next": "",
        "prev": ""
    },
     results:[
         {}
     ]
 }
const  characterList =(state = initialState, action)=> {
    switch (action.type) {
        case LOAD_CHRACTER_LIST:
            debugger
          return Object.assign({}, state, action.payload)
        case  SORT_BY_PRICE:
             //sort by price
             debugger
             return Object.assign({}, state, action.payload)

        default:
          return state
      }

  }

export default characterList
