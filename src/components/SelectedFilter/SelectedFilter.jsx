import React from "react";
import './style.css';
class SelectedFilter extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      filterData: [],
    };
    this.removeFilter = this.removeFilter.bind(this);

  }
  componentWillReceiveProps(nextProps){
   
      this.setState((state, props) => ({
        filterData: props.filterData
      }));
   
    
  }
  removeFilter(event) {

    const target = event.target;
    const parentNode = target.parentNode;
     const remove =   parentNode.children[0].innerText;
     const {filterData} = this.props;
     const filterList =  filterData.filter((item)=>{ 
      if(item && item.name===remove){
        item.isChecked= false;
        return item
      }
     return ''
    
    } )
     this.props.removeFiterItem(filterList)
  }


  render() {
    const { filterData } = this.state;
    return (<React.Fragment>
    
      {filterData && filterData.length ? <div className="selected-list">
         {<h2>{"Selected Filters"}</h2> } 
           <ul>  
        {
          filterData.map((item)=>{
            return item && item.isChecked && <li className='selectedItem' key={item.name}>
                       <div className="">
                         <span>{item.name}</span>
                         <button onClick={(e) => this.removeFilter(e)}>X</button>
                       </div>
                   </li>
          })
        }
      </ul> 
      </div>:''
  }
      </React.Fragment>
    );
  }
}

export default SelectedFilter;
