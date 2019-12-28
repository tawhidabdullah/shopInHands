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
import axios from 'axios';
import { baseApiURL } from '../../constants/variable';

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
      const categoryRes = await axios.get(`${baseApiURL}/api/category/list`);

      const categories = categoryRes.data;

      console.log('categories result', categories);

      // const sliderImageContents = await getApi(
      //   '/wp-json/wp-rest-api-sidebars/v1/sidebars/slider'
      // );

      const imageContentRes = await axios.get(
        `${baseApiURL}/api/component/detail/name/Slider`
      );

      const sliderImageContents = imageContentRes.data;

      const sliderRightRes = await axios.get(
        `${baseApiURL}/api/component/detail/name/sliderRight`
      );

      const sliderRight = sliderRightRes.data;

      const tagRes = await axios.get(`${baseApiURL}/api/tag/list`);

      const tags = tagRes.data;

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
                          pathname: `/productsListing/${tag._id}`,
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
                <Carousel imagesContents={sliderImageContents.items} />
              )}
            </div>
            <div className="col-md-3">
              <div className="row">
                {sliderRight &&
                  sliderRight.items &&
                  sliderRight.items.map((item, index) => {
                    return (
                      <div
                        className="col-md-12"
                        style={{
                          marginTop: `${
                            index + 1 === sliderRight.items.length ? '25px' : ''
                          }`
                        }}
                      >
                        <a href={`${item.a}`}>
                          <img
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain'
                            }}
                            src={`${baseApiURL}${item.img}`}
                            alt="Second slide"
                          />
                        </a>
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
                    categoryId={cat._id}
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
