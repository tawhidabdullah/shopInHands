import React from 'react';
import { withRouter } from 'react-router-dom';
import InputRange from 'react-input-range';
import './productListing.scss';
import Product from '../Home/Product';
import { getApi } from '../../utilities/wooApi';
import 'react-input-range/lib/css/index.css';

import Spinner from '../../components/commonFeilds/Spinner';

const ProductListing = props => {
  const id = props.match.params.id;

  const [products, setProducts] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [value, setValue] = React.useState({ min: 2, max: 5000 });
  // const [manupulatedCategories,setManupulatedCategories] = React.useState([]);

  React.useEffect(() => {
    if (id === '967021') {
      const getProducts = async () => {
        setIsLoading(true);
        try {
          const products = await getApi(`/wp-json/wc/v3/products`, {});
          console.log('products', products);
          setProducts(products);
          setIsLoading(false);
        } catch (err) {
          console.log(err);
          setIsLoading(false);
        }
      };
      getProducts();
    } else {
      const getProducts = async () => {
        setIsLoading(true);
        try {
          const products = await getApi(
            `/wp-json/wc/v3/products?category=${id}`
          );
          if (products.length > 0) {
            setProducts(products);
          }
          setIsLoading(false);
        } catch (err) {
          setIsLoading(false);
          console.log(err);
        }
      };
      id && getProducts();
    }
  }, [id]);

  React.useEffect(() => {
    const getCategories = async () => {
      try {
        const awaitedCategories = await getApi(
          '/wp-json/wc/v3/products/categories'
        );
        const categories = [
          {
            name: 'All Categories',
            id: 967021,
            [`isAll Categories}`]: id ? false : true
          }
        ];
        const tempCategories = awaitedCategories.map((cat, index) => {
          return {
            name: cat.name,
            id: cat.id,
            [`is${cat.name}`]: false
          };
        });

        setCategories([...categories, ...tempCategories]);
      } catch (err) {
        console.log(err);
      }
    };
    getCategories();
  }, []);

  const handleSearch = () => {
    const getProducts = async () => {
      setIsLoading(true);
      try {
        const products = await getApi(
          `/wp-json/wc/v3/products?search=${searchValue}`
        );
        console.log('products', products);
        setProducts(products);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    getProducts();
  };

  const handleSearchInput = e => {
    setSearchValue(e.target.value);
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSelectCategory = (id, name) => {
    props.history.push(`/productsListing/${id}`);

    const temCategories = [...categories];
    temCategories &&
      temCategories.forEach(cat => {
        if (cat.name === name) {
          cat[`is${cat.name}`] = true;
        } else cat[`is${cat.name}`] = false;
      });
    console.log('temCategories', temCategories);

    setCategories(temCategories);
  };

  const handleInputRangePriceChange = value => {
    setValue(value);
    const newValue = value;
    const getProducts = async () => {
      setIsLoading(true);
      try {
        const products = await getApi(
          `/wp-json/wc/v3/products?min_price=${newValue.min}&max_price=${newValue.max}`
        );
        console.log('products', products);
        setProducts(products);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    getProducts();
  };

  return (
    <div class="Bcak-bg">
      <div class="container">
        {/* <h2>Category</h2> */}
        <div class="row">
          <div class="col-sm-3 filterbar">
            <div class="category-block">
              <span class="category-title">Search here</span>
              <div class="form-group search-product">
                <input
                  type="text"
                  name="Search"
                  placeholder="Search here...."
                  onChange={handleSearchInput}
                  onKeyPress={handleKeyPress}
                />
                <i
                  onClick={handleSearch}
                  class="fa fa-search"
                  aria-hidden="true"
                ></i>
              </div>
            </div>

            <div className="category-block">
              <div className="product-title">Price</div>
              <div
                style={{
                  padding: '50px 0 30px 0'
                }}
              >
                <InputRange
                  value={value}
                  maxValue={20000}
                  minValue={0}
                  onChange={value => handleInputRangePriceChange(value)}
                />
              </div>
            </div>
            <div class="category-block">
              <div class="product-detail">
                <h2 class="category-title">Categories</h2>
                <ul>
                  {categories &&
                    categories.map((cat, i) => {
                      return (
                        <li key={i}>
                          <span
                            className={
                              cat.name !== 'All Categories'
                                ? `${
                                    cat[`is${cat.name}`]
                                      ? 'category-text active'
                                      : 'category-text'
                                  }`
                                : `${
                                    cat[`is${cat.name}`]
                                      ? 'category-header-all active'
                                      : 'category-header-all'
                                  }`
                            }
                            onClick={() => {
                              handleSelectCategory(cat.id, cat.name);
                            }}
                          >
                            {cat.name}
                          </span>
                        </li>
                      );
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

                  <li>
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

            <div class="category-block">
              <div class="product-detail">
                <h2 class="category-title">Ratings</h2>
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

                  <li>
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
            <div
              class="row"
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
                !isLoading &&
                products.map(product => {
                  return <Product product={product} productListing={true} />;
                })) ||
                (isLoading && <Spinner />)}
            </div>

            {!isLoading && products && products.length > 0 ? (
              <div
                class="pagination"
                style={{
                  marginTop: '50px'
                }}
              >
                <a href="#">
                  <i class="fa fa-chevron-left" aria-hidden="true"></i>
                </a>
                <a href="#">1</a>
                <a href="#" class="active">
                  2
                </a>
                <a href="#">3</a>
                <a href="#">
                  <i class="fa fa-chevron-right" aria-hidden="true"></i>
                </a>
              </div>
            ) : (
              !isLoading &&
              products &&
              !products.length > 0 && (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <h3
                    style={{
                      color: '#333',
                      fontSize: '22px',
                      textTransform: 'uppercase'
                    }}
                  >
                    No Product Has Been Found For This Category
                  </h3>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ProductListing);
