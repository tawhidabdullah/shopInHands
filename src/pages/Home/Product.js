import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { addProductToCart, removeProductToCart } from '../../actions';
import {
  addWishListAction,
  getWishListsAction,
  deleteWishListAction
} from '../../actions/userAction';

const Product = ({
  product,
  addProductToCart,
  history,
  productListing = false,
  cartItems,
  removeProductToCart
}) => {
  const { name, price, images, id } = product;

  const AddCartContent = () => {
    if (cartItems && cartItems.length > 0) {
      const isItemExistInCart = cartItems.find(item => item.id === id);
      if (isItemExistInCart) {
        return 'Added';
      } else return 'Add To Cart';
    } else {
      return 'Add To Cart';
    }
  };

  const handleCartAction = () => {
    if (cartItems && cartItems.length > 0) {
      const isItemExistInCart = cartItems.find(item => item.id === id);
      if (isItemExistInCart) {
        removeProductToCart(id);
      } else addProductToCart({ ...product });
    } else {
      return addProductToCart({ ...product });
    }
  };
  return (
    <div
      className="product-card"
      // style={{
      //   minWidth: `${productListing ? '200px' : '250px'}`
      // }}
    >
      <div class="product-top">
        <img src={images[0].src} />
        <div
          className="product-top-overlay"
          onClick={() => history.push(`/products/${id}`)}
        ></div>

        <div class="overlay-right">
          <Link to={`/products/${id}`} className="product__link">
            <button type="button" class="btn btn-secondary" title="Quick Shop">
              <i class="fa fa-eye"></i>
            </button>
          </Link>

          <button
            type="button"
            class="btn btn-secondary"
            title="Add To Wishlist"
          >
            <i class="fa fa-heart-o"></i>
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            title="Add To Cart"
            onClick={() => addProductToCart({ ...product })}
          >
            <i class="fa fa-shopping-cart"></i>
          </button>
        </div>
      </div>

      <div class="product-bottom text-center">
        <div className="cart-btn" onClick={handleCartAction}>
          <button className="primary-btn">{AddCartContent()}</button>
        </div>

        <div className="ratingsandtitle">
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star-half-o"></i>

          <h3 className="product-bottom-title">{name}</h3>
        </div>
        <h5 className="product-bottom-price">${price}</h5>
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
})(withRouter(Product));
