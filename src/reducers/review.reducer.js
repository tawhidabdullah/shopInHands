import { GET_REVIEWS, DELETE_REVIEW } from "../actions/types";

const initialState = {
  reviews: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_REVIEWS:
      return {
        ...state,
        reviews: action.payload
      };
    case DELETE_REVIEW:
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
