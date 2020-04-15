import React from'react';
import {connect } from 'react-redux'
import {getCharacter,getFilterLIst} from './selector'
import {loadCharacterList} from './action'
import {removeCheckboxFilter} from '../Filters/action'

import Layout from '../common/Layout';

// import icons from 'glyphicons'

class CharactersList extends React.PureComponent {
  constructor(props){
    super(props)
    this.state={
    }
  }

  componentDidMount() {
    fetch(`https://rickandmortyapi.com/api/character/`)
    .then(response => response.json())
    .then(data =>{
        this.props.loadList(data);      
    }
    )
    .catch(error => this.setState({ error, isLoading: false }));
}

  render(){
    return <Layout {...this.props} />
          
      }
    
  
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadList: (data) => {
        dispatch(loadCharacterList(data))
    },
    removeFiterItem:(data)=>{
      dispatch(removeCheckboxFilter(data))
    }
  }
}
const mapStateToProps = state => {
  return {
   character:getCharacter(state),
   filters:getFilterLIst(state)
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(CharactersList)

 