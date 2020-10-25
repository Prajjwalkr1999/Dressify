import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

export default class Landing extends Component {
  render() {
    return (
      <div>
        <Paper className="image" elevation={3}>
          <h1>Trendiness Dive</h1>

          <h4>we provide personalised trends for you over all seasons</h4>
          <br />
          <br />
          <br />
          <br />
          <p>
            You can have anything you want in life if you dress for it. —Edith
            Head
          </p>
        </Paper>

        <h1>About Us</h1>
        <h2>Team Dominators</h2>
      </div>
    );
  }
}
