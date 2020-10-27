import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { Button, Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fistName: "Piyush",
      lastName: "Shandilya",
      email: "piyush.shandilya1999@gmail.com",
      phone: "9582296347",
    };
  }

  render() {
    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Paper>TODO profile photo</Paper>
            <Button>change photo</Button>
          </Grid>
          <Grid item xs={8}>
            <Paper>
              <Typography>First Name</Typography>
              <Typography>{this.state.firstName}</Typography>
              <Typography>Last Name</Typography>
              <Typography>{this.state.lastName}</Typography>
              <Typography>Email</Typography>
              <Typography>{this.state.email}</Typography>
              <Typography>Phone</Typography>
              <Typography>{this.state.phone}</Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}
