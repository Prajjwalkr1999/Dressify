import React, { Component } from "react";
import Profile from "../components/Profile";

export default class profile extends Component {
  render() {
    return (
      <div>
        <div className='profile-sexy'>
          <h1> My Profile</h1>
        </div>
        <Profile/>
      </div>
    );
  }
}
