import React from'react';
import {connect } from 'react-redux'
import FilterByAttribute from '../../components/FilterByAttribute/FilterByAttribute'
import { setCheckboxFilter, removeCheckboxFilter} from './action'
import {getFilterLIst} from './selector'

class Filters extends React.PureComponent {
  constructor(props){
    super(props)
    this.state={
    }
  }
  render(){
    return <FilterByAttribute  {...this.props}/>
  }
    
  
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setCheckbox: (data)=>{
      dispatch(setCheckboxFilter(data))
    },
    removeCheckbox:(data) =>(
      dispatch(removeCheckboxFilter(data))
    )
  }
}
const mapStateToProps = state => {
  return {
    filterList : getFilterLIst(state)
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Filters)

 