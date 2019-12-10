import React from 'react'; 
import  "./productListing.scss";
import Product from "../Home/Product";
import { getApi } from '../../utilities/wooApi';

import Spinner from '../../components/commonFeilds/Spinner';

const ProductListing = (props) => {
    const id = props.match.params.id;

    const [products, setProducts] = React.useState([]);

    React.useEffect(() => {

      const getProducts = async () => {

        try {
          const products = await getApi(
            `/wp-json/wc/v3/products?category=${id}`
          );
          setProducts(products);
        } catch (err) {
          console.log(err);
        }
      };
      id && getProducts();
    }, [id]);


    return (
        <div class="Bcak-bg">
        <div class="container">
          {/* <h2>Category</h2> */}
          <div class="row">
            <div class="col-sm-3 filterbar" >
              <div class="category-block">
                <span class="category-title">Search here</span>
                <div class="form-group search-product">
                  <input type="text" name="Search" placeholder="Search here...." />
                  <i class="fa fa-search" aria-hidden="true"></i>
                </div>
       
              </div>
      
              <div class="category-block">
                <div class="product-detail">
                  <h2 class="category-title">Categories</h2>
                  <ul>
                    <li>
                      <input class="custom-checkbox" id="styled-checkbox-4" type="checkbox" value="value1" />
                      <label for="styled-checkbox-4">Toys</label>
                    </li>
                    <li>
                      <input class="custom-checkbox" id="styled-checkbox-5" type="checkbox" value="value1" />
                      <label for="styled-checkbox-5">Fashion</label>
                    </li>
                    <li>
                      <input class="custom-checkbox" id="styled-checkbox-6" type="checkbox" value="value1"  />
                      <label for="styled-checkbox-6">Cars</label>
                    </li>
                    <li>
                      <input class="custom-checkbox" id="styled-checkbox-7" type="checkbox" value="value1" />
                      <label for="styled-checkbox-7">Latest</label>
                    </li>
                  </ul>
                </div>
                
              </div>
      
            
            </div>
            <div class="col-sm-9">
              <div class="row">

              {products &&
          products.length > 0 &&
          products.map(product => {
            return (

                <div class="col-sm-6 col-md-4 product_item_outer">
                <Product product={product} />
                 </div>
            );
          }) || <Spinner />}
          
        
              </div>
              <div class="pagination">
                <a href="#"><i class="fa fa-chevron-left" aria-hidden="true"></i></a>
                <a href="#">1</a>
                <a href="#" class="active">2</a>
                <a href="#">3</a>
                <a href="#"><i class="fa fa-chevron-right" aria-hidden="true"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}


export default ProductListing; 