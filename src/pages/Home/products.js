import React, { useState } from 'react';
import Product from './Product';
import { withRouter } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';
import Carousel from 'react-multi-carousel';
import Spinner from '../../components/commonFeilds/Spinner';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 6
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5
  },
  tablet: {
    breakpoint: { max: 1024, min: 700 },
    items: 3
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const Products = ({ categoryId, categoryName, history, products }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <section
      className="product-slider-section"
      style={{
        marginTop: '40px'
      }}
    >
      <div className="row">
        <div className="col-md-12">
          <div className="block-title">
            <span>{categoryName}</span>
            <div
              className="seeMore-title-box"
              onClick={() => history.push(`/productsListing/${categoryId}`)}
            >
              <h5 className="seeMore-title">
                {`See All ${categoryName} Products`}
              </h5>
              <i className="fa fa-chevron-right"></i>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {isLoading && products && !products.length > 0 && <Spinner />}
        {!isLoading && products && !products.length > 0 && (
          <h2
            style={{
              lineHeight: '200px'
            }}
          >
            No Product Has Been Found On This Category
          </h2>
        )}
      </div>
      <div
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Carousel responsive={responsive}>
          {products &&
            products.length > 0 &&
            products.map(product => {
              return (
                <React.Fragment key={product._id}>
                  <Product product={product} productListing={true} />
                </React.Fragment>
              );
            })}
        </Carousel>
      </div>
    </section>
  );
};

export default withRouter(Products);
