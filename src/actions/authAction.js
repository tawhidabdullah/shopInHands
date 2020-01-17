// actions is tough to understand
//Actions must have a type
import axios from "axios";
import { baseApiURL } from "../constants/variable";

// import setAuthorizationToken
// import setAuthorizationToken from "../utilities/setAuthorizationToken";

// import TYPES
import {
	GET_ERRORS,
	SET_CURRENT_USER,
	GET_ORDERS_STARTED,
	GET_ORDERS_FAIL,
	GET_ORDERS_SUCCESS
} from "./types";

const GET_USER_START = "GET_USER_START";
const GET_USER_COMPLETE = "GET_USER_COMPLETE";
const GET_USER_FAIL = "GET_USER_FAIL";

// Register user
export const registeruser = (userData, history) => async dispatch => {
	try {
		const response = await axios.post(
			`${baseApiURL}/customer/auth/register`,
			userData
		);
		console.log("response", response.data);
		history.push("/login");
	} catch (err) {
		console.log("registering err");

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
export const loginUser = (userData, history) => async dispatch => {
	try {
		const awaitedRes = await fetch(`${baseApiURL}/customer/auth/login`, {
			body: JSON.stringify(userData),
			method: "post",
			credentials: "include",
			headers: new Headers({
				"content-type": "application/json"
			})
		});

		if (awaitedRes.ok) {
			try {
				const res = await axios({
					url: `${baseApiURL}/customer/api/detail`,
					method: "get",
					withCredentials: true
				});
				dispatch(setCurrentUser(res.data));
				history.push("/dashboard");
			} catch (err) {
				// console.log('something went wrong when fetching the user data', err);
			}
		} else {
			dispatch({
				type: GET_ERRORS,
				payload: await awaitedRes.json()
			});
		}
	} catch (err) {
		// console.log('something went wrong when login', err);
	}
};

// Log out User

export const getCurrentUser = () => async dispatch => {
	dispatch({
		type: GET_USER_START
	});
	try {
		const awaitedRes = await axios({
			url: `${baseApiURL}/customer/api/detail`,
			method: "get",
			withCredentials: true
		});

		const res = awaitedRes.data;

		dispatch({
			type: GET_USER_COMPLETE,
			payload: res
		});

		// dispatch(setCurrentUser(res));
	} catch (err) {
		dispatch({
			type: GET_USER_FAIL
		});
	}
};

export const logoutUser = () => dispatch => {
	document.cookie = ""; // remove the token from localStorage
	//set currentUser to empty object=> which will set isAuthenticate to false
	axios({
		url: `${baseApiURL}/customer/auth/logout`,
		method: "get",
		withCredentials: true
	})
		.then(res => {
			dispatch(setCurrentUser({}));
		})
		.catch(err => {
			// console.log('something went wrong when fetching the user dataxxx', err);
		});
};

export const getCustomerOrders = () => async dispatch => {
	try {
		dispatch({
			type: GET_ORDERS_STARTED
		});
		const orderRes = await axios({
			url: `${baseApiURL}/customer/api/order/list`,
			method: "get",
			withCredentials: true
		});

		const orders = await orderRes.data;

		dispatch({
			type: GET_ORDERS_SUCCESS,
			payload: orders
		});
	} catch (err) {
		dispatch({
			type: GET_ORDERS_FAIL
		});
		// console.log('something went wrong when fetching the orders');
	}
};

export const setCurrentUser = decoded => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	};
};
