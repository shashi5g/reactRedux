import React from'react';
import {connect } from 'react-redux'
import axios from 'axios';
import {loadCharacterList} from '../CharacterList/action'
import {getCharacter,getFilterLIst} from '../CharacterList/selector'
import CharactersListComp from '../../components/CharactersListComp'
import Filters from '../Filters/Filters'
import {removeCheckboxFilter} from '../Filters/action'
import SelectedFilter from '../../components/SelectedFilter/SelectedFilter'
// import icons from 'glyphicons'

class Search extends React.PureComponent {
  constructor(props){
    super(props)
    this.state={
    }
  }
 componentDidMount(){
  const url =`https://rickandmortyapi.com/api/character/`;
  const modifyUrl = this.props.props.selectedShow ? `${url}?name=${this.props.props.selectedShow}`:url;

    axios.get(modifyUrl).then(response => {
       this.props.sendData(response.data)
      }).catch(error => {
        console.error('axios error', error); // eslint-disable-line no-console
      });
 
 
  
 }

  render(){
    return <div className='plp'>
    <div className="left"><Filters/></div>
      <div className="right">  
       <SelectedFilter filterData= {this.props.filters ?this.props.filters.filterList:[]} removeFiterItem={this.props.removeFiterItem}/>
      <CharactersListComp  {...this.props}/>
    </div>
</div>
  }
    
  
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    sendData(data) {
      dispatch(loadCharacterList(data))
    },
   
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


export default connect(mapStateToProps,mapDispatchToProps)(Search)

 