import React from 'react';
import { connect } from 'react-redux';
import { addProductToCart } from '../../actions';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

const ProductDetail = props => {
  const { name, price, description, image, offerPrice } = props.product;

  const onCart = e => {
    e.preventDefault();
    props.dispatch(addProductToCart(props.product));
  };

  return (
    <div class="row">
      <div class="col-md-6">
        <Carousel>
          <div>
            <img src={`http://192.168.0.102:5000${image[0]}`} />
          </div>
        </Carousel>
      </div>
      <div class="col-md-6">
        <div class="productInfo__container">
          <h2 class="productInfo__title">{name}</h2>
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
          </div>
          <div class="product-options-bottom">
            <div class="box-tocart">
              <div class="actions">
                <a class="btn-add withbackground" onClick={onCart}>
                  Add To Cart
                </a>
                {/* <a  class="btn-add withborder"><i class="fa fa-heart"></i></a>  */}
              </div>
            </div>
          </div>

          {/* <div class="product-description">
            <p>{strip_html_tags(description)}</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default connect()(ProductDetail);
