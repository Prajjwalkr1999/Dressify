import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

//components
import Navbar from "./components/Navbar";

//Pages
import home from "./pages/home";
import signup from "./pages/signup";
import login from "./pages/login";
import cart from "./pages/cart";
import profile from "./pages/profile";
import landing from "./pages/landing";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#c158dc",
      main: "#8e24aa",
      dark: "#5c007a",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ffc4ff",
      main: "#ce93d8",
      dark: "#9c64a6",
      contrastText: "#fff",
    },
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={landing} />
                <Route exact path="/signup" component={signup} />
                <Route exact path="/login" component={login} />
                <Route exact path="/cart" component={cart} />
                <Route exact path="/profile" component={profile} />
                <Route exact path="/home" component={home} />
              </Switch>
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
