import React from 'react';
import { connect } from 'react-redux';
import { formatMoney } from '../../pipes/priceFormatter';
import { addProductToCart } from '../../actions';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';


const ProductDetail = props => {
  const { name, price, description,sale_price } = props.product;

  const onCart = (e) => {
    e.preventDefault(); 
    props.dispatch(addProductToCart(props.product));
  };

  return (
    <div class="row">
    <div class="col-md-6">
    <Carousel>
        <div>
            <img src={require('../../assets/productImages/img5.jpg')} />
        </div>
        <div>
        <img src={require('../../assets/productImages/img4.jpg')} />

        </div>
        <div>
        <img src={require('../../assets/productImages/img1.jpeg')} />

        </div>
   </Carousel>

        </div>
        <div class="col-md-6">
            <div class="productInfo__container">
                <h2 class="productInfo__title">{name}</h2>
                <div class="productInfo__price">
                    <div class="product-reviews-summary">
                        <h3 class="rating-summary">
                       
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
                        
                        <h3 class="reviews-actions">
                             Add New Reviews
                        </h3>
                    </div>

                    <div class="product-price-box">
                        <h2 class="special-price">
                                ${sale_price}
                        </h2>
                        <h2 class="old-price">
                              ${price}
                        </h2>
                    </div>
                </div>
                <div class="product-options-bottom">
                    <div class="box-tocart">
                        <div class="actions">
                           <a  class="btn-add withbackground" onClick={onCart}>Add To Cart</a> 
                           {/* <a  class="btn-add withborder"><i class="fa fa-heart"></i></a>  */}
                        </div>
                    </div>
                </div>

                <div class="product-description">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Dicta quod consequatur soluta porro voluptate accusamus 
                        pariatur sapiente illo 
                        corporis aliquam quaerat dolorum fugit consectetur nemo 
                        sunt recusandae, quisquam excepturi maiores.
                        
                    </p>
                </div>
                
            </div>
        </div>
</div>
  );
};

export default connect()(ProductDetail);
