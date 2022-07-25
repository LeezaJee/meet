import React from "react";
import { shallow } from "enzyme";
import CitySearch from "../CitySearch";
import { mockData } from "../mock-data";
import { extractLocations } from "../api";


describe("<CitySearch /> component", () => {
  // checks whether an element with the class name city (textbox) exists within the CitySearchWrapper
  test("render text input", () => {
    const CitySearchWrapper = shallow(<CitySearch />);
    expect(CitySearchWrapper.find(".city")).toHaveLength(1);
  });

  // checks for the existence of an element with the class name suggestions (<li>)
  test("renders a list of suggestions", () => {
    const CitySearchWrapper = shallow(<CitySearch />);
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

});
