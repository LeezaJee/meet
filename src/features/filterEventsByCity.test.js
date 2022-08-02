import { loadFeature, defineFeature } from "jest-cucumber";
import { mount, shallow } from "enzyme";
import React from "react";
import App from "../App";
import { mockData } from "../mock-data";
import CitySearch from "../CitySearch";
import { extractLocations } from "../api";

const feature = loadFeature("./src/features/filterEventsByCity.feature");

// defineFeature(feature, (test) => {});
// your first step should always be to run the test with an empty function body (npm run test)
// Cucumber will run the test, notice the missing code, then provide that code for you based on the format of your Gherkin file

defineFeature(feature, (test) => {
  <></>;
  // SCENARIO 1
  test("When user hasn’t searched for a city, show upcoming events from all cities.", ({
    given,
    when,
    then,
  }) => {
    given("user hasn’t searched for any city", () => {});

    // AppWrapper is defined outside of the when function because you’ll need to use AppWrapper in more than just the when step
    // variables defined within functions aren’t available outside those functions
    let AppWrapper;
    when("the user opens the app", () => {
      // shallow rendering isn’t enough in this instance as you need App’s children to be rendered for the next step in the test to work
      AppWrapper = mount(<App />);
    });

    then("the user should see the list of upcoming events.", () => {
      // the act of getting the list of events is an asynchronous action, so the first thing you need to do is update the App component
      // without this, none of the changes will be displayed on the App component
      AppWrapper.update();
      expect(AppWrapper.find(".event-visible")).toHaveLength(mockData.length);
    });
  });

  // SCENARIO 2
  test("User should see a list of suggestions when they search for a city", ({
    given,
    when,
    then,
  }) => {
    let CitySearchWrapper;
    given("the main page is open", () => {
      const locations = extractLocations(mockData);
      // you can use shallow() instead of mount() now because you don’t need to render any of CitySearch’s children
      CitySearchWrapper = shallow(
        <CitySearch updateEvents={() => {}} locations={locations} />
      );
    });

    when("the user starts typing in the city textbox", () => {
      // simulate() function is used to simulate the 'change' event on the city element
      // why Berlin? the mock data you have currently only contains two cities—London and Berlin
      CitySearchWrapper.find(".city").simulate("change", {
        target: { value: "Berlin" },
      });
    });

    then(
      "the user should receive a list of cities (suggestions) that match what they’ve typed",
      () => {
        // when the user typed in “Berlin” in your unit tests, 2 were returned
        // here, as well, you need to require two suggestions using the toHaveLength() matcher
        // you included the option to “See all cities,” so this also needs to be counted
        expect(CitySearchWrapper.find(".suggestions li")).toHaveLength(2);
      }
    );
  });

