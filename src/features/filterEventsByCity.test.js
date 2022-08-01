import { loadFeature, defineFeature } from "jest-cucumber";
import { mount, shallow } from "enzyme";
import React from "react";
import App from "../App";
import { mockData } from "../mock-data";

const feature = loadFeature("./src/features/filterEventsByCity.feature");

// defineFeature(feature, (test) => {});
// your first step should always be to run the test with an empty function body (npm run test)
// Cucumber will run the test, notice the missing code, then provide that code for you based on the format of your Gherkin file

defineFeature(feature, (test) => {
  <></>;
  // Scenario 1
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
      AppWrapper.update();
      expect(AppWrapper.find(".event-visible")).toHaveLength(mockData.length);
    });
  });

