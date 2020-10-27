import React, { Component } from "react";
import Link from "react-router-dom/Link";

//MUI stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

import { withauthprov } from "./Session";
import { withFirebase } from "./Firebase";

const notsignedin = () => {
  return (
    <div>
      <Button color="inherit" component={Link} to="/login">
        Login
      </Button>
      <Button color="inherit" component={Link} to="/signup">
        Signup
      </Button>
    </div>
  );
};

const signedin = (firebase) => {
  return (
    <div>
      <Button color="inherit" component={Link} to="/home">
        Home
      </Button>
      <Button color="inherit" component={Link} to="/profile">
        Profile
      </Button>
      <Button color="inherit" component={Link} to="/cart">
        cart
      </Button>
      <Button
        color="inherit"
        component={Link}
        to="/"
        onClick={firebase.doSignOut}
      >
        Signout
      </Button>
    </div>
  );
};

class Navbar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <AppBar>
        <Toolbar className="nav-container">
          {this.props.authUser ? signedin(this.props.firebase) : notsignedin()}
        </Toolbar>
      </AppBar>
    );
  }
}

export default withFirebase(withauthprov(Navbar));
