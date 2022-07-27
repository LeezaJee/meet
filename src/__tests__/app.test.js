import React from "react";
import { shallow, mount } from "enzyme";
import App from "../App";
import EventList from "../EventList";
import CitySearch from "../CitySearch";
import NumberOfEvents from "../NumberOfEvents";
import { mockData } from "../mock-data";
import { extractLocations, getEvents } from "../api";

// ----------------- INTEGRATION TESTING SCOPE -----------------
describe("<App /> integration", () => {
  // INTEGRATION TEST 1
  // making sure that EventList gets events as a prop from App, where it will be defined in its state
  test('App passes "events" state as a prop to EventList', () => {
    // full rendering actually mounts the component in the DOM
    const AppWrapper = mount(<App />);
    // checking that the state isn't undefined is necessary
    // both the state of events and the props of events could both not exist and the test would still pass
    // (undefined does equal undefined)
    const AppEventsState = AppWrapper.state("events");
    expect(AppEventsState).not.toEqual(undefined);
    // compares the state of App’s events with EventList's events prop to ensure it’s been passed correctly
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
    // tests that use the same DOM will affect each other, so you need to “clean up” your DOM after each test
    AppWrapper.unmount();
  });

  // INTEGRATION TEST 2
  test('App passes "locations" state as a prop to CitySearch', () => {
    const AppWrapper = mount(<App />);
    const AppLocationsState = AppWrapper.state("locations");
    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(
      AppLocationsState
    );
    AppWrapper.unmount();
  });

  // INTEGRATION TEST 3
  // always add async to a test’s callback function if it contains async code.
  test("get list of events matching the city selected by the user", async () => {
    const AppWrapper = mount(<App />);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    // locations is extracted from the events in MockData component
    const locations = extractLocations(mockData);
    // CitySearch's suggestions state has been set to have all available cities
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state("suggestions");
    // holds the index of the selected suggestion from the suggestions array
    // evaluates to an integer value ranging from 0 to suggestion.length - 1
    // Math.random() used with Math.floor() can be used to return random integers
    const selectedIndex = Math.floor(Math.random() * suggestions.length);
    // once index is selected, it’s used to return the actual suggestion
    // and then stored in the selectedCity variable
    const selectedCity = suggestions[selectedIndex];
    // click is mimicked by calling the handleItemClicked() method from CitySearch
    // this is possible by calling instance() on the CitySearchWrapper
    // selected suggestion/city has been passed to it
    await CitySearchWrapper.instance().handleItemClicked(selectedCity);
    // await => it's expected that handleItemClicked() will have async code that involves fetching the full list of events
    // before filtering them down to the list of events that match the selected city
    // getEvents = new API function which is mainly expected to get all the events from the API asynchronously
    const allEvents = await getEvents();
    // ist of all events is filtered against the selected location/city in order to find the events that have the same location
    // stored in eventsToShow
    const eventsToShow = allEvents.filter(
      (event) => event.location === selectedCity
    );
    // test compares whether the state of events actually takes the same array as the events that resulted
    // from the filtering process in the previous step
    expect(AppWrapper.state("events")).toEqual(eventsToShow);
    AppWrapper.unmount();
  });

  // INTEGRATION TEST 4
  test('get list of all events when user selects "See all cities"', async () => {
    const AppWrapper = mount(<App />);
    const suggestionItems = AppWrapper.find(CitySearch).find(".suggestions li");
    // test simulates a click on the last list item (which will always be “See all cities”)
    await suggestionItems.at(suggestionItems.length - 1).simulate("click");
    const allEvents = await getEvents();
    // checks if the events state of the App component equals the list of all events
    expect(AppWrapper.state("events")).toEqual(allEvents);
    AppWrapper.unmount();
  });
});

// ----------------- UNIT TESTING SCOPE -----------------
describe("<App /> component", () => {
  let AppWrapper;
  // any code within a beforeAll() function will be executed before each and every one of the tests
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });

  // UNIT TEST 1
  // checks if an EventList component exists in <App/>
  test("render list of events", () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  // UNIT TEST 2
  // checks if an CitySearch component exists in <App/>
  test("render CitySearch component", () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  // UNIT TEST 3
  test("render number of events", () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
});
