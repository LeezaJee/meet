// handles API calls
// temporarily storing functions
import { mockData } from "./mock-data";
import axios from "axios";
import NProgress from "nprogress";

// extracts event locations out of an array of events and removes duplicates
export const extractLocations = (events) => {
  var extractLocations = events.map((event) => event.location);
  var locations = [...new Set(extractLocations)];
  return locations;
};

// takes the accessToken that has been found in localStorage and checks whether it’s valid or not
// if it’s not, then user is sent to the Google Authorization screen
const checkToken = async (accessToken) => {
  const result = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  )
    .then((res) => res.json())
    .catch((error) => error.json());

  return result;
};

export const getEvents = async () => {
  return mockData;
};

export const getAccessToken = async () => {
  const accessToken = localStorage.getItem("access_token");

  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem("access_token");
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get("code");
    if (!code) {
      const results = await axios.get(
        "https://v6n6jwhi1a.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url"
      );
      const { authUrl } = results.data;
      return (window.location.href = authUrl);
    }
    return code && getToken(code);
  }
  return accessToken;
};
