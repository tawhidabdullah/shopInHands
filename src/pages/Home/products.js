import React from 'react';
import Product from './Product';
import { getApi } from '../../utilities/wooApi';
import { withRouter } from "react-router-dom";

import Spinner from '../../components/commonFeilds/Spinner';

const Products = ({ categoryId, categoryName ,history}) => {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await getApi(
          `/wp-json/wc/v3/products?category=${categoryId}`
        );
        setProducts(products);
      } catch (err) {
        console.log(err);
      }
    };
    categoryId && getProducts();
  }, [categoryId]);

  return (
    <section className="product-slider-section">
      <div
        className="row"
       
      >
        <div className="col-md-12">
  
          <div class="block-title">
              <span>
              {categoryName}
              </span>
              <div className='seeMore-title-box'  onClick={()=>history.push(`/productsListing/${categoryId}`)}>
              <h5 className='seeMore-title'>
                {`See All ${categoryName} Products`}
              </h5>
              <i className='fa fa-chevron-right'></i>
             </div>
   
          </div>

         

        </div>
      
      </div>
      <div className="row" style={{ paddingTop: '20px' }}>
      
      {products &&
          products.length > 0 &&
          products.map(product => {
            return (

              <div class="col-md-3">
                <Product product={product} />
                 </div>
            );
          }) || <Spinner />}
     
      
      </div>
    </section>
  );
};

export default withRouter(Products);
