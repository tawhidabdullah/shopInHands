import React, { Component } from "react";
import FilterBar from "../../containers/FilterBar/FilterBar";
import ProductList from "../../containers/ProductList/ProductList";
import Pagination from "../../components/Pagination/Pagination";
import { getProductAction } from "../../actions/productAction";
import Carousel from "../../components/Carousel";
import { connect } from "react-redux";



import "./Home.scss";

class Home extends Component {
  componentWillMount() {
    this.props.getProductAction();
  }

  render() {
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
    console.log("imgg22", imgTwo);

    return (
      <React.Fragment>
       

      <section className="image-slider-section">
        <div className="row">
          <div className="col-md-9">
            <Carousel />
          </div>
          <div className="col-md-3">
            <div className="row">
              <div className="col-md-12">
                <img
                  src={require('./banner-3.jpg')}
                  alt="Banner Img"
                />
              </div>
              <div className="col-md-12 " style={{ marginTop: '15px' }}>
                <img
                  src={require('./banner-4.jpg')}
                  alt="Banner Img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

          {/* <div className="row product-section">
            <FilterBar />
            <ProductList />
          </div> */}
      </React.Fragment>
    );
  }
}

const mapStateToProp = state => {
  return {
    products: state.product
  };
};
export default connect(
  mapStateToProp,
  { getProductAction }
)(Home);
