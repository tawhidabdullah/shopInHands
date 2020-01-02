import React, { Component } from 'react';
import { getProductAction } from '../../actions/productAction';
import Carousel from '../../components/Carousel';
import { connect } from 'react-redux';
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

      const categoryRes = await axios.get(`${baseApiURL}/api/category/list`);

      const categories = categoryRes.data;

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
      // console.log(err);
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
                      key={tag._id}
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
                <Carousel
                  imagesContents={
                    (sliderImageContents && sliderImageContents.items) || []
                  }
                />
              )}
            </div>
            <div className="col-md-3 col-sm-12">
              <div
                className="row"
                style={{
                  height: '100%'
                }}
              >
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
                              objectFit: 'cover'
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

        {categories && categories.length > 0 ? (
          <>
            {categories.map(cat => {
              if (cat.name === 'Uncategorized') {
              } else {
                return (
                  <React.Fragment key={cat._id}>
                    <Products
                      categoryId={cat._id}
                      categoryName={cat.name}
                      products={cat.product}
                    />
                  </React.Fragment>
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
