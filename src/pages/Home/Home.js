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



      <section className="product-slider-section">
        <div
          className="row"
          style={{
            borderBottom: '1px solid #ddd',
          }}
        >
          <div className="col-md-6">
            <h2 style={{fontWeight: 'bold', fontSize: '17px'}}>Computers</h2>
          </div>
          <div className="col-md-6">
            {/* <div className="filter-taq-text">
              <h3> 
                Category
              </h3>
              <h3> 
                Category
              </h3>
              <h3> 
                Category
              </h3>
              <h3> 
                Category
              </h3>
              <h3> 
                Category
              </h3>
              <h3> 
                Category
              </h3>
            </div> */}
          </div>
        </div>
        <div className="row" style={{paddingTop: '20px'}}>

        <div class="col-md-3">
              <div className="product-card">
              <div class="product-top">
                <img src={require('./banner-3.jpg')} alt="product image" />
                <div class="overlay-right">
                  <button 
                    type="button"
                    class="btn btn-secondary"
                    title="Quick Shop"
                  >
                    <i class="fa fa-eye"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    title="Add To Wishlist"
                  >
                    <i class="fa fa-heart-o"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    title="Add To Cart"
                  >
                    <i class="fa fa-shopping-cart"></i>
                  </button>
                </div>
              </div>
              <div class="product-bottom text-center">
  
              <div className='cart-btn'>
              <button className='primary-btn'>
                Add to Cart
              </button>
              </div>
  
                <div className='ratingsandtitle'>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star-half-o"></i>
  
                <h3 className='product-bottom-title'>Product Name</h3>
                </div>
                <h5 className='product-bottom-price'>$50.00</h5>
              </div>
              </div>
            </div>


            <div class="col-md-3">
              <div className="product-card">
              <div class="product-top">
                <img src={require('./banner-3.jpg')} alt="product image" />
                <div class="overlay-right">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    title="Quick Shop"
                  >
                    <i class="fa fa-eye"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    title="Add To Wishlist"
                  >
                    <i class="fa fa-heart-o"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    title="Add To Cart"
                  >
                    <i class="fa fa-shopping-cart"></i>
                  </button>
                </div>
              </div>
              <div class="product-bottom text-center">
  
              <div className='cart-btn'>
              <button className='primary-btn'>
                Add to Cart
              </button>
              </div>
  
                <div className='ratingsandtitle'>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star-half-o"></i>
  
                <h3 className='product-bottom-title'>Product Name</h3>
                </div>
                <h5 className='product-bottom-price'>$50.00</h5>
              </div>
              </div>
            </div>


            <div class="col-md-3">
              <div className="product-card">
              <div class="product-top">
                <img src={require('./banner-3.jpg')} alt="product image" />
                <div class="overlay-right">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    title="Quick Shop"
                  >
                    <i class="fa fa-eye"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    title="Add To Wishlist"
                  >
                    <i class="fa fa-heart-o"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    title="Add To Cart"
                  >
                    <i class="fa fa-shopping-cart"></i>
                  </button>
                </div>
              </div>
              <div class="product-bottom text-center">
  
              <div className='cart-btn'>
              <button className='primary-btn'>
                Add to Cart
              </button>
              </div>
  
                <div className='ratingsandtitle'>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star-half-o"></i>
  
                <h3 className='product-bottom-title'>Product Name</h3>
                </div>
                <h5 className='product-bottom-price'>$50.00</h5>
              </div>
              </div>
            </div>


            <div class="col-md-3">
              <div className="product-card">
              <div class="product-top">
                <img src={require('./banner-3.jpg')} alt="product image" />
                <div class="overlay-right">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    title="Quick Shop"
                  >
                    <i class="fa fa-eye"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    title="Add To Wishlist"
                  >
                    <i class="fa fa-heart-o"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    title="Add To Cart"
                  >
                    <i class="fa fa-shopping-cart"></i>
                  </button>
                </div>
              </div>
              <div class="product-bottom text-center">
  
              <div className='cart-btn'>
              <button className='primary-btn'>
                Add to Cart
              </button>
              </div>
  
                <div className='ratingsandtitle'>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star-half-o"></i>
  
                <h3 className='product-bottom-title'>Product Name</h3>
                </div>
                <h5 className='product-bottom-price'>$50.00</h5>
              </div>
              </div>
            </div>




        </div>
      </section>




      <section className="product-slider-section">
        <div
          className="row"
          style={{
            borderBottom: '1px solid #ddd',
          }}
        >
          <div className="col-md-6">
            <h2 style={{fontWeight: 'bold', fontSize: '17px'}}>Computers</h2>
          </div>
          <div className="col-md-6">
            {/* <div className="filter-taq-text">
              <h3> 
                Category
              </h3>
              <h3> 
                Category
              </h3>
              <h3> 
                Category
              </h3>
              <h3> 
                Category
              </h3>
              <h3> 
                Category
              </h3>
              <h3> 
                Category
              </h3>
            </div> */}
          </div>
        </div>
        <div className="row" style={{paddingTop: '20px'}}>

        <div class="col-md-3">
              <div className="product-card">
              <div class="product-top">
                <img src={require('./banner-3.jpg')} alt="product image" />
                <div class="overlay-right">
                  <button 
                    type="button"
                    class="btn btn-secondary"
                    title="Quick Shop"
                  >
                    <i class="fa fa-eye"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    title="Add To Wishlist"
                  >
                    <i class="fa fa-heart-o"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    title="Add To Cart"
                  >
                    <i class="fa fa-shopping-cart"></i>
                  </button>
                </div>
              </div>
              <div class="product-bottom text-center">
  
              <div className='cart-btn'>
              <button className='primary-btn'>
                Add to Cart
              </button>
              </div>
  
                <div className='ratingsandtitle'>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star-half-o"></i>
  
                <h3 className='product-bottom-title'>Product Name</h3>
                </div>
                <h5 className='product-bottom-price'>$50.00</h5>
              </div>
              </div>
            </div>


            <div class="col-md-3">
              <div className="product-card">
              <div class="product-top">
                <img src={require('./banner-3.jpg')} alt="product image" />
                <div class="overlay-right">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    title="Quick Shop"
                  >
                    <i class="fa fa-eye"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    title="Add To Wishlist"
                  >
                    <i class="fa fa-heart-o"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    title="Add To Cart"
                  >
                    <i class="fa fa-shopping-cart"></i>
                  </button>
                </div>
              </div>
              <div class="product-bottom text-center">
  
              <div className='cart-btn'>
              <button className='primary-btn'>
                Add to Cart
              </button>
              </div>
  
                <div className='ratingsandtitle'>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star-half-o"></i>
  
                <h3 className='product-bottom-title'>Product Name</h3>
                </div>
                <h5 className='product-bottom-price'>$50.00</h5>
              </div>
              </div>
            </div>


            <div class="col-md-3">
              <div className="product-card">
              <div class="product-top">
                <img src={require('./banner-3.jpg')} alt="product image" />
                <div class="overlay-right">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    title="Quick Shop"
                  >
                    <i class="fa fa-eye"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    title="Add To Wishlist"
                  >
                    <i class="fa fa-heart-o"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    title="Add To Cart"
                  >
                    <i class="fa fa-shopping-cart"></i>
                  </button>
                </div>
              </div>
              <div class="product-bottom text-center">
  
              <div className='cart-btn'>
              <button className='primary-btn'>
                Add to Cart
              </button>
              </div>
  
                <div className='ratingsandtitle'>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star-half-o"></i>
  
                <h3 className='product-bottom-title'>Product Name</h3>
                </div>
                <h5 className='product-bottom-price'>$50.00</h5>
              </div>
              </div>
            </div>


            <div class="col-md-3">
              <div className="product-card">
              <div class="product-top">
                <img src={require('./banner-3.jpg')} alt="product image" />
                <div class="overlay-right">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    title="Quick Shop"
                  >
                    <i class="fa fa-eye"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    title="Add To Wishlist"
                  >
                    <i class="fa fa-heart-o"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    title="Add To Cart"
                  >
                    <i class="fa fa-shopping-cart"></i>
                  </button>
                </div>
              </div>
              <div class="product-bottom text-center">
  
              <div className='cart-btn'>
              <button className='primary-btn'>
                Add to Cart
              </button>
              </div>
  
                <div className='ratingsandtitle'>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star-half-o"></i>
  
                <h3 className='product-bottom-title'>Product Name</h3>
                </div>
                <h5 className='product-bottom-price'>$50.00</h5>
              </div>
              </div>
            </div>




        </div>
      </section>
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
