import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withAlert } from 'react-alert';
import '../styles_components/submit.scss';
// import formFeild
import TextFeildGroup from '../commonFeilds/TextFeildGroup';

// connect redux
import { connect } from 'react-redux';
import { registeruser } from '../../actions/authAction';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    phone: '',
    address: '',
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticate) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    // it's runs when our components recive new props
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value // [e] ==>> add variable in object
    });
  };

  showError = errors => {
    typeof errors === 'string' &&
      alert.error(typeof errors === 'string' && errors);
  };

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      phone: this.state.phone,
      address: this.state.address
    };

    // this is when action get's fired
    this.props.registeruser(newUser, this.props.history); // passing user object to action

    this.showError();
  };

  render() {
    const { errors } = this.state;
    const { alert } = this.props;
    this.showError(errors);
    return (
      <div className="register">
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFeildGroup
                  name="name"
                  placeholder="name"
                  type="text"
                  value={this.state.name}
                  onChange={this.onChange}
                  errors={errors.name}
                />

                <TextFeildGroup
                  name="email"
                  placeholder="Email Address"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  errors={errors.email}
                />

                <TextFeildGroup
                  name="password"
                  placeholder="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  errors={errors.password}
                />

                <TextFeildGroup
                  name="password2"
                  placeholder="Confirm Password"
                  type="password"
                  value={this.state.password2}
                  onChange={this.onChange}
                  errors={errors.password2}
                />

                <TextFeildGroup
                  name="phone"
                  placeholder="Phone No"
                  type="text"
                  value={this.state.phone}
                  onChange={this.onChange}
                  errors={errors.phone}
                />

                <TextFeildGroup
                  name="address"
                  placeholder="Address"
                  type="text"
                  value={this.state.address}
                  onChange={this.onChange}
                  errors={errors.address}
                />

                <div className="form">
                  <input
                    type="submit"
                    value="Create Account"
                    id="input-submit"
                  />{' '}
                </div>
              </form>
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
    errors: state.errors
  };
}; // make avaiable for component by prop

// checking the proptypes

export default connect(mapStateToProp, { registeruser })(
  withRouter(withAlert()(Register))
);
