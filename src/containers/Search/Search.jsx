import React from'react';
import {connect } from 'react-redux'
import axios from 'axios';
import {loadCharacterList} from '../CharacterList/action'
import {getCharacter,getFilterLIst} from '../CharacterList/selector'
import Layout from '../common/Layout';
import {removeCheckboxFilter} from '../Filters/action'
// import icons from 'glyphicons'

class Search extends React.PureComponent {
  constructor(props){
    super(props)
    this.state={

    }

    this.renderData = this.renderData.bind(this)
  }
 componentDidMount(){
  this.renderData()
 }
 componentWillReceiveProps(nextProps){
   const {selectedShow} =  nextProps.props;
   if(this.props.props.selectedShow!==selectedShow){
     
    this.renderData(selectedShow)
  }

 }

renderData(selectedShow){
    const url =`https://rickandmortyapi.com/api/character/`;
    const modifyUrl = selectedShow ? `${url}?name=${selectedShow}`:`${url}?name=${this.props.props.selectedShow}`;
  
      axios.get(modifyUrl).then(response => {
         this.props.sendData(response.data)
        }).catch(error => {
          const initialState={
            info : {},
            results:[]
         }
          this.props.sendData(initialState)
          console.error('axios error', error); // eslint-disable-line no-console
        });
  }

  render(){
    return <Layout  {...this.props}/>
  }
    
  
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    sendData(data) {
      dispatch(loadCharacterList(data))
    },
   
    loadList: (data) => {
        dispatch(loadCharacterList(data))
    }
    ,
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

 