import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return (
        (auth.isAuthenticated && <Component {...rest} />) ||
        (!auth.isLoading && !auth.isAuthenticated && <Redirect to="/login" />)
      );
    }}
  />
);
const mapStateToProp = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProp)(PrivateRoute);
