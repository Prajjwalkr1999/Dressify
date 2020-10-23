import React, { Component } from "react";
import './App.css';
import {BrowserRouter as Router , Route , Switch} from "react-router-dom"
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

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#6effe8",
      main: "#1de9b6",
      dark: "#00b686",
      contrastText: "#fff",
    },
    secondary: {
      light: "#52c7b8",
      main: "#009688",
      dark: "##00675b",
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
                <Route exact path="/" component={home} />
                <Route exact path="/signup" component={signup} />
                <Route exact path="/login" component={login} />
                <Route exact path="/cart" component={cart} />
                <Route exact path="/profile" component={profile} />
              </Switch>
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
