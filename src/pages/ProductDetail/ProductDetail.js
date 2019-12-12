import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ProductDetailComponent from '../../components/ProductDetail/ProductDetail';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import Breadcrumb from '../../components/styles_components/Breadcrumb';
import Product from '../../components/Product/Product';
import { getApi } from '../../utilities/wooApi';

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
    clickedAddReview: false,
    productDetailTabs: {
      isReviews: false,
      isDetails: true,
      isMoreInformation: false,
      product: {}
    }
  };

  toggleTabs = tabName => {
    const tempTabs = { ...this.state.productDetailTabs };
    console.log('temsptabs', tempTabs);
    const tbsMap = Object.keys(tempTabs);
    tbsMap.forEach(tb => {
      if (tb === tabName) {
        tempTabs[tb] = true;
      } else tempTabs[tb] = false;
    });
    this.setState({
      ...this.state,
      productDetailTabs: {
        ...this.state.productDetailTabs,
        ...tempTabs
      }
    });
  };

  componentDidMount() {
    const productId = this.props.match.params.id;
    // this.props.getAProductAction(productId);
    getApi(`/wp-json/wc/v3/products/${productId}`)
      .then(product => {
        this.setState({
          product
        });
      })
      .catch(err => {
        console.log('something went wrong when retreving the product');
      });

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
    const { product } = this.state;

    let ProductDetailContent = <Spinner />;
    if (product && Object.keys(product).length > 0) {
      const { images } = product;
      ProductDetailContent = (
        <>
          <ProductDetailComponent {...this.props} product={product} />
          <div class="row">
            <div class="productDetails__container">
              <ul class="productDetails__tablist">
                <li
                  class="productDetails__tablist-item"
                  onClick={() => this.toggleTabs('isDetails')}
                >
                  <a class="productDetails__tablist-link">Details</a>
                </li>
                <li
                  onClick={() => this.toggleTabs('isMoreInformation')}
                  class="productDetails__tablist-item"
                >
                  <a class="productDetails__tablist-link">More Information</a>
                </li>
                <li
                  onClick={() => this.toggleTabs('isReviews')}
                  class="productDetails__tablist-item"
                >
                  <a class="productDetails__tablist-link">Reviews</a>
                </li>
              </ul>
              <div class="productDetails__content">
                {this.state.productDetailTabs.isDetails ? 'isDetails' : ''}
                {this.state.productDetailTabs.isReviews ? 'isReviews' : ''}
                {this.state.productDetailTabs.isMoreInformation
                  ? 'isMoreInformation'
                  : ''}
              </div>
            </div>
          </div>
        </>
      );
    }

    return (
      <div class="singleProduct">
        <div class="container-fluid singleProduct__container">
          <div class="row">
            <div class="col-md-9">{ProductDetailContent}</div>
            <div class="col-md-3">
              <div class="services-sidebar">
                <ul>
                  <li>
                    <div class="service-content">
                      <div class="service-icon">
                        <i class="fa fa-truck"></i>
                      </div>
                      <div class="service-info">
                        <h4>Free Delivery</h4>
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
                        <h4>Free Delivery</h4>
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
                        <h4>Free Delivery</h4>
                        <p>From $59.89</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div class="small__filterProducts">
                <div class="block-title">
                  <span>Best Sellers</span>
                </div>
                <div class="small-products-items">
                  <div class="small-product-item">
                    <div class="small-product-item-box-img">
                      <img
                        src="http://magento2.flytheme.net/themes/sm_shopping/default/lightweight-on-ear-headphones-black.html"
                        class="product photo product-item-photo"
                        alt=""
                      />
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
                      <h2 class="small-product-price">$2.20</h2>
                    </div>
                  </div>
                  <div class="small-product-item">
                    <div class="small-product-item-box-img">
                      <img
                        src="http://magento2.flytheme.net/themes/sm_shopping/default/lightweight-on-ear-headphones-black.html"
                        class="product photo product-item-photo"
                        alt=""
                      />
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
                      <h2 class="small-product-price">$2.20</h2>
                    </div>
                  </div>
                  <div class="small-product-item">
                    <div class="small-product-item-box-img">
                      <img
                        src="http://magento2.flytheme.net/themes/sm_shopping/default/lightweight-on-ear-headphones-black.html"
                        class="product photo product-item-photo"
                        alt=""
                      />
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
                      <h2 class="small-product-price">$2.20</h2>
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
