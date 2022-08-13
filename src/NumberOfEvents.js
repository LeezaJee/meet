import React, { Component } from "react";
import { ErrorAlert } from "./Alert";

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
    errorText: "",
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    if (value > 0 && value <= 32) {
      return this.setState({
        numberOfEvents: value,
        errorText: "",
      });
    } else {
      return this.setState({
        errorText: "Please select a number between 1 and 32",
      });
    }
  };

  render() {
    return (
      <div className="numberOfEvents">
        <input
          type="number"
          id="default"
          className="default"
          value={this.state.numberOfEvents}
          onChange={this.handleInputChanged}
          min={0}
          max={32}
        />
        <ErrorAlert text={this.state.errorText} />
      </div>
    );
  }
}

export default NumberOfEvents;
