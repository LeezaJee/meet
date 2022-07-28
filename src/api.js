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

// checks whether there’s a path, then builds the URL with the current path
// (or builds the URL without a path using window.history.pushState()
const removeQuery = () => {
  if (window.history.pushState && window.location.pathname) {
    var newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    window.history.pushState("", "", newurl);
  } else {
    newurl = window.location.protocol + "//" + window.location.host;
    window.history.pushState("", "", newurl);
  }
};

// if you’re using localhost, you return the mock data; otherwise, you use the real API
export const getEvents = async () => {
  NProgress.start();

  if (window.location.href.startsWith("http://localhost")) {
    NProgress.done();
    return mockData;
  }

  const token = await getAccessToken();

  if (token) {
    removeQuery(); // will remove the code from the URL once you’re finished with it
    const url =
      "https://v6n6jwhi1a.execute-api.eu-central-1.amazonaws.com/dev/api/get-events" +
      "/" +
      token;
    const result = await axios.get(url);
    if (result.data) {
      var locations = extractLocations(result.data.events);
      localStorage.setItem("lastEvents", JSON.stringify(result.data));
      localStorage.setItem("locations", JSON.stringify(locations));
    }
    NProgress.done();
    return result.data.events;
  }
};

// checks whether an access token was found
// if no token is found (!accessToken), it checks for an authorization code
// if no authorization code found (!code), user is automatically redirected to Google Authorization screen
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
