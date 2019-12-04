import axios from "axios";

import {
  ADD_CATEGORY,
  GET_ERRORS,
  PRODUCT_SUCCESSFULL,
  GET_CATEGORIES
} from "./types";

// Add Post
export const addCategoryAction = categoryData => dispatch => {
  axios
    .post("/api/admin/category/addCategory", categoryData)
    .then(res => {
      dispatch({
        type: ADD_CATEGORY,
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
export const getCategoriesAction = () => dispatch => {
  axios
    .get("/api/admin/category/getCategories")
    .then(res => {
      const categories = res.data.categories;
      dispatch({
        type: GET_CATEGORIES,
        payload: categories
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
export const deleteCategoryAction = id => dispatch => {
    axios
      .delete(`/api/admin/category/deleteCategory/${id}`)
      .then(res => {
        const categories = res.data.categories;
        dispatch({
          type: GET_CATEGORIES,
          payload: categories
        });
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
  