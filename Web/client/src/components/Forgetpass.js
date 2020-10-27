import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { withFirebase } from "./Firebase";
import { withRouter } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const INITIAL_STATE = {
  email: "",
  error: null,
};

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


   
   
class PasswordForgetFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email } = this.state;

        this.props.firebase
        .doPasswordReset(email)
        .then(() => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push("/login");
        })
        .catch(error => {
            this.setState({ error });
        });
        
        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
  render() {
    //   <h1></h1>
    // const { email, error } = this.state;
    // const isInvalid = email === '';
    const {classes} = this.props;
    const isInvalid = this.state.email === '';

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>
          <form className={classes.form} noValidate onSubmit={this.onSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={this.onChange}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              disabled={isInvalid}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              // href = "/login"
            >
              Reset My Password
            </Button>
            {this.state.error && <p>{this.state.error.message}</p>}
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}
// const PasswordForgetLink = () => (
//     <p>
//       <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
//     </p>
// );

// export default PasswordForgetPage;
 
const PasswordForgetForm = withRouter(withFirebase(withStyles(useStyles)(PasswordForgetFormBase)));
 
export default PasswordForgetForm ;
