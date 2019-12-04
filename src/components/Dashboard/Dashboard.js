import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import "./Dashboard.scss";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import UserDashboard from "./UserDashboard/UserDashboard";

// import ACTIONS
import { getCurrentProfile } from "../.././actions/profileAction";

class Dashbord extends Component {
  componentDidMount() {
    this.props.getCurrentProfile(); // fired the getCurrentUser action
  }

  render() {
    let dashboardContents;

    const { user, isAdmin } = this.props.auth;
    const { profile, loading } = this.props.profile;

    return <div>{isAdmin ? <AdminDashboard /> : <UserDashboard />}</div>;
  }
}

const mapStateToProp = state => {
  return {
    auth: state.auth,
    profile: state.profile
  };
};

export default connect(
  mapStateToProp,
  { getCurrentProfile }
)(withRouter(Dashbord));
