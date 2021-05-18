import "./SearchBar.css";
import React from "react";

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
    };
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.hanldeKeyPress = this.hanldeKeyPress.bind(this);
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  // Handle button click event
  handleTermChange(event) {
    this.setState({ term: event.target.value });
  }

  // Handle Enter key press event
  hanldeKeyPress(event) {
    if (event.key === "Enter") {
      this.search();
    }
  }

  render() {
    return (
      <div className="SearchBar">
        <input
          placeholder="Enter A Song, Album, or Artist"
          onChange={this.handleTermChange}
          onKeyPress={this.hanldeKeyPress}
        />
        <button className="SearchButton" onClick={this.search}>
          {" "}
          SEARCH{" "}
        </button>
      </div>
    );
  }
}
