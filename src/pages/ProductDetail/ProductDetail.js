import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ProductDetailComponent from '../../components/ProductDetail/ProductDetail';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import Breadcrumb from '../../components/styles_components/Breadcrumb';
import Product from '../../components/Product/Product';
import { getApi } from '../../utilities/wooApi';
import apiConfig from '../../config/apiConfig';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';

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
      product: {},
      relatedProducts: []
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

        const productRelatedIds = product && product.related_ids;
        const auth = new Buffer(
          apiConfig.consumerKey + ':' + apiConfig.consumerSecret
        ).toString('base64');

        axios
          .all(
            productRelatedIds.map(id =>
              axios({
                url: `https://shopinhands.com/wp/wp-json/wc/v3/products/${id}`,
                method: 'GET',
                headers: {
                  Authorization: `Basic ${auth}`,
                  'Content-Type': 'application/json'
                }
              })
            )
          )
          .then(responseArr => {
            //this will be executed only when all requests are complete
            const relatedProducts = responseArr.map(responseItem => {
              return responseItem.data;
            });
            console.log('responseArr', responseArr);
            this.setState({
              relatedProducts
            });
          });
      })
      .catch(err => {
        console.log('something went wrong when retreving the product');
      });
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
      const { images, id } = product;
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
                {this.state.productDetailTabs.isReviews ? (
                  <ReviewContent productId={id} />
                ) : (
                  ''
                )}
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
      (product && Object.keys(product).length > 0 && (
        <>
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
                      {(this.state.relatedProducts &&
                        this.state.relatedProducts.map(item => {
                          return (
                            <div class="small-product-item">
                              <div class="small-product-item-box-img">
                                <img
                                  src={item.images[0].src}
                                  class="product photo product-item-photo"
                                  alt=""
                                />
                              </div>
                              <div class="small-product-info">
                                <div class="small-product-reviews-summary">
                                  <h3 class="small-rating-summary">
                                    <i
                                      class="fa fa-star"
                                      aria-hidden="true"
                                    ></i>
                                    <i
                                      class="fa fa-star"
                                      aria-hidden="true"
                                    ></i>
                                    <i
                                      class="fa fa-star"
                                      aria-hidden="true"
                                    ></i>
                                    <i
                                      class="fa fa-star-half-o"
                                      aria-hidden="true"
                                    ></i>
                                    <i
                                      class="fa fa-star-o"
                                      aria-hidden="true"
                                    ></i>
                                  </h3>
                                </div>

                                <h2 class="small-product-title">{item.name}</h2>
                                <h2 class="small-product-price">
                                  ${item.price}
                                </h2>
                              </div>
                            </div>
                          );
                        })) || <Spinner />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )) || <Spinner />
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
