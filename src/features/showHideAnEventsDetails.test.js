import { loadFeature, defineFeature } from "jest-cucumber";
import { mount } from "enzyme";
import React from "react";
import App from "../App";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, (test) => {
  <></>;
  let AppWrapper;

  // Scenario 1
  test("An event element is collapsed by default.", ({ given, when, then }) => {
    given("that the user opens the main page", () => {
      AppWrapper = mount(<App />);
    });

    when("the user views the event element of a city", () => {});

    then(
      "the event element from each city will initially be collapsed/hidden from the user",
      () => {
        AppWrapper.update();
        expect(AppWrapper.find(".event-details")).toHaveLength(0);
      }
    );
  });

