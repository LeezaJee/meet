import React, { Component } from "react";
import "./App.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import { getEvents, extractLocations } from "./api";

class App extends Component {
  state = {
    events: [],
    locations: [],
  };

  // loads events when the app loads
  // makes the API call and saves the initial data to state
  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

  render() {
    return (
      <div className="App">
        <EventList />
        <CitySearch />
        <NumberOfEvents />
      </div>
    );
  }
}

export default App;
