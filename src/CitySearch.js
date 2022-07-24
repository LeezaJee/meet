// City Search Component
// a textbox the user can use to search for a city, that brings up a list of suggested events based on that city

import React, { Component } from "react";

class CitySearch extends Component {
  render() {
    return (
      <div className="CitySearch">
        <input type="text" className="city" />
        <ul className="suggestions"></ul>
      </div>
    );
  }
}

export default CitySearch;
