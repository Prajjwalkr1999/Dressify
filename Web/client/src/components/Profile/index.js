import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { Button, Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import Link from "react-router-dom/Link";
import Divider from '@material-ui/core/Divider';

const useStyles = {
   box: {
    "font-size" : "20px",
    padding:"10px",
    fontFamily:"Comic Sans",
  },
  paper: {
    marginTop: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  gg: {
    "font-size" : "30px",
    padding:"10px",
    fontFamily:"Comic Sans",
  },
  avatar: {
    margin: "4px",
    backgroundColor: "#009688",
  },
  image: {
    marginTop:"30px",
    width: "200px",
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
    var uploadFile = null;
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
    if (this.uploadFile === null){
      return;
    }
    const uploadTask = this.props.firebase.storage
      .ref(`/images/`)
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
        <Grid container spacing={4} justify= "center">
          <Grid item xs={6} sm={4}>
            <Paper className={classes.paper}>
              <img className={classes.image} src={this.state.image}></img>
              <Typography className={classes.gg}>{this.state.firstName} {this.state.lastName}</Typography>
            </Paper>
            <form onSubmit={this.onSubmit} className={classes.form}>
              <input type="file" onChange={this.imageChange} className={classes.box}></input>
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
          <Grid item xs={5} sm={7}>
            <Paper className={classes.paper}>
              {/* <Typography align='left' display ='inline' variant='h5'><b text-align = 'left'>First Name : </b>{this.state.firstName}</Typography> */}
              {/* <hr/> */}
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Typography gutterBottom = {true}></Typography>
                <Grid item xs={3}>
                <Typography gutterBottom = {true}></Typography>
                  <Typography variant='h5' color = 'primary' gutterBottom = {true}><b>First Name</b></Typography>
                  <Divider variant="middle" />
                  <Typography gutterBottom = {true}></Typography>
                </Grid>
                <Grid item xs={3}>
                <Typography gutterBottom = {true}></Typography>
                  <Typography variant='h5' gutterBottom = {true}><b>:</b></Typography>
                  <Typography gutterBottom = {true}></Typography>
                </Grid>
                
                <Grid item xs={3}>
                  <Typography gutterBottom = {true}></Typography>
                  <Typography variant='h5' color = 'primary' gutterBottom = {true}>{this.state.firstName}</Typography>
                  <Divider variant="middle" />
                  <Typography gutterBottom = {true}></Typography>
                </Grid>
              </Grid>
              {/* <br/> */}
              {/* <Divider variant="middle" /> */}
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"

              >
                <Grid item xs={3} p={10}>
                  <Typography variant='h5' color = 'secondary' gutterBottom = {true}><b>Last Name</b></Typography>
                  <Divider variant="middle" /> 
                  <Typography gutterBottom = {true}></Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant='h5' gutterBottom = {true}><b>:</b></Typography>
                  <Typography gutterBottom = {true}></Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant='h5' color = 'secondary' gutterBottom = {true}> {this.state.lastName}</Typography>
                  <Divider variant="middle" /> 
                  <Typography gutterBottom = {true}></Typography>
                </Grid>
              </Grid>
              {/* <Divider variant="middle" /> */}
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={3}>
                  <Typography variant='h5' color = 'primary' gutterBottom = {true}><b>Email</b></Typography>
                  <Divider variant="middle" /> 
                  <Typography gutterBottom = {true}></Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant='h5' gutterBottom = {true}><b>:</b></Typography>
                  <Typography gutterBottom = {true}></Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant='h5' color = 'primary' gutterBottom = {true}>{this.state.email}</Typography>
                  <Divider variant="middle" /> 
                  <Typography gutterBottom = {true}></Typography>
                </Grid>
              </Grid>
              {/* <Divider variant="middle" /> */}
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={3}>
                  <Typography variant='h5' color = 'secondary' gutterBottom = {true}><b>Mobile Number</b></Typography>
                  <Divider variant="middle" /> 
                  <Typography gutterBottom = {true}></Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant='h5' gutterBottom = 'true'><b>:</b></Typography>
                  <Typography gutterBottom = {true}></Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant='h5' color='secondary' gutterBottom = 'true'>{this.state.mobile}</Typography>
                  <Divider variant="middle" /> 
                  <Typography gutterBottom = {true}></Typography>
                </Grid>
              </Grid>
              {/* <hr/> */}
              {/* <Divider variant="middle" /> */}
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={3} >
                  <Typography variant='h5' color = 'primary' gutterBottom = {true}><b>Country</b></Typography>
                  <Divider variant="middle" /> 
                </Grid>
                <Grid item xs={3}>
                  <Typography variant='h5' gutterBottom = {true}><b>:</b></Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant='h5' color = 'primary' gutterBottom = {true}>{this.state.country}</Typography>
                  <Divider variant="middle" /> 
                </Grid>
              </Grid>

              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={3}>
                  <Typography variant='h5' color = 'primary' gutterBottom = {true}><b>Password</b></Typography>
                  
                  <Typography gutterBottom = {true}></Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant='h5' gutterBottom = {true}><b>:</b></Typography>
                  <Typography gutterBottom = {true}></Typography>
                </Grid>
                <Grid item xs={3}>
                  {/* <Typography variant='h5' color = 'primary' gutterBottom = {true}>{this.state.email}</Typography> */}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    component={Link} to="/passchange"
                  >
                    Change My Password
                  </Button>
                  <Typography gutterBottom = {true}></Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* <Grid item xs={8}>
             <List className={classes.root}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <WorkIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Work" secondary="Jan 7, 2014" />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <BeachAccessIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Vacation" secondary="July 20, 2014" />
                </ListItem>
              </List>
            </Grid> */}
        </Grid>
      </div>
    );
  }
}
const Profile = withRouter(withFirebase(withStyles(useStyles)(ProfileUp)));
export default Profile;
