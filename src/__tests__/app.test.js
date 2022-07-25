import React from "react";
import { shallow } from "enzyme";
import App from "../App";
import EventList from "../EventList";
import CitySearch from "../CitySearch";
import NumberOfEvents from "../NumberOfEvents";

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
