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

// -------- AUTHORIZATION AND ACCESS TOKEN CODE ---------

// if existing token was found in localStorage, it checks whether token is valid or not
// if it’s not, then user is sent to the Google Authorization screen
const checkToken = async (accessToken) => {
  const result = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  )
    .then((res) => res.json())
    .catch((error) => error.json());

  return result;
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

// takes your code and encodes it using encodeURIComponent, then uses the encoded code to get your token
const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code);
  const { access_token } = await fetch(
    "https://v6n6jwhi1a.execute-api.eu-central-1.amazonaws.com/dev/api/token" +
      "/" +
      encodeCode
  )
    .then((res) => {
      return res.json();
    })
    .catch((error) => error);

  access_token && localStorage.setItem("access_token", access_token);

  return access_token;
};

// removes the code from the URL once you’re finished with it.
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

// -------- getEvent CODE ---------

// if you’re using localhost, you return the mock data; otherwise, you use the real API
// NProgress package is used to create and display progress bars at the top of the page
// this way, you can show users that the application is loading data when it tries to access the API
export const getEvents = async () => {
  NProgress.start();

  if (window.location.href.startsWith("http://localhost")) {
    NProgress.done();
    return mockData;
  }
  // navigator.onLine API checks whether a user is online and returns a boolean
  // if it returns true (the user is online), the app will request data from the Google Calendar API
  // however, if it returns false (the user is offline), the app will load the event list data stored in localStorage
  if (!navigator.onLine) {
    // !navigator.onLine checks whether the user is offline
    // if they are offline, the stored event list is loaded, parsed, and returned as events
    const data = localStorage.getItem("lastEvents");
    NProgress.done();
    return data ? JSON.parse(data).events : [];
  }

  // you don’t need to check for an access token if the user is offline
  // that's why !navigator.onLine is put before const token
  const token = await getAccessToken(); // checks for an access token

  if (token) {
    removeQuery(); // will remove the code from the URL once you’re finished with it
    const url =
      "https://v6n6jwhi1a.execute-api.eu-central-1.amazonaws.com/dev/api/get-events" +
      "/" +
      token;
    const result = await axios.get(url);
    if (result.data) {
      var locations = extractLocations(result.data.events);
      // JSON.stringify(events) function is necessary because events is a list, but localStorage can only store strings
      // it will then need to be parsed later using the JSON.parse() function when it’s loaded from localStorage
      localStorage.setItem("lastEvents", JSON.stringify(result.data));
      localStorage.setItem("locations", JSON.stringify(locations));
    }
    NProgress.done();
    return result.data.events;
  }
};
