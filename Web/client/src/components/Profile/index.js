import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { Button, Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
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
  image: {
    width: "300px",
    height: "auto",
    "object-fit": "cover",
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
  firstName: "prajjwal",
  lastName: "kumar",
  country: "India",
  mobile: "1234567890",
  DOB: "29/12/1999",
  image: "",
  error: null,
};

class ProfileUp extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    var uploadFile;
  }

  componentDidMount() {
    const userId = this.props.firebase.auth.currentUser.uid;
    // console.log(this.props.firebase.auth.currentUser.uid);
    this.props.firebase.db
      .doc(`/users/${userId}`)
      .get()
      .then((snapshot) => {
        const curUser = snapshot.data();
        // console.log(snapshot.data());
        this.setState(curUser);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onSubmit = (event) => {
    event.preventDefault();
    console.log(this.uploadFile);
    const uploadTask = this.props.firebase.storage
      .ref(`/images/${this.uploadFile.name}`)
      .put(this.uploadFile);
    //initiates the firebase side uploading
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot);
      },
      (err) => {
        //catches the errors
        console.log(err);
      },
      () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        this.props.firebase.storage
          .ref("images")
          .child(this.uploadFile.name)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            console.log(fireBaseUrl);
            this.state.image = fireBaseUrl;
            this.setState({ image: fireBaseUrl });

            const userId = this.props.firebase.auth.currentUser.uid;

            this.props.firebase.db
              .doc(`/users/${userId}`)
              .update({ image: fireBaseUrl });
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: this.state.image })
            };
            console.log(JSON.stringify({ url: this.state.image }));
            var userMatch
            fetch('http://localhost:5000/uploader', requestOptions)
                .then(response => response.json())
                .then(data => userMatch=data)
                .catch(err => console.log(err));
            console.log(userMatch);
        });
      }
    );
  };

  imageChange = (event) => {
    const imageFile = event.target.files[0];
    this.uploadFile = imageFile;
    console.log(this.uploadFile);
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <img className={classes.image} src={this.state.image}></img>
            </Paper>
            <form onSubmit={this.onSubmit}>
              <input type="file" onChange={this.imageChange}></input>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Upload
              </Button>
            </form>
          </Grid>
          <Grid item xs={8}>
            <Paper className={classes.paper}>
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
