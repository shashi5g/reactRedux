import React from'react';
import {connect } from 'react-redux'
import {getCharacter,getFilterLIst} from './selector'
// import {getFilterLIst} from '../Filters/selector'
import {loadCharacterList} from './action'
import CharactersListComp from '../../components/CharactersListComp.jsx'
import Filters from '../Filters/Filters'
import {removeCheckboxFilter} from '../Filters/action'
import SelectedFilter from '../../components/SelectedFilter/SelectedFilter'

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

 