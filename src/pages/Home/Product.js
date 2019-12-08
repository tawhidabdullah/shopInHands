import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { addProductToCart } from '../../actions';
import {
  addWishListAction,
  getWishListsAction,
  deleteWishListAction
} from '../../actions/userAction';

const Product = ({ product, addProductToCart }) => {
  const { name, price, images } = product;
  return (
    <div class="col-md-3">
      <div className="product-card">
        <div class="product-top">
          <img src={images[0].src} />
          <div className="product-top-overlay"></div>

          <div class="overlay-right">
            <Link to={`/products/${90}`} className="product__link">
              <button
                type="button"
                class="btn btn-secondary"
                title="Quick Shop"
              >
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
            <button type="button" class="btn btn-secondary" title="Add To Cart">
              <i class="fa fa-shopping-cart"></i>
            </button>
          </div>
        </div>

        <div class="product-bottom text-center">
          <div
            className="cart-btn"
            onClick={() => addProductToCart({ ...product })}
          >
            <button className="primary-btn">Add to Cart</button>
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
    </div>
  );
};

const mapStateToProp = state => {
  return {
    user: state.auth,
    wishList: state.wishList
  };
};

export default connect(mapStateToProp, {
  addWishListAction,
  getWishListsAction,
  deleteWishListAction,
  addProductToCart
})(withRouter(Product));
