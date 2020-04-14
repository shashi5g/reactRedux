import  {combineReducers} from "redux";

import characterList  from "./containers/CharacterList/reducer";
import search from "./containers/Search/reducer";
import filters from './containers/Filters/reducer'

const combinedReducer = combineReducers({characterList,search,filters})

export default  combinedReducer


