import React, { Component } from 'react';
import { getProductAction } from '../../actions/productAction';
import Carousel from '../../components/Carousel';
import { connect } from 'react-redux';
import { getApi } from '../../utilities/wooApi';
import Products from './products';
import './Home.scss';
import { withRouter } from "react-router-dom";
import Spinner from '../../components/commonFeilds/Spinner';


class Home extends Component {
  state = {
    products: [],
    isProductLoading: false,
    categories: []
  };

  async componentDidMount() {

    try {
      const categories = await getApi('/wp-json/wc/v3/products/categories');
      this.setState({
        categories: categories
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { categories } = this.state;
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
          <h5 className="top-tags-desc" onClick={()=>this.props.history.push('/cart')}>Top Tags:</h5>

          <div className="tags">
            {categories && categories.length > 0
              ? categories.map(cat => {
                  return <h5 onClick={()=>this.props.history.push(`/productsListing/${cat.id}`)}>{cat.name}</h5>;
                })
              : ''}
          </div>
        </div>
        <section className="image-slider-section">
          <div className="row">
            <div className="col-md-9 col-sm-12 image-slider-section-carousel">
              <Carousel />
            </div>
            <div className="col-md-3">
              <div className="row">
                <div className="col-md-12 ">
                  <img style={{
                    width: '100%',
                    
                  }} src={require('./banner-3.jpg')} alt="Banner Img" />
                </div>
                <div className="col-md-12 " style={{ marginTop: '15px' }}>
                  <img  style={{
                    width: '100%',
                    
                  }}  src={require('./banner-4.jpg')} alt="Banner Img" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <div className="row product-section">
            <FilterBar />
            <ProductList />
          </div> */}

          
          {
            this.state.categories.length > 0 ? (
              categories.map(cat => {
                if (cat.name === 'Uncategorized') {
                } else {
                  return <Products categoryId={cat.id} categoryName={cat.name} />;
                }
              })
            ): <Spinner />
          }
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
