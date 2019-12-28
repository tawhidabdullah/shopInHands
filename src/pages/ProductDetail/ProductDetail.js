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
import { baseApiURL } from '../../constants/variable';

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
    product: {},
    productDetailTabs: {
      isReviews: false,
      isDetails: true,
      isMoreInformation: false,
      relatedProducts: []
    },
    isLoading: false
  };

  toggleTabs = tabName => {
    const tempTabs = { ...this.state.productDetailTabs };
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

  getProductsAndRelatedProducts = async id => {
    this.setState({
      ...this.state,
      isLoading: true
    });

    try {
      const productRes = await axios.get(
        `${baseApiURL}/api/product/detail/${id}`
      );

      const product = productRes.data;

      this.setState({
        ...this.state,
        product,
        isLoading: false
      });
    } catch (err) {
      this.setState({
        ...this.state,
        isLoading: false
      });
    }
  };

  componentDidMount() {
    const productId = this.props.match.params.id;
    this.getProductsAndRelatedProducts(productId);
    console.log('get a life');
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

  componentDidUpdate(prevProps, prevState) {
    const newId = this.props.match.params.id;
    const prevProductId = prevProps.match.params.id;
    if (prevProductId !== newId) {
      this.setState({
        ...this.state,
        product: {}
      });
      this.getProductsAndRelatedProducts(newId);
    }
  }

  render() {
    const { product, isLoading } = this.state;

    console.log('thegratestProdcut', product);
    let ProductDetailContent = <Spinner />;
    if (product && Object.keys(product).length > 0 && !isLoading) {
      ProductDetailContent = (
        <>
          <ProductDetailComponent {...this.props} product={product} />
        </>
      );
    } else if (product && !Object.keys(product).length > 0 && !isLoading) {
      ProductDetailContent = <h1>Product Not Found</h1>;
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
                    <div class="small__filterProducts">
                      <div class="block-title">
                        <span>Best Sellers</span>
                      </div>
                      {/* <div class="small-products-items">
                        {(this.state.relatedProducts &&
                          this.state.relatedProducts.map(item => {
                            return (
                              <div class="small-product-item">
                                <div
                                  class="small-product-item-box-img"
                                  onClick={() => {
                                    this.props.history.push(
                                      `/products/${item.id}`
                                    );
                                  }}
                                >
                                  <img
                                    src={item.images[0].src}
                                    class="product photo product-item-photo"
                                    alt=""
                                  />
                                </div>
                                <div class="small-product-info">
                                  <h2 class="small-product-title">
                                    ৳{item.price}
                                  </h2>
                                  <h2 class="small-product-price">
                                    ৳{item.regular_price}
                                  </h2>
                                </div>
                              </div>
                            );
                          })) || <Spinner />}
                      </div> */}
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
