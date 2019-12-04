import "./ProfileContent.scss";
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import isEmpty from "../../../../validation/isEmpty";
import Moment from "react-moment";
import {
  getCurrentProfile,
  createProfile
} from "../../../.././actions/profileAction";
import Spinner from "../../../commonFeilds/Spinner";
import TextFeildGroup from "../../../commonFeilds/TextFeildGroup";
import SelectListGroup from "../../../commonFeilds/SelectListGroup";

class ProfileContent extends Component {
  state = {
    addOrEditProfile: false,
    handle: "",
    gender: "",
    birthday: "",
    mobile: null,
    errors: {}
  };

  onClickCreateProfile = () => {
    const editORCreate = this.state.addOrEditProfile;
    this.setState({
      addOrEditProfile: !editORCreate
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // if profile field isn't empty then make the same value
      // If profile field doesn't exist , make empty string
      profile.handle = !isEmpty(profile.handle) ? profile.handle : "";
      profile.gender = !isEmpty(profile.gender) ? profile.gender : "";
      profile.mobile = !isEmpty(profile.mobile) ? profile.mobile : "";
      profile.birthday = !isEmpty(profile.birthday) ? profile.birthday : "";

      let bday = "";

      for (let i = 0; i < profile.birthday.length; i++) {
        if (profile.birthday[i] === "T") {
          break;
        } else {
          if (profile.birthday[i] === "-") {
            bday += "/";
          } else {
            bday += profile.birthday[i];
          }
        }
      }

      this.setState({
        handle: profile.handle,
        gender: profile.gender,
        mobile: profile.mobile,
        birthday: bday
      });
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onFormSubmit = e => {
    e.preventDefault();
    let profileData = {};
    profileData.handle = this.state.handle;
    profileData.gender = this.state.gender;
    profileData.mobile = this.state.mobile;
    profileData.birthday = this.state.birthday;

    this.props.createProfile(profileData, this.props.history);
  };

  render() {
    const errors = this.state.errors;

    let dashboardContents;
    let createProfileContents;
    const { profile } = this.props.profile;

    const user = this.props.user;
    const loading = this.props.loading;

    if (profile === null || loading) {
      dashboardContents = <Spinner />;
    } else {
      if (profile.handle !== "") {
        //TODO: DISPLAY THE PROFILE
        dashboardContents = (
          <section className="statistics">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <div
                    className="box"
                    id="addCategory"
                    onClick={this.onClickCreateProfile}
                  >
                    <i className="fa fa-edit fa-fw bg-danger" />
                    <div className="info">
                      <h3>EDIT PROFILE</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      } else {
        dashboardContents = (
          <section className="statistics">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <div
                    className="box"
                    id="addCategory"
                    onClick={this.onClickCreateProfile}
                  >
                    <i className="fa fa-plus fa-fw bg-danger" />
                    <div className="info">
                      <h3>CREATE PROFILE</h3>
                      <p>Add profile to stay more connected with us</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      }
    }

    const options = [
      { label: "Choose gender", value: 0 },
      { label: "male", value: "male" },
      { label: "female", value: "female" }
    ];

    if (this.state.addOrEditProfile) {
      createProfileContents = (
        <div className="createprofilecontents">
          <form onSubmit={this.onFormSubmit}>
            <TextFeildGroup
              name="handle"
              placeholder="handle"
              type="text"
              value={this.state.handle}
              onChange={this.onChange}
              errors={errors.handle}
              info="handle is required"
            />
            <SelectListGroup
              placeholder="gender"
              name="gender"
              value={this.state.gender}
              onChange={this.onChange}
              options={options}
              errors={errors.gender}
            />
            <TextFeildGroup
              placeholder="enter your mobile number"
              name="mobile"
              type="number"
              value={this.state.mobile}
              onChange={this.onChange}
              errors={errors.mobile}
            />

            <TextFeildGroup
              name="birthday"
              type="text"
              value={this.state.birthday}
              onChange={this.onChange}
              errors={errors.birthday}
            />
            <div className="form">
              <input type="submit" value="Create Product" id="input-submit" />{" "}
            </div>
          </form>
        </div>
      );
    }

    return (
      <div>
        {dashboardContents}
        {createProfileContents}
      </div>
    );
  }
}

const mapStateToProp = state => {
  return {
    errors: state.errors,
    profile: state.profile
  };
};

export default connect(
  mapStateToProp,
  { getCurrentProfile, createProfile }
)(withRouter(ProfileContent));

/* 

 <div>
            <p className="lead text-muted">
              {" "}
              Welcome{" "}
              <Link to={`/profile/${profile.handle}`}> {user.name} </Link>
            </p>
          </div>




*/
