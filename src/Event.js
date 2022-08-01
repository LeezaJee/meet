// contains the actual events that will be rendered in the EventList component

import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";

class Event extends Component {
  state = {
    buttonCollapsed: true,
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
        <Card className="summary" bg="light" border="dark">
          <Card.Header as="h4">{this.props.event.summary}</Card.Header>
          <Card.Body>
            <Card.Text className="start-date">
              {this.props.event.start.dateTime}
            </Card.Text>
            <Card.Text className="location">
              {this.props.event.location}
            </Card.Text>
            {this.collapsedEvent()}
            <Button
              className="btn-details"
              variant="warning"
              onClick={() => this.handleShowDetails()}
            >
              Details
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Event;
