import React from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import Product from '../Home/Product';
import Spinner from '../../components/commonFeilds/Spinner';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';
import { baseApiURL } from '../../constants/variable';

const ProductSearch = props => {
  const queryValueOfSearch = queryString.parse(props.location.search).key;
  const categoryValueOfSearch = queryString.parse(props.location.search).cat;
  const [products, setProducts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);

        const productsRes = await axios.get(
          `${baseApiURL}/api/search?key=${queryValueOfSearch}&cat=${categoryValueOfSearch}`
        );

        const products = productsRes.data;

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
    <>
      <div className="container">
        <div
          className="row"
          style={{
            paddingTop: '20px',
            width: '100%',
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
              return <Product product={product} productListing={true} />;
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
                  props.history.push('/');
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
      <Footer />
    </>
  );
};

export default withRouter(ProductSearch);
