import React from "react";
import { shallow } from "enzyme";
import Event from "../Event";
import { mockData } from "../mock-data";

describe("<Event /> component", () => {
  let EventWrapper;
  beforeAll(() => {
    EventWrapper = shallow(<Event event={mockData[0]} />);
  });

  // TEST 1
  test("render event", () => {
    expect(EventWrapper.find(".event-visible")).toHaveLength(1);
  });

  // TEST 2
  test("render event summary", () => {
    expect(EventWrapper.find(".summary")).toHaveLength(1);
  });

