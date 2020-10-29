import React, { Component } from "react";
import Clothes from "../components/Clothes";
import Grid from "@material-ui/core/Grid";
import { withFirebase } from "../components/Firebase";

class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
        ele : []
    }
  }

  
  componentDidMount() {

    this.props.firebase.db
      .collection("suggestions")
      .get()
      .then((querySnapshot) => {
        var ar = []
        querySnapshot.forEach((doc) => {
            ar.push(doc.data())
        });
        this.setState({ele : ar})
      });

  }

  render() {
    return (
      <div className="homecontainer">
        <h1>home</h1>
        <Grid container justify="center">
          {this.state.ele.map((val, ind, ar) => {
            return <Clothes id={ind} img={val} />;
          })}
        </Grid>
      </div>
    );
  }
}

export default withFirebase(home);
