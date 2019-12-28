// actions is tough to understand
//Actions must have a type
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { postApi } from '../utilities/wooApi';
import { baseApiURL } from '../constants/variable';

// import setAuthorizationToken
import setAuthorizationToken from '../utilities/setAuthorizationToken';

// import TYPES
import { GET_ERRORS, SET_CURRENT_USER } from './types';

// Register user
export const registeruser = (userData, history) => async dispatch => {
  try {
    const response = await axios.post(
      `${baseApiURL}/customer/auth/register`,
      userData
    );
    console.log('response', response.data);
    history.push('/login');
  } catch (err) {
    console.log('registering err');

    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }

  // postApi('/wp-json/wp/v2/users/register', userData, 'auth')
  //   .then(res => {
  //     if (res.data.status === 400 || 403) {
  //       throw new Error(res.message);
  //     } else {
  //       history.push('/login');
  //     }
  //   })
  //   .catch(err =>
  //     dispatch({
  //       type: GET_ERRORS,
  //       payload: err.message
  //     })
  //   );
};
// when registeruser action get's called uporer function ta fired kore

// Login - Get user token //////////////////////////////////////
export const loginUser = userData => async dispatch => {
  try {
    const awaitedRes = await fetch(`${baseApiURL}/customer/auth/login`, {
      body: JSON.stringify(userData),
      method: 'post',
      credentials: 'include',
      headers: new Headers({
        'content-type': 'application/json'
      })
    });

    if (awaitedRes.ok) {
      const res = await axios({
        url: `${baseApiURL}/customer/api/detail`,
        method: 'get',
        withCredentials: true
      });

      try {
        dispatch(setCurrentUser(res.data));
      } catch (err) {
        console.log('something went wrong when fetching the user data', err);
      }
    } else {
      dispatch({
        type: GET_ERRORS,
        payload: await awaitedRes.json()
      });
    }
  } catch (err) {
    console.log('something went wrong when login', err);
  }
};

// Log out User

export const getCurrentUser = () => dispatch => {
  axios({
    url: `${baseApiURL}/customer/api/detail`,
    method: 'get',
    withCredentials: true
  })
    .then(res => {
      dispatch(setCurrentUser(res.data));
    })
    .catch(err =>
      console.log('something went wrong when fetching the user data', err)
    );
};

export const logoutUser = () => dispatch => {
  document.cookie = ''; // remove the token from localStorage
  //set currentUser to empty object=>which will set isAuthenticate to false
  axios({
    url: `${baseApiURL}/customer/auth/logout`,
    method: 'get',
    withCredentials: true
  })
    .then(res => {
      dispatch(setCurrentUser({}));
    })
    .catch(err =>
      console.log('something went wrong when fetching the user data', err)
    );
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

/// types and action are friends
// actions will go to the reducers
////////////////////////////////////////////////////////////
