import axios from "axios";
import { getApi } from "../utilities/wooApi";
import {
	ADD_PRODUCT,
	GET_ERRORS,
	CLEAR_ERRORS,
	GET_PRODUCTS,
	GET_PRODUCT,
	PRODUCT_SUCCESSFULL,
	GET_REVIEWS
} from "./types";

// Add Post
export const addProductAction = PrductData => dispatch => {
	axios
		.post("/api/admin/product/addProduct", PrductData)
		.then(res => {
			dispatch(clearErrors());
			dispatch({
				type: ADD_PRODUCT,
				payload: res.data
			});
			dispatch({
				type: PRODUCT_SUCCESSFULL
			});
			return true;
		})
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
			return false;
		});
};

// Get products
export const getProductAction = () => dispatch => {
	axios
		.get("/api/products/getProduct")
		.then(res => {
			let products;
			if (res.data) {
				products = res.data.product;
			}
			dispatch({
				type: GET_PRODUCTS,
				payload: products
			});
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// Get products
export const getAProductAction = id => dispatch => {
	// axios
	//   .get(`/api/products/getAProduct/${id}`)
	//   .then(res => {
	//     dispatch({
	//       type: GET_PRODUCT,
	//       payload: res.data
	//     });
	//   })
	//   .catch(err =>
	//     dispatch({
	//       type: GET_ERRORS,
	//       payload: err.response.data
	//     })
	//   );
	getApi(`/wp-json/wc/v3/products/${id}`)
		.then(product => {
			dispatch({
				type: GET_PRODUCT,
				payload: product
			});
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err
			})
		);
};

// Get products
export const deleteProductAction = id => dispatch => {
	axios
		.delete(`/api/admin/product/deleteProduct/${id}`)
		.then(res => {
			const products = res.data.product;
			dispatch({
				type: GET_PRODUCTS,
				payload: products
			});
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// Add Review
export const addProductReview = (product_id, reviewData) => dispatch => {
	dispatch(clearErrors());
	axios
		.post(`/api/products/addProductReview/${product_id}`, reviewData)
		.then(res =>
			dispatch({
				type: GET_REVIEWS,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// Delete Review
export const deleteReview = (product_id, reviewId) => dispatch => {
	axios
		.delete(`/api/admin/product/rmreview/${product_id}/${reviewId}`)
		.then(res =>
			dispatch({
				type: GET_REVIEWS,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// Delete Review
export const getProductReviews = product_id => dispatch => {
	getApi(`/wp-json/wc/v2/products/${product_id}/reviews`)
		.then(reviews =>
			dispatch({
				type: GET_REVIEWS,
				payload: reviews
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err
			})
		);
	// axios
	//   .get(`/api/products/getReviews/${product_id}`)
	//   .then(res =>
	//     dispatch({
	//       type: GET_REVIEWS,
	//       payload: res.data
	//     })
	//   )
	// .catch(err =>
	//   dispatch({
	//     type: GET_ERRORS,
	//     payload: err.response.data
	//   })
	// );
};

// Clear errors
export const clearErrors = () => {
	return {
		type: CLEAR_ERRORS
	};
};
