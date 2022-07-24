import React from "react";
import { shallow } from "enzyme";
import App from "../App";

describe("<App /> component", () => {
  test("render EventList component", () => {
    const AppWrapper = shallow(<App />);
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });
});
