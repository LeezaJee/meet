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
describe("<App /> component", () => {
  let AppWrapper;
  // any code within a beforeAll() function will be executed before each and every one of the tests
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });

  // TEST 1
  // checks if an EventList component exists in <App/>
  test("render list of events", () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  // TEST 2
  // checks if an CitySearch component exists in <App/>
  test("render CitySearch component", () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  // TEST 3
  test("render number of events", () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
});
