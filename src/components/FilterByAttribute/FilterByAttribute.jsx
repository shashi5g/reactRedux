import React from "react";
import { withRouter } from "react-router";
import "./style.css";
class FilterByAttribute extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      filterList:[]
    };
    this.handleFilterBrand = this.handleFilterBrand.bind(this);
  }
  componentDidMount(){
    this.setState((state, props) => ({
      filterList: props.filterList
    }));
  }

  handleFilterBrand(e) {
    const name = e.target.name;
    const isChecked = e.target.checked;
    this.setState({
      [name]: isChecked,
    });
    const{filterList} = this.props
    const filterListCont = filterList && filterList.filter((item)=>{ 
      if(item && item.name===name){
        item.isChecked=e.target.checked;
      }
     return item
    } 
    )
    if(e.target.checked){
      this.props.setCheckbox(filterListCont)
    }
    else{
      this.props.removeCheckbox(filterList)
    } 
  }

  render() {
  const  {filterList} = this.state;
  const species = filterList && filterList.filter((item)=>{
    return item.type==='Species'
  })
  const gender = filterList && filterList.filter((item)=>{
    return item.type==='Gender'
  })
  const origin = filterList && filterList.filter((item)=>{
    return item.type==='Origin'
  })

    return (
      <React.Fragment>
       <h2>{"Filter"}</h2>
       {species.length && <div className='species' key={Math.random()}>
        <h3>{species[0].type}</h3>
       {species.length &&  species.map((item, i) => {
       return <label htmlFor={item.name}>
                  <input type="checkbox" name={item.name} id={item.name} value={item.name} checked={item.isChecked} onChange={(e) => this.handleFilterBrand(e)} />
                  {item.label}</label>
           
        
                  
      })}
      </div>}

      {gender.length && <div className='species' key={Math.random()}>
        <h3>{gender[0].type}</h3>
       {gender.length &&  gender.map((item, i) => {
       return <label htmlFor={item.name}>
                  <input type="checkbox" name={item.name} id={item.name} value={item.name} checked={item.isChecked} onChange={(e) => this.handleFilterBrand(e)} />
                  {item.label}</label>
           
        
                  
      })}
      </div>}

      {origin.length && <div className='species' key={Math.random()}>
        <h3>{origin[0].type}</h3>
       {origin.length &&  origin.map((item, i) => {
       return <label htmlFor={item.name}>
                  <input type="checkbox" name={item.name} id={item.name} value={item.name} checked={item.isChecked} onChange={(e) => this.handleFilterBrand(e)} />
                  {item.label}</label>
           
        
                  
      })}
      </div>}

      </React.Fragment>
     ) 
  }
}
export default withRouter(FilterByAttribute);
