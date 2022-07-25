// City Search Component
// a textbox the user can use to search for a city, that brings up a list of suggested events based on that city

import React, { Component } from "react";

class CitySearch extends Component {
  render() {
    return (
      <div className="CitySearch">
        <input
          type="text"
          className="city"
          value={this.state.query}
          onChange={this.handleInputChanged}
        />
      </div>
    );
  }
}

export default CitySearch;
