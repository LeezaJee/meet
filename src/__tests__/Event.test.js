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

  // TEST 3
  test("default details window closed", () => {
    expect(EventWrapper.state("buttonCollapsed")).toBe(true);
  });

  // TEST 4
  test("render event description", () => {
    EventWrapper.setState({ buttonCollapsed: false });
    expect(EventWrapper.find(".description")).toHaveLength(1);
  });

  // TEST 5
  test("render event creator", () => {
    EventWrapper.setState({ buttonCollapsed: false });
    expect(EventWrapper.find(".creator")).toHaveLength(1);
  });

  // TEST 6
  test("render event location", () => {
    expect(EventWrapper.find(".location")).toHaveLength(1);
  });

  // TEST 7
  test("render event start", () => {
    EventWrapper.setState({ buttonCollapsed: false });
    expect(EventWrapper.find(".start")).toHaveLength(1);
  });

  // TEST 8
  test("render event end", () => {
    EventWrapper.setState({ buttonCollapsed: false });
    expect(EventWrapper.find(".end")).toHaveLength(1);
  });

  // TEST 9
  test("render button for details", () => {
    expect(EventWrapper.find(".btn-details")).toHaveLength(1);
  });

  // TEST 10
  test("show list of event details when expanded", () => {
    EventWrapper.setState({ buttonCollapsed: true });
    EventWrapper.find(".btn-details").simulate("click");
    expect(EventWrapper.state("buttonCollapsed")).toBe(false);
  });

