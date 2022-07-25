// City Search Component
// a textbox the user can use to search for a city, that brings up a list of suggested events based on that city

import React, { Component } from "react";

class CitySearch extends Component {
  state = {
    query: "",
    suggestions: [],
  };

  // changes the state of query upon changing the value of the input field
  // filters the state of suggestions and uses the result as the state’s new value
  handleInputChanged = (event) => {
    const value = event.target.value;
    // this.props.locations within the function because it'll be passed from the App component later
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });
    this.setState({
      query: value,
      suggestions,
    });
  };

  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion,
    });
  };

  render() {
    return (
      <div className="CitySearch">
        <input
          type="text"
          className="city"
          value={this.state.query}
          onChange={this.handleInputChanged}
        />
        <ul className="suggestions">
          {this.state.suggestions.map((suggestion) => (
            <li
              key={suggestion}
              onClick={() => this.handleItemClicked(suggestion)}
            >
              {suggestion}
            </li>
          ))}
          <li>
            <b>See all cities</b>
          </li>
        </ul>
      </div>
    );
  }
}

export default CitySearch;
