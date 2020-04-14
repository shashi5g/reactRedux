import { LOAD_CHRACTER_LIST,SORT_BY_PRICE } from "./constants";
export const  loadCharacterList = (payload) =>{
    return {
    type:LOAD_CHRACTER_LIST,
    payload
    }
}

export const sortedById = (payload) =>{
        return {
        type:SORT_BY_PRICE,
        payload
        }
}