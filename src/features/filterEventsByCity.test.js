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

  // SCENARIO 3
  test("User can select a city from the suggested list", ({
    given,
    and,
    when,
    then,
  }) => {
    // no longer do you simply need to open the app—now, the user needs to type “Berlin” into the city textbox
    // this does require the app to be open, so you still need to render the App component
    // however, you also need to simulate an event on the city textbox
    let AppWrapper;
    // given function in this test is an async function to allow your App component to properly load the events and locations first
    given("user was typing “Berlin” in the city textbox", async () => {
      // await makes JavaScript wait until that promise settles and returns its result
      // App component is rendered using the mount() function as the test will require interaction with its child, the CitySearch
      AppWrapper = await mount(<App />);
      AppWrapper.find(".city").simulate("change", {
        target: { value: "Berlin" },
      });
    });

    // checks whether a list of suggested cities is showing
    and("the list of suggested cities is showing", () => {
      // update() ensures App component is updated after it receives the list of suggestions
      AppWrapper.update();
      // expect() function will necessitate a call to the API, which is asynchronous
      expect(AppWrapper.find(".suggestions li")).toHaveLength(2);
    });

    when(
      "the user selects a city (e.g., “Berlin, Germany”) from the list",
      () => {
        // simulating a 'click' event on the first suggestion, which, in this case, is “Berlin, Germany”
        AppWrapper.find(".suggestions li").at(0).simulate("click");
      }
    );

    then(
      "their city should be changed to that city (i.e., “Berlin, Germany”)",
      () => {
        const CitySearchWrapper = AppWrapper.find(CitySearch);
        expect(CitySearchWrapper.state("query")).toBe("Berlin, Germany");
      }
    );

    and(
      "the user should receive a list of upcoming events in that city",
      () => {
        // checks whether the number of events rendered in the App component are the same as those included in your “mock-events.js” file
        expect(AppWrapper.find(".event-visible")).toHaveLength(mockData.length);
      }
    );
  });
});
