import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { Button, Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { db } from '../Firebase';
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";

const useStyles = {
  paper: {
    marginTop: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: "4px",
    backgroundColor: "#009688",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: "16px",
  },
  submit: {
    margin: "16px 0px 8px",
  },
};

const INITIAL_STATE = {
  email: "prajjwal@gmail.com",
  firstName:"prajjwal",
  lastName:"kumar",
  country:"India",
  mobile:"1234567890",
  DOB : "29/12/1999",
  error: null,
};

class ProfileUp extends Component {
  constructor(props) {
    super(props);
    this.state = {...INITIAL_STATE };
  }
  

  render() {
    const { classes } = this.props;
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
              <Typography>{this.state.mobile}</Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}
const Profile = withRouter(withFirebase(withStyles(useStyles)(ProfileUp)));
export default Profile;
