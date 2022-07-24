import React from "react";
import { shallow } from "enzyme";
import App from "../App";
import EventList from "../EventList";
import CitySearch from "../CitySearch";

describe("<App /> component", () => {
  let AppWrapper;
  // any code within a beforeAll() function will be executed before each and every one of the tests
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });

  // checks if an EventList component exists in <App/>
  test("render EventList component", () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });
});
