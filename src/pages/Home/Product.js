import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { addProductToCart, removeProductToCart } from '../../actions';
import { withAlert } from 'react-alert';

import {
  addWishListAction,
  getWishListsAction,
  deleteWishListAction
} from '../../actions/userAction';
import { baseApiURL } from '../../constants/variable';

const Product = ({
  product,
  addProductToCart,
  history,
  productListing = false,
  cartItems,
  removeProductToCart,
  alert
}) => {
  const { name, price, image, _id } = product;

  const AddCartContent = () => {
    if (cartItems && cartItems.length > 0) {
      const isItemExistInCart = cartItems.find(item => item._id === _id);
      if (isItemExistInCart) {
        return 'Added';
      } else return 'Add To Cart';
    } else {
      return 'Add To Cart';
    }
  };

  const handleCartAction = () => {
    if (cartItems && cartItems.length > 0) {
      const isItemExistInCart = cartItems.find(item => item._id === _id);
      if (isItemExistInCart) {
        removeProductToCart(_id);
        alert.success('Product Has Been Removed From the Cart');
      } else {
        addProductToCart({ ...product });
        alert.success('Product Added To The Cart');
      }
    } else {
      addProductToCart({ ...product });
      alert.success('Product Added To The Cart');
    }
  };

  return (
    <div className="product-card">
      <div className="product-top">
        <img src={`${baseApiURL}${image[0]}`} />
        <div
          className="product-top-overlay"
          onClick={() => history.push(`/products/${_id}`)}
        ></div>

        <div className="overlay-right">
          <Link to={`/products/${_id}`} className="product__link">
            <button
              type="button"
              className="btn btn-secondary"
              title="Quick Shop"
            >
              <i className="fa fa-eye"></i>
            </button>
          </Link>
          <button
            type="button"
            className="btn btn-secondary"
            title="Add To Cart"
            onClick={() => addProductToCart({ ...product })}
          >
            <i className="fa fa-shopping-cart"></i>
          </button>
        </div>
      </div>

      <div className="product-bottom text-center">
        <div className="cart-btn" onClick={handleCartAction}>
          <button className="primary-btn">{AddCartContent()}</button>
        </div>

        <div className="ratingsandtitle">
          <h3 className="product-bottom-title">{name}</h3>
        </div>
        <h5 className="product-bottom-price">৳{price}</h5>
      </div>
    </div>
  );
};

const mapStateToProp = state => {
  return {
    user: state.auth,
    wishList: state.wishList,
    cartItems: state.shop.cart
  };
};

export default connect(mapStateToProp, {
  addWishListAction,
  getWishListsAction,
  deleteWishListAction,
  addProductToCart,
  removeProductToCart
})(withRouter(withAlert()(Product)));
