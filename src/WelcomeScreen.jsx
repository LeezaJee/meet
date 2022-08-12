import React from "react";
import "./WelcomeScreen.css";

function WelcomeScreen(props) {
  return (
    <div className="text-center text-white WelcomeScreen">
      <h1 className="heading1">Welcome to the Meet App</h1>
      <h4 className="heading4">
        Log in to see upcoming events around the world for full-stack developers
      </h4>
      <div className="button_cont" align="center">
        <div class="google-btn mt-5">
          <div class="google-icon-wrapper">
            <img
              class="google-icon"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Log
o.svg"
              alt="Google sign-in"
            />
          </div>
          <button
            onClick={() => {
              props.getAccessToken();
            }}
            rel="nofollow noopener"
            className="btn-text"
          >
            <b>Sign in with Google</b>
          </button>
        </div>
      </div>
      <footer>
        <a
          className="policy"
          href="https://leezajee.github.io/meet/privacy.html"
          rel="nofollow noopener"
        >
          Privacy policy
        </a>
      </footer>
    </div>
  );
}
export default WelcomeScreen;
