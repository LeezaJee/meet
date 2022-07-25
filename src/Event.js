// contains the actual events that will be rendered in the EventList component

import React, { Component } from "react";

class Event extends Component {
  state = {
    buttonCollapsed: true, // 9
  };

  handleShowDetails() {
    this.setState({ buttonCollapsed: !this.state.buttonCollapsed });
  }

  collapsedEvent = () => {
    if (this.state.buttonCollapsed === false) {
      return (
        <div className="event-details">
          <div className="description">
            <h3>Description</h3>
            <em>{this.props.event.description}</em>
          </div>
          <div className="creator">
            <h4>E-mail:</h4>
            <p>{this.props.event.creator.email}</p>
          </div>
          <h4>Date and Time:</h4>
          <div className="start">
            <p>{this.props.event.start.dateTime}</p>
          </div>
          <div className="end">
            <p>{this.props.event.end.dateTime}</p>
          </div>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="event-visible">
        <h2 className="summary">{this.props.event.summary}</h2>
        <h3 className="location">{this.props.event.location}</h3>
        {this.collapsedEvent()}
        <button
          onClick={() => this.handleShowDetails()}
          className="btn-details"
        >
          Details
        </button>
      </div>
    );
  }
}

export default Event;
