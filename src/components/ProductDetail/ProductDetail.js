import React from 'react';
import { connect } from 'react-redux';
import { addProductToCart, removeProductToCart } from '../../actions';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { baseApiURL } from '../../constants/variable';
import Moment from 'react-moment';
import { withAlert } from 'react-alert';
import { withRouter } from 'react-router';

import './ProductDetail.scss';
const ProductDetail = props => {
  const {
    name,
    price,
    description,
    image,
    offerPrice,
    brand,
    tags,
    category,
    offerEndDate,
    model,
    minimumStock,
    _id
  } = props.product;

  const { cartItems, alert, history } = props;

  const onCart = e => {
    e.preventDefault();

    if (cartItems && cartItems.length > 0) {
      const isItemExistInCart = cartItems.find(item => item._id === _id);
      if (isItemExistInCart) {
        props.removeProductToCart(_id);
        alert.success('Product Has Been Removed From the Cart');
      } else {
        props.addProductToCart(props.product);
        alert.success('Product Added To The Cart');
      }
    } else {
      props.addProductToCart({ ...props.product });
      alert.success('Product Added To The Cart');
    }
  };

  const AddCartContent = () => {
    if (props.cartItems && props.cartItems.length > 0) {
      const isItemExistInCart = props.cartItems.find(item => item._id === _id);
      if (isItemExistInCart) {
        return 'Added';
      } else return 'Add To Cart';
    } else {
      return 'Add To Cart';
    }
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <Carousel>
          {image &&
            image.length > 0 &&
            image.map(src => {
              return (
                <div
                  style={{
                    maxHeight: '500px'
                  }}
                  key={src}
                >
                  <img
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain'
                    }}
                    src={`${baseApiURL}${src}`}
                  />
                </div>
              );
            })}
        </Carousel>
      </div>
      <div className="col-md-6">
        <div className="productInfo__container">
          <h2 className="productInfo__title">{name}</h2>

          <div className="productInfo__price">
            <div className="product-reviews-summary">
              {/* <h3 className="rating-summary">
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star-half-o" aria-hidden="true"></i>
                <i className="fa fa-star-o" aria-hidden="true"></i>
              </h3>
              <h3 className="reviews-actions">
                <span className="review-count">1</span>
                <span> Review</span>
              </h3>
              <h3 className="reviews-actions">Add New Reviews</h3> */}
            </div>

            <div className="product-price-box">
              <h2 className="special-price">৳{offerPrice}</h2>
              <h2 className="old-price">৳{price}</h2>
            </div>

            <div className="tagAttributes">
              {brand && brand.length > 0 && 'Brand :'}
              {brand &&
                brand.length > 0 &&
                brand.map(item => (
                  <span key={item.name} className="tagAttribute">
                    {item.name},
                  </span>
                ))}
            </div>

            <div className="tagAttributes">
              {category && category.length > 0 && 'Category :'}
              {category &&
                category.length > 0 &&
                category.map(item => (
                  <span
                    key={item.name}
                    className="tagAttribute"
                    onClick={() => history.push(`/productsListing/${item._id}`)}
                  >
                    {item.name},
                  </span>
                ))}
            </div>
          </div>
          <div className="product-description">
            <p>{description}</p>
          </div>
          <div className="product-options-bottom">
            <div className="box-tocart">
              <div className="actions">
                <a className="btn-add withbackground" onClick={onCart}>
                  {AddCartContent()}
                </a>
                {/* <a  className="btn-add withborder"><i className="fa fa-heart"></i></a>  */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProp = state => {
  return {
    cartItems: state.shop.cart
  };
};

export default connect(mapStateToProp, {
  addProductToCart,
  removeProductToCart
})(withRouter(withAlert()(ProductDetail)));
