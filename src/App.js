import React, { Component } from "react";
import "./App.css";
import EventList from "./EventList";
import EventGenre from "./EventGenre";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import { Container } from "react-bootstrap";
import { getEvents, extractLocations, checkToken, getAccessToken } from "./api";
import { OffLineAlert } from "./Alert";
import "./nprogress.css";
import WelcomeScreen from "./WelcomeScreen";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    locationSelected: "all",
    showWelcomeScreen: undefined,
  };

  // loads events when the app loads
  // makes the API call and saves the initial data to state
  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem("access_token");
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
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
  }

  // to avoid the component being mounted, tested, and unmounted before the getEvents API call inside componentDidMount() has finished
  // update the state only if this.mounted is true
  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location, maxNumberEvents) => {
    if (maxNumberEvents === undefined) {
      maxNumberEvents = this.state.numberOfEvents;
    } else {
      this.setState({ numberOfEvents: maxNumberEvents });
    }
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

  updateNumberEvents = (numberOfEvents) => {
    this.setState({
      numberOfEvents,
    });
    this.updateEvents(undefined, numberOfEvents);
  };

  // counts how many events each city has
  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter(
        (event) => event.location === location
      ).length;
      const city = location.split(", ").shift();
      return { city, number };
    });
    return data;
  };

  render() {
    if (this.state.showWelcomeScreen === undefined)
      return <div className="App" />;

    if (this.state.showWelcomeScreen) {
      return (
        <WelcomeScreen
          getAccessToken={() => {
            getAccessToken();
          }}
        />
      );
    }

    return (
      // passing states to components as a prop
      <div className="App">
        <div className="offlineAlert">
          {!navigator.onLine && (
            <OffLineAlert
              text={
                "You are currently offline! The displayed events may not be up to date."
              }
            />
          )}
        </div>

        <h1 className="app-title">Welcome to the Meet App!</h1>
        <h4 className="app-subtitle">
          The next event is just around the corner.
        </h4>

        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <Container className="event-number">
          <NumberOfEvents
            numberOfEvents={this.state.numberOfEvents}
            updateEvents={this.updateEvents}
          />
        </Container>

        <div className="data-vis-wrapper">
          <EventGenre events={this.state.events} />

          <ResponsiveContainer height={400}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid />
              <XAxis type="category" dataKey="city" name="city" />
              <YAxis
                allowDecimals={false}
                type="number"
                dataKey="number"
                name="number of events"
              />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter data={this.getData()} fill="#ffc107" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
