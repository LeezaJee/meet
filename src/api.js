// handles API calls
// temporarily storing functions
import { mockData } from "./mock-data";
import axios from "axios";

// extracts event locations out of an array of events and removes duplicates
export const extractLocations = (events) => {
  var extractLocations = events.map((event) => event.location);
  var locations = [...new Set(extractLocations)];
  return locations;
};

export const getEvents = async () => {
  return mockData;
};

export const getAccessToken = async () => {
  const accessToken = localStorage.getItem("access_token");
};
