import React from "react";
import { shallow } from "enzyme";
import CitySearch from "../CitySearch";
import { mockData } from "../mock-data";
import { extractLocations } from "../api";

describe("<CitySearch />", () => {
  // added superset of all locations as variable and passed it to the shallow CitySearch component
  let locations, CitySearchWrapper;
  // CitySearchWrapper is defined only once for all tests in beforeAll() function
  beforeAll(() => {
    locations = extractLocations(mockData);
    CitySearchWrapper = shallow(
      <CitySearch locations={locations} updateEvents={() => {}} />
    );
  });

  // TEST 1
  // checks whether an element with the class name city (textbox) exists within the CitySearchWrapper
  test("render text input", () => {
    expect(CitySearchWrapper.find(".city")).toHaveLength(1);
  });

  // TEST 2
  // checks for the existence of an element with the class name suggestions (<li>)
  test("render a list of suggestions", () => {
    expect(CitySearchWrapper.find(".suggestions")).toHaveLength(1);
  });

  // TEST 3
  // checks if the input field's value prop is equal to what’s in the CitySearch query state
  test("renders text input correctly", () => {
    // setting const to the query from the CitySearch state (what the user types into the textbox)
    const query = CitySearchWrapper.state("query");
    // compares the value prop of each element that has the class "city" found within the CitySearch component
    // (which is the input field you added in the CitySearch component)
    // and checks if the input field's value prop is equal to what’s in the CitySearch query state
    expect(CitySearchWrapper.find(".city").prop("value")).toBe(query);
  });

  // TEST 4
  // checks if a user is able to type in a query and if state updates automatically to reflect this
  test("change state when text input changes", () => {
    // query state has been set to Munich
    CitySearchWrapper.setState({
      query: "Munich",
    });
    // telling object to change its value to Berlin once the change event is called
    const eventObject = { target: { value: "Berlin" } };
    // simulate() function is being run on the city element found within CitySearch component
    // simulates a change on the city — changing it into the target value: 'Berlin'
    CitySearchWrapper.find(".city").simulate("change", eventObject);
    // value of query is compared with the string 'Berlin'
    expect(CitySearchWrapper.state("query")).toBe("Berlin");
  });

  // TEST 5
  // verifies that the list of suggestions rendered matches the list of suggestions in the component state
  test("render list of suggestions correctly", () => {
    // contains the set of distinct locations from the mockData events list
    const locations = extractLocations(mockData);
    // sets the suggestions state to the full list of mock locations
    CitySearchWrapper.setState({ suggestions: locations });
    // then compares the number of rendered suggestions to the number of suggestions in the state of CitySearch
    const suggestions = CitySearchWrapper.state("suggestions");
    expect(CitySearchWrapper.find(".suggestions li")).toHaveLength(
      suggestions.length + 1
    );
    // loops through all the suggestions and compares the items in suggestions one by one
    for (let i = 0; i < suggestions.length; i += 1) {
      expect(CitySearchWrapper.find(".suggestions li").at(i).text()).toBe(
        suggestions[i]
      );
    }
  });

  // TEST 6
  // checks if state of suggestions only has cities that match the locations
  // after filtering the locations prop against what’s in the state of query
  test("suggestion list match the query when changed", () => {
    // states for both query and suggestions have been emptied
    CitySearchWrapper.setState({ query: "", suggestions: [] });
    // changing the value of query to “Berlin” through a simulated change event on the .city input field
    CitySearchWrapper.find(".city").simulate("change", {
      target: { value: "Berlin" },
    });
    const query = CitySearchWrapper.state("query");
    const filteredLocations = locations.filter((location) => {
      return location.toUpperCase().indexOf(query.toUpperCase()) > -1;
    });
    expect(CitySearchWrapper.state("suggestions")).toEqual(filteredLocations);
  });

  // TEST 7
  // checks whether the value of query’s state changes when the user clicks on a suggestion
  test("selecting a suggestion should change query state", () => {
    CitySearchWrapper.find(".city").simulate("focus");
    expect(CitySearchWrapper.state("showSuggestions")).toBe(true);
    expect(CitySearchWrapper.find(".suggestions").prop("style")).not.toEqual({
      display: "none",
    });
  });

  // TEST 8
  test("selecting CitySearch input reveals the suggestions list", () => {
    CitySearchWrapper.find(".city").simulate("focus");
    expect(CitySearchWrapper.state("showSuggestions")).toBe(true);
    expect(CitySearchWrapper.find(".suggestions").prop("style")).not.toEqual({
      display: "none",
    });
  });

  // TEST 9
  // test for hiding the suggestions list whenever one of its items is clicked
  test("selecting a suggestion should hide the suggestions list", () => {
    CitySearchWrapper.setState({
      query: "Berlin",
      showSuggestions: undefined,
    });
    CitySearchWrapper.find(".suggestions li").at(0).simulate("click");
    expect(CitySearchWrapper.state("showSuggestions")).toBe(false);
    expect(CitySearchWrapper.find(".suggestions").prop("style")).toEqual({
      display: "none",
    });
  });
});
