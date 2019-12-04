import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import Spinner from "../../commonFeilds/Spinner";
import "../Dashboard.scss";

/// IMPORT CONTENTS
import ProfileContent from "./profileContent/ProfileContent";
import WishListContent from "./wishListContent/WishListContent";

// import ACTIONS
import { getCurrentProfile } from "../../../actions/profileAction";

class UserDashboard extends Component {
  state = {
    isProductClicked: false,
    isUserClicked: false,
    isSettingClicked: false,
    isPaymentsClicked: false,
    isProfileClicked: true,
    isOrderClicked: false,
    isReviewClicked: false,
    isWishListClicked: false
  };

  componentDidMount() {
    this.props.getCurrentProfile(); // fired the getCurrentUser action
  }

  renderPayments = () => {
    this.setState({
      isPaymentsClicked: true,
      isUserClicked: false,
      isProductClicked: false,
      isSettingClicked: false,
      isProfileClicked: false,
      isOrderClicked: false,
      isReviewClicked: false,
      isWishListClicked: false
    });
  };

  renderSettings = () => {
    this.setState({
      isSettingClicked: true,
      isUserClicked: false,
      isProductClicked: false,
      isPaymentsClicked: false,
      isProfileClicked: false,
      isOrderClicked: false,
      isReviewClicked: false,
      isWishListClicked: false
    });
  };
  renderProfile = () => {
    this.setState({
      isProfileClicked: true,
      isSettingClicked: false,
      isUserClicked: false,
      isProductClicked: false,
      isPaymentsClicked: false,
      isOrderClicked: false,
      isReviewClicked: false,
      isWishListClicked: false
    });
  };
  renderOrders = () => {
    this.setState({
      isOrderClicked: true,
      isProfileClicked: false,
      isSettingClicked: false,
      isUserClicked: false,
      isProductClicked: false,
      isPaymentsClicked: false,
      isReviewClicked: false,
      isWishListClicked: false
    });
  };

  renderReviews = () => {
    this.setState({
      isReviewClicked: true,
      isOrderClicked: false,
      isProfileClicked: false,
      isSettingClicked: false,
      isUserClicked: false,
      isProductClicked: false,
      isPaymentsClicked: false,
      isWishListClicked: false
    });
  };

  renderWishList = () => {
    this.setState({
      isWishListClicked: true,
      isReviewClicked: false,
      isOrderClicked: false,
      isProfileClicked: false,
      isSettingClicked: false,
      isUserClicked: false,
      isProductClicked: false,
      isPaymentsClicked: false
    });
  };
  render() {
    let dashboardContents;
    let adminDashBoardContents;

    const { user, isAdmin } = this.props.auth;
    const { profile, loading } = this.props.profile;

    if (isAdmin) {
      adminDashBoardContents = <h1>You must be The Great Tawhid Abdullah</h1>;
    }

    return (
      <div>
        <div id="nav" className="side-nav sidenav">
          <div className="sidenav__profile">
            <img
              className="profile-avatar sidenav__profile-avatar"
              src={user.avatar}
              alt="user's photo"
            />

            <div className="sidenav__profile-title text-light">{user.name}</div>
          </div>
          <ul>
            <div className="search">
              <input type="text" placeholder="Type here" />
              <i className="fa fa-search" />
            </div>

            <li
              className={this.state.isProfileClicked ? "active" : "deactive"}
              onClick={this.renderProfile}
            >
              <a>
                <i className="fa fa-fw fa-user" />
                <span>PROFILE</span>
              </a>
            </li>
            <li
              className={this.state.isOrderClicked ? "active" : "deactive"}
              onClick={this.renderOrders}
            >
              <a>
                <i className="fa fa-fw fa-dashboard" />
                <span>MY ORDERS</span>
              </a>
            </li>
            <li
              className={this.state.isReviewClicked ? "active" : "deactive"}
              onClick={this.renderReviews}
            >
              <a>
                <i className="fa fa-fw fa-comments" />
                <span>MY Reviews</span>
              </a>
            </li>
            <li
              className={this.state.isWishListClicked ? "active" : "deactive"}
              onClick={this.renderWishList}
            >
              <a>
                <i className="fa fa-fw fa-heart" />
                <span>MY WISHLISTS</span>
              </a>
            </li>

            <li
              className={this.state.isPaymentsClicked ? "active" : "deactive"}
              onClick={this.renderPayments}
            >
              <a>
                <i className="fa fa-fw fa-money" />
                <span>PAYMENTS</span>
              </a>
            </li>
            <li
              className={this.state.isSettingClicked ? "active" : "deactive"}
              onClick={this.renderSettings}
            >
              <a>
                <i className="fa fa-fw fa-cog" />
                <span>SETTTINGS</span>
              </a>
            </li>
          </ul>
        </div>
        <div id="main">
          <div id="content">
            <div className="box">
              {this.state.isProfileClicked ? (
                <ProfileContent
                  profile={profile}
                  user={user}
                  loading={loading}
                />
              ) : (
                ""
              )}
              {this.state.isWishListClicked ? <WishListContent /> : ""}
            </div>
          </div>
        </div>
      </div>
    );
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
)(withRouter(UserDashboard));

// <div class="menu">

// <div id="panel">
//   <label class="text" for="toggle">Admin Settings</label>
//   <label class="icon fa fa-cog" for="toggle"></label>
// </div>

// <input type="checkbox" id="toggle" />

// <div class="dropdown">
//   <div class="arrow"></div>

//   <a class="row">
//     <div class="text">Edit User</div>
//     <i class="icon fa fa-user"></i>
//   </a>
//   <a class="row">
//     <div class="text">Statistics</div>
//     <i class="icon fa fa-home"></i>
//   </a>
//   <a class="row">
//     <div class="text">Upload Settings</div>
//     <i class="icon fa fa-upload"></i>
//   </a>
//   <a class="row">
//     <div class="text">Edit Sliders</div>
//     <i class="icon fa fa-pencil"></i>
//   </a>
// </div>

// </div>
