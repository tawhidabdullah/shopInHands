import { combineReducers } from "redux";
import shop from "./shop.reducer";
import { brandFilterReducer } from "./brand.filter.reducer";
import { orderByPriceReducer } from "./orderByPrice.filter.reducer";
import { paginationReducer } from "./pagination.reducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import productReducer from "./products.Reducer";
import categoryReducer from "./category.reducer";
import wishListReducer from "./wishList.reducer";
import reviewReducer from "./review.reducer";
export default combineReducers({
  shop,
  brandFilter: brandFilterReducer,
  orderBy: orderByPriceReducer,
  pagination: paginationReducer,
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  product: productReducer,
  category: categoryReducer,
  wishList: wishListReducer,
  review: reviewReducer
});
