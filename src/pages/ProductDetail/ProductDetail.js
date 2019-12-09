import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ProductDetailComponent from '../../components/ProductDetail/ProductDetail';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import Breadcrumb from '../../components/styles_components/Breadcrumb';
import Product from '../../components/Product/Product';
import {
  getAProductAction,
  addProductReview,
  getProductAction
} from '../../actions/productAction';
import Spinner from '../../components/commonFeilds/Spinner';
import ReviewContent from '../../components/ReviewContent/ReviewContent';
import AddReview from '../../components/AddReview/AddReview';

import './ProductDetail.scss';

class ProductDetail extends Component {
  state = {
    clickedAddReview: false
  };

  componentDidMount() {
    const productId = this.props.match.params.id;
    this.props.getAProductAction(productId);
    // this.props.getProductAction();
  }

  onAddRateButtonClick = () => {
    const { isAuthenticate } = this.props.user;
    if (!isAuthenticate) {
      this.props.history.push('/login');
    } else {
      const clickedAddReview = this.state.clickedAddReview;
      this.setState({
        clickedAddReview: !clickedAddReview
      });
    }
  };

  render() {
    const productId = this.props.match.params.id;
    const { product } = this.props.product;

    let ProductDetailContent = <Spinner />;
    if (product) {
      const { images } = product;
      ProductDetailContent = (
        <div className="row">
          {/* <ProductSlider imgData={product.productImage} /> */}
          <ProductDetailComponent product={product} />
        </div>
      );
    }

    return (
      <div class="singleProduct">
        <div class="container-fluid singleProduct__container">
            <div class="row">
                <div class="col-md-9">
                 <div class="row">
                        <div class="col-md-6">
                                olo
                            </div>
                            <div class="col-md-6">
                                <div class="productInfo__container">
                                    <h2 class="productInfo__title">Touch Wireless Bluetooth Portable Speaker</h2>
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
                                                <span>Review</span>
                                            </h3>
                                            
                                            <h3 class="reviews-actions">
                                                Add New Reviews
                                            </h3>
                                        </div>
            
                                        <div class="product-price-box">
                                            <h2 class="special-price">
                                                    $60.00
                                            </h2>
                                            <h2 class="old-price">
                                                    $65.00
                                            </h2>
                                        </div>
                                    </div>
                                    <div class="product-options-bottom">
                                        <div class="box-tocart">
                                            <div class="actions">
                                               <a  class="btn-add withbackground">Add To Cart</a> 
                                               <a  class="btn-add withborder"><i class="fa fa-heart"></i></a> 
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


                 <div class="row">
                     <div class="productDetails__container">
                         <ul class="productDetails__tablist">
                             <li class="productDetails__tablist-item">
                                 <a href="#" class="productDetails__tablist-link">
                                     Details
                                 </a>
                             </li>
                             <li class="productDetails__tablist-item">
                                    <a href="#" class="productDetails__tablist-link">
                                        Details
                                    </a>
                                </li>
                            <li class="productDetails__tablist-item">
                                    <a href="#" class="productDetails__tablist-link">
                                        Details
                                    </a>
                            </li>
                            <li class="productDetails__tablist-item">
                                    <a href="#" class="productDetails__tablist-link">
                                        Details
                                    </a>
                            </li>
                         </ul>
                         <div class="productDetails__content">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                Dicta quod consequatur soluta porro voluptate accusamus 
                                pariatur sapiente illo 
                                corporis aliquam quaerat dolorum fugit consectetur nemo 
                                sunt recusandae, quisquam excepturi maiores.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                Dicta quod consequatur soluta porro voluptate accusamus 
                                pariatur sapiente illo 
                                corporis aliquam quaerat dolorum fugit consectetur nemo 
                                sunt recusandae, quisquam excepturi maiores.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                Dicta quod consequatur soluta porro voluptate accusamus 
                                pariatur sapiente illo 
                                corporis aliquam quaerat dolorum fugit consectetur nemo 
                                sunt recusandae, quisquam excepturi maiores.
                         </div>
                     </div>
                 </div>



                </div>
                <div class="col-md-3">
                    <div class="services-sidebar">
                        <ul>
                            <li>
                                <div class="service-content">
                                    <div class="service-icon">
                                        <i class="fa fa-truck"></i>
                                    </div>
                                    <div class="service-info">
                                        <h4>
                                            Free Delivery
                                        </h4>
                                        <p>From $59.89</p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                    <div class="service-content">
                                        <div class="service-icon">
                                            <i class="fa fa-truck"></i>
                                        </div>
                                        <div class="service-info">
                                            <h4>
                                                Free Delivery
                                            </h4>
                                            <p>From $59.89</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                        <div class="service-content">
                                            <div class="service-icon">
                                                <i class="fa fa-truck"></i>
                                            </div>
                                            <div class="service-info">
                                                <h4>
                                                    Free Delivery
                                                </h4>
                                                <p>From $59.89</p>
                                            </div>
                                        </div>
                                    </li>
                        </ul>
                    </div>

                    <div class="small__filterProducts">
                        <div class="block-title">
                           <span>
                                Best Sellers
                           </span>
                        </div>
                        <div class="small-products-items">
                            <div class="small-product-item">
                                <div class="small-product-item-box-img">
                                    <img src="http://magento2.flytheme.net/themes/sm_shopping/default/lightweight-on-ear-headphones-black.html" class="product photo product-item-photo" alt="" />
                                </div>
                                <div class="small-product-info">
                                <div class="small-product-reviews-summary">
                                        <h3 class="small-rating-summary">
                                        
                                            <i class="fa fa-star" aria-hidden="true"></i>
                                            <i class="fa fa-star" aria-hidden="true"></i>
                                            <i class="fa fa-star" aria-hidden="true"></i> 
                                            <i class="fa fa-star-half-o" aria-hidden="true"></i>
                                            <i class="fa fa-star-o" aria-hidden="true"></i>

                                        </h3>
                                        
                                    </div>

                                    <h2 class="small-product-title">
                                        Lightweight Great Product
                                    </h2>
                                    <h2 class="small-product-price">
                                        $2.20
                                    </h2>
                                </div>
                            </div>
                            <div class="small-product-item">
                                    <div class="small-product-item-box-img">
                                        <img src="http://magento2.flytheme.net/themes/sm_shopping/default/lightweight-on-ear-headphones-black.html" 
                                        class="product photo product-item-photo" alt="" />
                                    </div>
                                    <div class="small-product-info">
                                    <div class="small-product-reviews-summary">
                                            <h3 class="small-rating-summary">
                                            
                                                <i class="fa fa-star" aria-hidden="true"></i>
                                                <i class="fa fa-star" aria-hidden="true"></i>
                                                <i class="fa fa-star" aria-hidden="true"></i> 
                                                <i class="fa fa-star-half-o" aria-hidden="true"></i>
                                                <i class="fa fa-star-o" aria-hidden="true"></i>
    
                                            </h3>
                                            
                                        </div>
    
                                        <h2 class="small-product-title">
                                            Lightweight Great Product
                                        </h2>
                                        <h2 class="small-product-price">
                                            $2.20
                                        </h2>
                                    </div>
                                </div>
                                <div class="small-product-item">
                                        <div class="small-product-item-box-img">
                                            <img 
                                            src="http://magento2.flytheme.net/themes/sm_shopping/default/lightweight-on-ear-headphones-black.html" 
                                            class="product photo product-item-photo" alt="" />
                                        </div>
                                        <div class="small-product-info">
                                        <div class="small-product-reviews-summary">
                                                <h3 class="small-rating-summary">
                                                
                                                    <i class="fa fa-star" aria-hidden="true"></i>
                                                    <i class="fa fa-star" aria-hidden="true"></i>
                                                    <i class="fa fa-star" aria-hidden="true"></i> 
                                                    <i class="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i class="fa fa-star-o" aria-hidden="true"></i>
        
                                                </h3>
                                                
                                            </div>
        
                                            <h2 class="small-product-title">
                                                Lightweight Great Product
                                            </h2>
                                            <h2 class="small-product-price">
                                                $2.20
                                            </h2>
                                        </div>
                                    </div>
                                    <div class="small-product-item">
                                            <div class="small-product-item-box-img">
                                                <img s
                                                rc="http://magento2.flytheme.net/themes/sm_shopping/default/lightweight-on-ear-headphones-black.html"
                                               class="product photo product-item-photo" alt="" />
                                            </div>
                                            <div class="small-product-info">
                                            <div class="small-product-reviews-summary">
                                                    <h3 class="small-rating-summary">
                                                    
                                                        <i class="fa fa-star" aria-hidden="true"></i>
                                                        <i class="fa fa-star" aria-hidden="true"></i>
                                                        <i class="fa fa-star" aria-hidden="true"></i> 
                                                        <i class="fa fa-star-half-o" aria-hidden="true"></i>
                                                        <i class="fa fa-star-o" aria-hidden="true"></i>
            
                                                    </h3>
                                                    
                                                </div>
            
                                                <h2 class="small-product-title">
                                                    Lightweight Great Product
                                                </h2>
                                                <h2 class="small-product-price">
                                                    $2.20
                                                </h2>
                                            </div>
                                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>



    );
  }
}

const mapStateToProps = state => {
  return {
    product: state.product,
    user: state.auth
  };
};

export default connect(mapStateToProps, {
  getAProductAction,
  addProductReview,
  getProductAction
})(withRouter(ProductDetail));

/* 




*/
