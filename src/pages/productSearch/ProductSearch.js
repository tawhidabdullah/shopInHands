import React from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { getApi } from '../../utilities/wooApi';
import Product from '../Home/Product';
import Spinner from '../../components/commonFeilds/Spinner';

const ProductSearch = props => {
  const queryValueOfSearch = queryString.parse(props.location.search).search;
  console.log('searchBValue', queryValueOfSearch);
  const [products, setProducts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);
        const products = await getApi(
          `/wp-json/wc/v3/products?search${queryValueOfSearch}`
        );

        setProducts(products);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    queryValueOfSearch && getProducts();
  }, [queryValueOfSearch]);

  return (
    <div className="container">
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
        {(!isLoading &&
          products &&
          products.length > 0 &&
          products.map(product => {
            return (
              // <div class="col-md-2 col-sm-4 ml-3 mr-3">
              //   <Product product={product} />
              // </div>
              <Product product={product} productListing={true} />
            );
          })) ||
          (isLoading && <Spinner />)}

        {!isLoading && products && !products.length > 0 ? (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            <h2>No Product Has Been Found</h2>
            <a
              className="btn btn-outline-secondary"
              onClick={e => {
                e.preventDefault();
                props.history.push('/products');
              }}
            >
              Go Back To Home Page
            </a>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default withRouter(ProductSearch);
