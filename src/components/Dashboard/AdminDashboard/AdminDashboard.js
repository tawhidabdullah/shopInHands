import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import AddProducts from "../AddProducts";
import Spinner from "../../commonFeilds/Spinner";
import DashboardContent from "./DashboardContent/DashboardContent";
import ProductsContent from "./ProductsContent/ProductsContent";
import CategoriesContent from './CategoriesContent/CategoriesContent'; 
import "./AdminDashboard.scss";
import "../Dashboard.scss";

// import ACTIONS
import { getCurrentProfile } from "../../../actions/profileAction";

class AdminDashboard extends Component {
  state = {
    isDashboardClicked: true,
    isProductClicked: false,
    isAddProductClicked: false,
    isUserClicked: false,
    isSettingClicked: false,
    isPaymentsClicked: false,
    isCategoriesClicked: false,
  };

  componentDidMount() {
    this.props.getCurrentProfile(); // fired the getCurrentUser action
  }

  renderProducts = () => {
    this.setState({
      isProductClicked: true,
      isAddProductClicked: false,
      isUserClicked: false,
      isSettingClicked: false,
      isPaymentsClicked: false,
      isDashboardClicked: false,
      isCategoriesClicked: false
    });
  };

  renderAddProducts = () => {
    this.setState({
      isAddProductClicked: true,
      isUserClicked: false,
      isSettingClicked: false,
      isPaymentsClicked: false,
      isDashboardClicked: false,
      isProductClicked: false,
      isCategoriesClicked: false
    });
  };

  renderUsers = () => {
    this.setState({
      isUserClicked: true,
      isAddProductClicked: false,
      isSettingClicked: false,
      isPaymentsClicked: false,
      isDashboardClicked: false,
      isProductClicked: false,
      isCategoriesClicked: false
    });
  };
  renderPayments = () => {
    this.setState({
      isPaymentsClicked: true,
      isUserClicked: false,
      isAddProductClicked: false,
      isSettingClicked: false,
      isDashboardClicked: false,
      isProductClicked: false,
      isCategoriesClicked: false
    });
  };
  renderSettings = () => {
    this.setState({
      isSettingClicked: true,
      isUserClicked: false,
      isAddProductClicked: false,
      isPaymentsClicked: false,
      isDashboardClicked: false,
      isProductClicked: false,
      isCategoriesClicked: false
    });
  };
  renderDashboard = () => {
    this.setState({
      isDashboardClicked: true,
      isSettingClicked: false,
      isUserClicked: false,
      isAddProductClicked: false,
      isPaymentsClicked: false,
      isProductClicked: false,
      isCategoriesClicked: false
    });
  };

  renderCategories = () => {
    this.setState({
      isCategoriesClicked: true,
      isDashboardClicked: false,
      isSettingClicked: false,
      isUserClicked: false,
      isAddProductClicked: false,
      isPaymentsClicked: false,
      isProductClicked: false
    });
  };

  render() {
    let dashboardContents;
    let adminDashBoardContents;

    const { user, isAdmin } = this.props.auth;
    const { profile, loading } = this.props.profile;

    if (profile === null || loading) {
      dashboardContents = <Spinner />;
    } else {
      if (Object.keys(profile).length > 0) {
        //TODO: DISPLAY THE PROFILE
        dashboardContents = (
          <div>
            <p className="lead text-muted">
              {" "}
              Welcome{" "}
              <Link to={`/profile/${profile.handle}`}> {user.name} </Link>
            </p>
          </div>
        );
      } else {
        dashboardContents = (
          <div>
            <p className=" text-muted">
              Wecome <h3 className="text-muted">{user.name}</h3>
            </p>
            <p className="lead">Seems like you are enjoing are service!</p>
          </div>
        );
      }

      if (isAdmin) {
        adminDashBoardContents = <h1>You must be The Great Tawhid Abdullah</h1>;
      }
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

            <div className="sidenav__profile-title text-light">Tawhid</div>
          </div>
          <ul>
            <div className="search">
              <input type="text" placeholder="Type here" />
              <i className="fa fa-search" />
            </div>
            <li
              className={this.state.isDashboardClicked ? "active" : "deactive"}
              onClick={this.renderDashboard}
            >
              <Link to="/dashboard">
                <i className="fa fa-fw fa-dashboard" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li
              className={this.state.isProductClicked ? "active" : "deactive"}
              onClick={this.renderProducts}
            >
              <a href="#">
                <i className="fa fa-fw fa-edit" />
                <span className="swatch light-grey">Products</span>
              </a>
            </li>
            <li
              className={this.state.isAddProductClicked ? "active" : "deactive"}
              onClick={this.renderAddProducts}
            >
              <a href="#">
                <i className="fa fa-fw fa-pencil" />
                <span className="swatch light-grey">Add Products</span>
              </a>
            </li>
            <li
              className={this.state.isCategoriesClicked ? "active" : "deactive"}
              onClick={this.renderCategories}
            >
              <a href="#">
                <i className="fa fa-fw fa-pencil" />
                <span className="swatch light-grey">Categories</span>
              </a>
            </li>
            <li
              className={this.state.isUserClicked ? "active" : "deactive"}
              onClick={this.renderUsers}
            >
              <a href="#">
                <i className="fa fa-fw fa-user" />
                <span>Users</span>
              </a>
            </li>
            <li
              className={this.state.isPaymentsClicked ? "active" : "deactive"}
              onClick={this.renderPayments}
            >
              <a href="#">
                <i className="fa fa-fw fa-money" />
                <span>Payments</span>
              </a>
            </li>
            <li
              className={this.state.isSettingClicked ? "active" : "deactive"}
              onClick={this.renderSettings}
            >
              <a href="#">
                <i className="fa fa-fw fa-cog" />
                <span>Settings</span>
              </a>
            </li>
          </ul>
        </div>
        <div id="main">
          <div id="content">
            <div className="box">
              {this.state.isProductClicked ? (
                <ProductsContent user={user} clicked={this.renderAddProducts} />
              ) : (
                ""
              )}
              {this.state.isAddProductClicked ? <AddProducts /> : ""}
              {this.state.isDashboardClicked ? <DashboardContent /> : ""}
              {this.state.isCategoriesClicked ? <CategoriesContent /> : ""}
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
    profile: state.profile,
    products: state.product
  };
};

export default connect(
  mapStateToProp,
  { getCurrentProfile }
)(withRouter(AdminDashboard));

// <div class="menu">

// <div id="panel">
//   <label class="text" for="toggle">Admin Settings</label>
//   <label class="icon fa fa-cog" for="toggle"></label>
// </div>

// <input type="checkbox" id="toggle" />

// <div class="dropdown">
//   <div class="arrow"></div>

//   <a href="#" class="row">
//     <div class="text">Edit User</div>
//     <i class="icon fa fa-user"></i>
//   </a>
//   <a href="#" class="row">
//     <div class="text">Statistics</div>
//     <i class="icon fa fa-home"></i>
//   </a>
//   <a href="#" class="row">
//     <div class="text">Upload Settings</div>
//     <i class="icon fa fa-upload"></i>
//   </a>
//   <a href="#" class="row">
//     <div class="text">Edit Sliders</div>
//     <i class="icon fa fa-pencil"></i>
//   </a>
// </div>

// </div>
