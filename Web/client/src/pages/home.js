import React, { Component } from "react";
import Clothes from "../components/Clothes";
import Grid from "@material-ui/core/Grid";
import { withFirebase } from "../components/Firebase";

class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
        ele : [],
        recommend : null
    }
  }

  
  componentDidMount() {
    const userId = this.props.firebase.auth.currentUser.uid;

    this.props.firebase.db
      .doc(`/users/${userId}`)
      .get()
      .then((snapshot) => {
        const curUser = snapshot.data().recommend;
        // console.log(snapshot.data());
        this.setState({recommend : curUser});
      })
      .catch((error) => {
        console.log(error);
      });
    
    
    this.props.firebase.db
      .collection("suggestions")
      .get()
      .then((querySnapshot) => {
        var ar = []
        querySnapshot.forEach((doc) => {
          if(doc.data().celeb === this.state.recommend[0]||doc.data().celeb === this.state.recommend[1]||doc.data().celeb === this.state.recommend[2]){
            ar.push(doc.data())}
        });
        this.setState({ele : ar})
      });

  }

  render() {
    return (
      <div className="homecontainer">
        <h1><b>Dressify</b></h1>
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
