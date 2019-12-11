import React from 'react';
import Product from './Product';
import { getApi } from '../../utilities/wooApi';
import { withRouter } from 'react-router-dom';

import Spinner from '../../components/commonFeilds/Spinner';

const Products = ({ categoryId, categoryName, history }) => {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await getApi(
          `/wp-json/wc/v3/products?category=${categoryId}`
        );

        setProducts(products.splice(0, 5));
      } catch (err) {
        console.log(err);
      }
    };
    categoryId && getProducts();
  }, [categoryId]);

  return (
    <section className="product-slider-section">
      <div className="row">
        <div className="col-md-12">
          <div class="block-title">
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
        className="row"
        style={{
          paddingTop: '20px',
          width: '100%',
          // background: 'red',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          alignItems: 'center'
        }}
      >
        {(products &&
          products.length > 0 &&
          products.map(product => {
            return (
              // <div class="col-md-2 col-sm-4 ml-3 mr-3">
              //   <Product product={product} />
              // </div>
              <Product product={product} productListing={true} />
            );
          })) || <Spinner />}
      </div>
    </section>
  );
};

export default withRouter(Products);
