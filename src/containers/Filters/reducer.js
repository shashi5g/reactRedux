import {SET_TEXT_FILTER,SET_CHECKBOX_FILTER,REMOVE_CHECKBOX_FILTER,CLEAR_FILTERS} from './constants'  
const checkboxes = 
  [
    

    {
      name: "human",
      key: "human",
      label: "Human",
      isChecked:true,
      type:'Species'
    },
    {
      name: "mythology",
      key: "mythology",
      label: "Mythology",
      isChecked:false,
      type:'Species'
    },
    {
      name: "otherspecies",
      key: "otherspecies",
      label: "Other Species",
      isChecked:false,
      type:'Species'
    },
  
    {
      name: "male",
      key: "male",
      label: "Male",
      isChecked:false,
      type:'Gender'
    },
    {
      name: "female",
      key: "female",
      label: "Female",
      isChecked:false,
      type:'Gender'
    },

  
    {
      name: "unknown",
      key: "unknown",
      label: "Unknown",
      isChecked:false,
      type:'Origin'
    },
    {
      name: "PostApoCalypticEarth",
      key: "PostApoCalypticEarth",
      label: "Post ApoCalyptic Earth",
      isChecked:false,
      type:'Origin'
    },
    {
      name: "Nuptia4",
      key: "Nuptia4",
      label: "Nuptia 4",
      isChecked:false,
      type:'Origin'
    },
    {
      name: "otherOrigins",
      key: "otherOrigins",
      label: "Other Origins",
      isChecked:false,
      type:'Origin'
    }
  ]
  

const filtersReducerDefaultState = {
  filterList:checkboxes,
  filterData: []
}

const filters = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case SET_TEXT_FILTER:
      return {
        ...state,
        name: action.name
      };
    case SET_CHECKBOX_FILTER:
      return {
        ...state,
        filterList: [...state.filterList, action.data],
       
      }
    case REMOVE_CHECKBOX_FILTER:
      return {
        ...state,
        filterList: [...state.filterList, action.data],
      }
    case CLEAR_FILTERS:
      return {
        ...state,
        filterData: []
      }
    default:
      return state
  }
}

export default filters;