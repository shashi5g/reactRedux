import React from'react';
import './index.css'
import Filter from './Filter/Filter.jsx'
class CharactersListComp extends React.PureComponent {

    constructor(props){
      super(props)
      this.state={
        character:{
          results:[]
        }
      }
      this.sortingBy = this.sortingBy.bind(this)
      // this.filterByName = this.filterByName.bind(this)
    }

  componentWillReceiveProps(nextProps){
  if(this.props!==nextProps){
      const {character} = nextProps
      this.setState({character:character})
   
  }
  }
  sortingBy(value){
  
    if(value==='ascending'){
      this.sortByIdAsc()
    }
    else if(value==='descending'){
      this.sortByIdDsc()
    }
  }

sortByIdAsc=()=>{
    let sortedProductsAsc;
    sortedProductsAsc= this.props.character.results.sort((a,b)=>{
       return parseInt(a.id)  - parseInt(b.id);
    })
    console.log(sortedProductsAsc)
    this.props.loadList(sortedProductsAsc)
}

createdDate(date){
  const dateCreated = new Date(date);
  const dateNow = new Date();
   const  diffYear = dateNow.getFullYear() -dateCreated.getFullYear()
let createdDateString = ''
   if(diffYear>=0){
    createdDateString = `${diffYear} years ago`
   }
   else{
    createdDateString =`${diffYear} years later`
   }
   return createdDateString
  
}

sortByIdDsc=()=>{
  let sortedProductsAsc;
  sortedProductsAsc= this.props.character.results.sort((a,b)=>{
     return parseInt(b.id)  - parseInt(a.id);
  })
  this.props.loadList(sortedProductsAsc)

}

    render(){
       const {character} = this.state
        
       
        return <React.Fragment>
                <Filter sortingBy={this.sortingBy} filterByName={this.filterByName} loadList={this.props.loadList}/>
                <ul className='flex-wrapper tiles-list'>
   
                    {character.results.length>0 ? character.results.map((item, key) =>{
                    
                    return <li key={item.id}>
                        <div className='card'>
                        <img src={item.image} alt={item.name}/>
                        <div className='card-title'>
                            <h3 key={item.name+item.id}>{item.name}</h3>
                            <span>id {item.id}&#45;</span><span> created {this.createdDate(item.created)}</span>
                        </div>
                        </div>
                       
                        <ul className='card-desc'>
                            <li><span>status </span><span>{item.status}</span></li>
                            <li><span>species </span><span>{item.species}</span></li>
                            <li><span>gender</span><span>{item.gender}</span></li>
                            <li><span>rigin </span><span>{item.location && item.origin.name}</span></li>
                            <li><span>last location </span><span>{item.location && item.location.name}</span></li>
          
                        </ul>
                    </li>}):<h3>{'Not found any name with this keyword'}</h3>}
                </ul>
                </React.Fragment>
              
    }

 }

 export default  CharactersListComp