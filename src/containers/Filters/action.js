import {SET_TEXT_FILTER,SET_FILTER_LIST,SET_CHECKBOX_FILTER,REMOVE_CHECKBOX_FILTER,CLEAR_FILTERS} from './constants'  
export const setTextFilter = (data) => ({
  type: SET_TEXT_FILTER,
  data
})

export const setCheckboxFilter = (name) => ({
  type: SET_CHECKBOX_FILTER,
  name
})

export const removeCheckboxFilter = (name) => ({
  type: REMOVE_CHECKBOX_FILTER,
  name
})

export const updateFilterList = (data) => ({
  type: SET_FILTER_LIST,
  data
})

export const clearFilters = () => ({
  type: CLEAR_FILTERS
})