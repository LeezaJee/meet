import React, { Component } from "react";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import { getEvents, extractLocations } from "./api";
import { Container } from "react-bootstrap";
import "./App.css";
import "./nprogress.css";

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    locationSelected: "all",
  };

  // loads events when the app loads
  // makes the API call and saves the initial data to state
  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        let sliceNumber = this.state.numberOfEvents;
        this.setState({
          locations: extractLocations(events),
          events: events.slice(0, sliceNumber),
        });
      }
    });
  }

  // to avoid the component being mounted, tested, and unmounted before the getEvents API call inside componentDidMount() has finished
  // update the state only if this.mounted is true
  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location, maxNumberEvents) => {
    if (maxNumberEvents === undefined) {
      maxNumberEvents = this.state.numberOfEvents;
    } else this.setState({ numberOfEvents: maxNumberEvents });
    if (location === undefined) {
      location = this.state.locationSelected;
    }
    getEvents().then((events) => {
      let locationEvents =
        location === "all"
          ? events
          : events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents.slice(0, maxNumberEvents),
        numberOfEvents: maxNumberEvents,
        locationSelected: location,
      });
    });
  };

  render() {
    return (
      // passing states to components as a prop
      <div className="App">
        <h1 className="app-title">Welcome to Events for Friends!</h1>
        <h4 className="app-subtitle">
          The next event is just around your corner.
        </h4>

        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <Container className="event-number">
          <NumberOfEvents
            events={this.state.events}
            updateEvents={this.updateEvents}
          />
        </Container>
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
