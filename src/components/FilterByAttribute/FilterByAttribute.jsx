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
  
  renderFilter(filtertype){

    return <div className={filtertype[0].type.toLowerCase()} key={Math.random()}>
        <h3>{filtertype[0].type}</h3>
       {filtertype.length &&  filtertype.map((item, i) => {
       return <label htmlFor={item.name}>
                  <input type="checkbox" name={item.name} id={item.name} value={item.name} checked={item.isChecked} onChange={(e) => this.handleFilterBrand(e)} />
                  {item.label}</label>})}
       </div>

  }

  render() {
  const  {filterList} = this.state;
  const species = filterList && filterList.filter((item)=>{
    return item && item.type==='Species'
  })
  const gender = filterList && filterList.filter((item)=>{
    return item && item.type==='Gender'
  })
  const origin = filterList && filterList.filter((item)=>{
    return item && item.type==='Origin'
  })

    return (
      <React.Fragment>
       <h2>{"Filter"}</h2>
       {species.length > 0 && this.renderFilter(species)}
       {gender.length > 0 && this.renderFilter(gender)}
       {origin.length > 0 && this.renderFilter(origin)}
      </React.Fragment>
     ) 
  }
}
export default withRouter(FilterByAttribute);
