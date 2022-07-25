import React from "react";
import { shallow } from "enzyme";
import CitySearch from "../CitySearch";
import { mockData } from "../mock-data";
import { extractLocations } from "../api";

describe("<CitySearch />", () => {
  beforeAll(() => {
    CitySearchWrapper = shallow(<CitySearch locations={locations} />);
  });

  // checks whether an element with the class name city (textbox) exists within the CitySearchWrapper
  test("render text input", () => {
    expect(CitySearchWrapper.find(".city")).toHaveLength(1);
  });

  // checks for the existence of an element with the class name suggestions (<li>)
  test("render a list of suggestions", () => {
    expect(CitySearchWrapper.find(".suggestions")).toHaveLength(1);
  });

  test("render text input correctly", () => {
    // setting const to the query from the CitySearch state (what the user types into the textbox)
    const query = CitySearchWrapper.state("query");
    // compares the value prop of each element that has the class "city" found within the CitySearch component
    // (which is the input field you added in the CitySearch component)
    // and checks if the input field's value prop is equal to what’s in the CitySearch query state
    expect(CitySearchWrapper.find(".city").prop("value")).toBe(query);
  });

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

  // checks whether the value of query’s state changes when the user clicks on a suggestion
  test("selecting a suggestion should change query state", () => {
    CitySearchWrapper.setState({
      query: "Berlin",
    });
    const suggestions = CitySearchWrapper.state("suggestions");
    CitySearchWrapper.find(".suggestions li").at(0).simulate("click");
    expect(CitySearchWrapper.state("query")).toBe(suggestions[0]);
  });
});
