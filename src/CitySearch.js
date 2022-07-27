// City Search Component
// a textbox the user can use to search for a city, that brings up a list of suggested events based on that city

import React, { Component } from "react";

class CitySearch extends Component {
  state = {
    query: "",
    suggestions: [],
    showSuggestions: undefined,
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

  // making sure to pass the clicked suggestion to the passed updateEvents prop
  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion,
    });

    this.props.updateEvents(suggestion);
  };

  render() {
    return (
      <div className="CitySearch">
        <input
          type="text"
          className="city"
          value={this.state.query}
          onChange={this.handleInputChanged}
          onFocus={() => {
            this.setState({ showSuggestions: true });
          }}
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
          <li onClick={() => this.handleItemClicked("all")}>
            <b>See all cities</b>
          </li>
        </ul>
      </div>
    );
  }
}

export default CitySearch;
