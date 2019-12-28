import React from 'react';
import { connect } from 'react-redux';
import { addProductToCart } from '../../actions';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { baseApiURL } from '../../constants/variable';
import Moment from 'react-moment';

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

  const onCart = e => {
    e.preventDefault();
    props.dispatch(addProductToCart(props.product));
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
    <div class="row">
      <div class="col-md-6">
        <Carousel>
          <div
            style={{
              maxHeight: '500px'
            }}
          >
            <img
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
              src={`${baseApiURL}${image[0]}`}
            />
          </div>
        </Carousel>
      </div>
      <div class="col-md-6">
        <div class="productInfo__container">
          <h2 class="productInfo__title">{name}</h2>
          <span
            style={{
              fontSize: '14px',
              color: '#777',
              position: 'absolute',
              right: 30
            }}
          >
            In Stock: {minimumStock}
          </span>
          <div class="productInfo__price">
            <div class="product-reviews-summary">
              {/* <h3 class="rating-summary">
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star-half-o" aria-hidden="true"></i>
                <i class="fa fa-star-o" aria-hidden="true"></i>
              </h3>
              <h3 class="reviews-actions">
                <span class="review-count">1</span>
                <span> Review</span>
              </h3>
              <h3 class="reviews-actions">Add New Reviews</h3> */}
            </div>

            <div class="product-price-box">
              <h2 class="special-price">৳{offerPrice}</h2>
              <h2 class="old-price">৳{price}</h2>
            </div>

            <div
              style={{
                padding: '10px 0'
              }}
            >
              {brand && brand.length > 0 && 'Brand :'}
              {brand &&
                brand.length > 0 &&
                brand.map(item => (
                  <span
                    style={{
                      fontSize: '15px',
                      color: '#666',
                      marginLeft: '5px'
                    }}
                  >
                    {item.name},
                  </span>
                ))}
            </div>

            <div
              style={{
                padding: '10px 0'
              }}
            >
              {category && category.length > 0 && 'Category :'}
              {category &&
                category.length > 0 &&
                category.map(item => (
                  <span
                    style={{
                      fontSize: '15px',
                      color: '#666',
                      marginLeft: '5px'
                    }}
                  >
                    {item.name},
                  </span>
                ))}
            </div>
          </div>
          <div class="product-options-bottom">
            <div class="box-tocart">
              <div class="actions">
                <a class="btn-add withbackground" onClick={onCart}>
                  {AddCartContent()}
                </a>
                {/* <a  class="btn-add withborder"><i class="fa fa-heart"></i></a>  */}
              </div>
            </div>
          </div>

          <div class="product-description">
            <p>{description}</p>
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

export default connect(mapStateToProp, {})(ProductDetail);
