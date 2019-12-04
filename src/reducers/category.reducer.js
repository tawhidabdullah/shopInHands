import {
  ADD_CATEGORY,
  PRODUCT_SUCCESSFULL,
  GET_CATEGORIES,
  GET_CATEGORY,
  DELETE_CATEGORY
} from "../actions/types";

const initialState = {
  categories: [],
  product: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PRODUCT_SUCCESSFULL:
      return {
        success: true
      };
    case GET_CATEGORY:
      return {
        ...state,
        category: action.payload,
        loading: false
      };
    case ADD_CATEGORY:
      return {
        ...state,
        categories: [action.payload, ...state.categories]
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          category => category._id !== action.payload
        )
      };
    default:
      return state;
  }
}
