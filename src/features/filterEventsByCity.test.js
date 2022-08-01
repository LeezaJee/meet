import { loadFeature, defineFeature } from "jest-cucumber";
import { mount, shallow } from "enzyme";
import React from "react";
import App from "../App";
import { mockData } from "../mock-data";

const feature = loadFeature("./src/features/filterEventsByCity.feature");

// defineFeature(feature, (test) => {});
// your first step should always be to run the test with an empty function body (npm run test)
// Cucumber will run the test, notice the missing code, then provide that code for you based on the format of your Gherkin file

