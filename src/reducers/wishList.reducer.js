import {
  ADD_WISHLIST,
  GET_WISHLIST,
  DELETE_WISHLIST,
  PRODUCT_LOADING,
  GET_WISHLISTS,
  PRODUCT_SUCCESSFULL
} from "../actions/types";

const initialState = {
  wishLists: [],
  wishList: {},
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
    case GET_WISHLIST:
      return {
        ...state,
        wishList: action.payload,
        loading: false
      };
    case ADD_WISHLIST:
      return {
        ...state,
        wishLists: [action.payload, ...state.wishLists]
      };
    case GET_WISHLISTS:
      return {
        ...state,
        wishLists: action.payload
      };
    case DELETE_WISHLIST:
      return {
        ...state,
        wishLists: state.wishLists.filter(
          wishList => wishList._id !== action.payload
        )
      };
    default:
      return state;
  }
}
