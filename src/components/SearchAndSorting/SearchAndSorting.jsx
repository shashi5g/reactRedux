import React from "react";
import { withRouter } from "react-router";
import './style.css';
class SearchAndSorting extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sortingOption: [],
      searchValue: "",
      selectedValue: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.filterByInput = this.filterByInput.bind(this);
  }

  componentDidMount() {
    this.setState({
      sortingOption: [
        { id: "", name: "Sort By Id" },
        { id: "ascending", name: "Ascending" },
        { id: "descending", name: "Descending" },
      ],
    });
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value,
    });
    if (name === "sorting") {
      this.setState({ selectedValue: event.target.value });
      this.props.sortingBy(event.target.value);
    }
    if (name === "search") {

      
      this.setState({ searchValue: event.target.value });

    
    }
  }
  filterByInput(event) {
    // console.log("this.state.searchValue",this.state.searchValue)
    event.preventDefault();
    const { searchValue } = this.state;
    this.props.history.push(`/search/${searchValue}`);
  }

  render() {
    const { sortingOption } = this.state;

    let sortingOptList =
      sortingOption.length > 0 &&
      sortingOption.map((item, i) => {
        return (
          <option key={i} value={item.id}>
            {item.name}
          </option>
        );
      }, this);

    return (
    
        <div className="search-sort">
          
          <form onSubmit={this.filterByInput}>
            <div>
              <label>Search By Name </label>
              <input
                type="text"
                name="search"
                value={this.state.value}
                onChange={this.handleChange}
              />
            
            <button type="submit">Search</button>
            </div>
          </form>
       
        <select
          value={this.state.value}
          name="sorting"
          onChange={this.handleChange}
        >
          {sortingOptList}
        </select>
        </div>
    );
  }
}

export default withRouter(SearchAndSorting);
