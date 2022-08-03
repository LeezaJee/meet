import { mount } from "enzyme";
import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { extractLocations } from "../api";
import App from "../App";
import { mockData } from "../mock-data";
import NumberOfEvents from "../NumberOfEvents";

