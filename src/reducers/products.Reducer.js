import {
  ADD_PRODUCT,
  GET_PRODUCT,
  DELETE_PRODUCT,
  PRODUCT_LOADING,
  GET_PRODUCTS,
  PRODUCT_SUCCESSFULL
} from "../actions/types";

const initialState = {
  products: [],
  product: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PRODUCT_LOADING:
      return {
        ...state,
        loading: true
      };
    case PRODUCT_SUCCESSFULL:
      return {
        success: true
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload,
        loading: false
      };
    case ADD_PRODUCT:
      return {
        ...state,
        products: [action.payload, ...state.products]
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          product => product._id !== action.payload
        )
      };
    default:
      return state;
  }
}
