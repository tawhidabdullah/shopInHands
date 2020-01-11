import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (!auth.isLoading && !auth.isAuthenticate && <Redirect to="/login" />) || (
        <Component {...props} />
      )
    }
  />
);
const mapStateToProp = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProp)(PrivateRoute);
