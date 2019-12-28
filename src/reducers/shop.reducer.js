// import { phones } from "../data/phones";

import {
  ADD_PRODUCT_TO_CART,
  DECREMENT_CART_ITEM_QUANTITY,
  INCREMENT_CART_ITEM_QUANTITY,
  REMOVE_PRODUCT_FROM_CART,
  CLEAR_CART_ACTION
} from '../actions';

import { GET_PRODUCTS } from '../actions/types';

const initialState = {
  products: [],
  cart: []
};

const shopReducer = (state = initialState, action) => {
  let updatedCart;
  let updatedItemIndex;

  switch (action.type) {
    case INCREMENT_CART_ITEM_QUANTITY:
      updatedCart = [...state.cart];
      updatedItemIndex = updatedCart.findIndex(
        item => item._id === action.payload
      );

      const incrementedItem = {
        ...updatedCart[updatedItemIndex]
      };

      incrementedItem.quantity++;

      updatedCart[updatedItemIndex] = incrementedItem;

      return { ...state, cart: updatedCart };

    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };

    case DECREMENT_CART_ITEM_QUANTITY:
      updatedCart = [...state.cart];
      updatedItemIndex = updatedCart.findIndex(
        item => item._id === action.payload
      );

      const decrementedItem = {
        ...updatedCart[updatedItemIndex]
      };

      decrementedItem.quantity--;

      updatedCart[updatedItemIndex] = decrementedItem;

      return { ...state, cart: updatedCart };

    case ADD_PRODUCT_TO_CART:
      updatedCart = [...state.cart];
      updatedItemIndex = updatedCart.findIndex(
        item => item._id === action.payload._id
      );

      if (updatedItemIndex < 0) {
        updatedCart.push({ ...action.payload, quantity: 1 });
      } else {
        const updatedItem = {
          ...updatedCart[updatedItemIndex]
        };

        updatedItem.quantity++;
        updatedCart[updatedItemIndex] = updatedItem;
      }

      return { ...state, cart: updatedCart };
    case REMOVE_PRODUCT_FROM_CART:
      updatedCart = [...state.cart];
      updatedItemIndex = updatedCart.findIndex(
        item => item._id === action.payload
      );

      updatedCart.splice(updatedItemIndex, 1);

      return { ...state, cart: updatedCart };

    case CLEAR_CART_ACTION:
      return { ...state, cart: action.payload };
    default:
      return state;
  }
};

export default shopReducer;
