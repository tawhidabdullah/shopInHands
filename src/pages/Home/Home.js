import React, { Component } from 'react';
import { getProductAction } from '../../actions/productAction';
import Carousel from '../../components/Carousel';
import { connect } from 'react-redux';
import { getApi } from '../../utilities/wooApi';
import Products from './products';
import './Home.scss';
import { withRouter } from 'react-router-dom';
import Spinner from '../../components/commonFeilds/Spinner';
import Footer from '../../components/Footer/Footer';
import ReactHtmlParser from 'react-html-parser';
import axios from 'axios';

class Home extends Component {
  state = {
    products: [],
    tags: [],
    isProductLoading: false,
    categories: [],
    sliderImageContents: {},
    sliderRight: {},
    isLoading: false
  };

  async componentDidMount() {
    try {
      this.setState({
        ...this.state,
        isLoading: true
      });

      // const categories = await getApi('/wp-json/wc/v3/products/categories');
      const categoryRes = await axios.get(
        'http://192.168.0.102:5000/api/category/list'
      );

      const categories = categoryRes.data;

      console.log('categories result', categories);

      const sliderImageContents = await getApi(
        '/wp-json/wp-rest-api-sidebars/v1/sidebars/slider'
      );

      const sliderRight = await getApi(
        '/wp-json/wp-rest-api-sidebars/v1/sidebars/slider-right'
      );

      const tags = await getApi('/wp-json/wc/v3/products/tags');

      this.setState({
        ...this.state,
        categories: categories,
        sliderImageContents,
        isLoading: false,
        sliderRight,
        tags
      });
    } catch (err) {
      this.setState({
        ...this.state,
        isLoading: false
      });
      console.log(err);
    }
  }

  render() {
    const {
      categories,
      isLoading,
      sliderImageContents,
      sliderRight,
      tags
    } = this.state;
    let fiveProducts;
    if (this.props.products.products) {
      fiveProducts = this.props.products.products.splice(0, 5);
    }

    const fiveImages = fiveProducts.map(product => {
      return product.productImage;
    });
    const imgOne = fiveImages[0];
    const imgTwo = fiveImages[1];
    const imgThree = fiveImages[2];
    console.log('imgg22', imgTwo);

    return (
      <React.Fragment>
        <div className="top-tags">
          <h5
            className="top-tags-desc"
            onClick={() => this.props.history.push('/cart')}
          >
            Top Tags:
          </h5>

          <div className="tags">
            {tags && tags.length > 0
              ? tags.map(tag => {
                  return (
                    <h5
                      onClick={() =>
                        this.props.history.push({
                          pathname: `/productsListing/${tag.id}`,
                          state: { tagId: true }
                        })
                      }
                    >
                      {tag.name}
                    </h5>
                  );
                })
              : ''}
          </div>
        </div>
        <section className="image-slider-section">
          <div className="row">
            <div className="col-md-9 col-sm-12 image-slider-section-carousel">
              {!isLoading && (
                <Carousel imagesContents={sliderImageContents.widgets} />
              )}
            </div>
            <div className="col-md-3">
              <div className="row">
                {sliderRight &&
                  sliderRight.widgets &&
                  sliderRight.widgets.map((imgContent, index) => {
                    return (
                      <div
                        className="col-md-12"
                        style={{
                          marginTop: `${
                            index + 1 === sliderRight.widgets.length
                              ? '25px'
                              : ''
                          }`
                        }}
                      >
                        {ReactHtmlParser(imgContent.rendered)}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </section>

        {/* <div className="row product-section">
            <FilterBar />
            <ProductList />
          </div> */}

        {categories && categories.length > 0 ? (
          <>
            {categories.map(cat => {
              if (cat.name === 'Uncategorized') {
              } else {
                return (
                  <Products
                    categoryId={cat.id}
                    categoryName={cat.name}
                    products={cat.product}
                  />
                );
              }
            })}
            <Footer />
          </>
        ) : (
          <Spinner />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProp = state => {
  return {
    products: state.product
  };
};
export default connect(mapStateToProp, { getProductAction })(withRouter(Home));
