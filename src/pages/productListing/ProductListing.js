import React from 'react'; 
import { withRouter } from "react-router-dom";
import  "./productListing.scss";
import Product from "../Home/Product";
import { getApi } from '../../utilities/wooApi';

import Spinner from '../../components/commonFeilds/Spinner';

const ProductListing = (props) => {
    const id = props.match.params.id;

    const [products, setProducts] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [isLoading,setIsLoading] = React.useState(false); 
    // const [manupulatedCategories,setManupulatedCategories] = React.useState([]); 

    React.useEffect(() => {

      const getProducts = async () => {

        setIsLoading(true); 
        try {
          const products = await getApi(
            `/wp-json/wc/v3/products?category=${id}`
          );
          setProducts(products);
          setIsLoading(false);
        } catch (err) {
          setIsLoading(false);
          console.log(err);
        }
      };
      id && getProducts();
    }, [id]);


    React.useEffect(() => {

      const getCategories = async () => {

        try {
          const categories = await getApi('/wp-json/wc/v3/products/categories');
          setCategories(categories); 
          
        } catch (err) {
          console.log(err);
        }
      };
      getCategories();
    }, []);



  const handleSelectCategory = e => {
    const name = e.target.name;
    const value = e.target.checked;

    if (e.target.checked) {

    } else {
      
    }
  };

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
                  <h2 class="category-title active">Categories</h2>
                  <ul>
                   <li className='category-header-all'>
                      All Categories
                   </li>
                   {categories && categories.map((cat,i) => {
                     return (
                      <li key={i} >
                          <span 
                          className='category-text' 
                          onClick={()=>props.history.push(`/productsListing/${cat.id}`)}>
                            {cat.name}
                          </span>
                      </li>
                     )
                   })}
                   
                  </ul>
                </div>
                
              </div>

              <div class="category-block">
                <div class="product-detail">
                  <h2 class="category-title">Tags</h2>
                  <ul>
                   
                   {/* {categories && categories.map((cat,i) => {
                     return (
                      <li key={i}>
                      <input 
                      class="custom-checkbox"
                        type="checkbox"
                        checked={true}
                        onChange={handleSelectCategory}
                        name={cat.name} />
                      <label >{cat.name}</label>
                    </li>
                     )
                   })} */}

                   <li >
                      <input 
                      class="custom-checkbox"
                        type="checkbox"
                        checked={true}
                        onChange={handleSelectCategory}
                       />
                      <label>Products</label>
                    </li>
                   
                  </ul>
                </div>
                
              </div>
      
            
            </div>
            <div class="col-sm-9">
              <div class="row">

              {products &&
          products.length > 0 && !isLoading &&
          products.map(product => {
            return (

                <div class="col-sm-6 col-md-4 product_item_outer">
                <Product product={product} />
                 </div>
            );
          }) || <Spinner />}
          
        
              </div>
             
             {!isLoading ? (
                <div class="pagination">
                <a href="#"><i class="fa fa-chevron-left" aria-hidden="true"></i></a>
                <a href="#">1</a>
                <a href="#" class="active">2</a>
                <a href="#">3</a>
                <a href="#"><i class="fa fa-chevron-right" aria-hidden="true"></i></a>
              </div>
             ): ""}
            </div>
          </div>
        </div>
      </div>
    )
}


export default withRouter(ProductListing); 