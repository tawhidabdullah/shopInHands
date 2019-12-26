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
export const loginUser = userData => dispatch => {
  fetch(`${baseApiURL}/customer/auth/login`, {
    body: JSON.stringify(userData),
    method: 'post',
    credentials: 'include',
    headers: new Headers({
      'content-type': 'application/json'
    })
  })
    .then(res => res.json())
    .then(res => {
      document.cookie = res.cookie;
    })
    .catch(err => console.log(err));

  // dispatch({
  //   type: GET_ERRORS,
  //   payload: err.response.data
  // });

  // postApi('/wp-json/jwt-auth/v1/token', userData, 'auth')
  //   .then(res => {
  //     if (res.data.status === 403 || 403) {
  //       function strip_html_tags(str) {
  //         if (str === null || str === '') return false;
  //         else str = str.toString();
  //         return str.replace(/<[^>]*>/g, '');
  //       }
  //       throw new Error(strip_html_tags(res.message));
  //     } else {
  //       const { token, user_display_name, user_email, user_nicename } = res; // get token from res.data

  //       localStorage.setItem('jwtToken', token); //save to localStorage
  //       setAuthorizationToken(token); // set Authorization token  to header
  //       // const decoded = jwt_decode(token); // decode token to get user data
  //       dispatch(
  //         setCurrentUser({
  //           user_display_name,
  //           user_email,
  //           user_nicename
  //         })
  //       ); // set current user
  //     }
  //   })
  //   .catch(err => {
  //     dispatch({
  //       type: GET_ERRORS,
  //       payload: err.message
  //     });
  //   });
};

// Log out User

export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwttoken'); // remove the token from localStorage
  setAuthorizationToken(false); // remove Authorization header
  //set currentUser to empty object=>which will set isAuthenticate to false
  dispatch(setCurrentUser({}));
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
