import React from 'react';
import Product from './Product';
import { getApi } from '../../utilities/wooApi';

const Products = ({ categoryId, categoryName }) => {
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
        style={{
          borderBottom: '1px solid #ddd'
        }}
      >
        <div className="col-md-6">
          <h2 className="products-section-title">{categoryName}</h2>
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
      <div className="row" style={{ paddingTop: '20px' }}>
        {products &&
          products.length > 0 &&
          products.map(product => {
            return <Product product={product} />;
          })}
      </div>
    </section>
  );
};

export default Products;
