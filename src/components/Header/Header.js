import React, { Component } from 'react';
import Spinner from '../commonFeilds/Spinner';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { getApi } from '../../utilities/wooApi';
import { logoutUser, getCurrentUser } from '../../actions/authAction';
import './Header.scss';
import '../styles_components/searchBar.scss';
import { baseApiURL } from '../../constants/variable';
import { getElement, isElementExists } from '../../utilities/elementHelpers';

import { removeProductToCart } from '../../actions';

import CartOverLayCartItem from './CartOverLayCartItem';

class Header extends Component {
  state = {
    isShowCartBar: false,
    searchBarValue: '',
    categories: [],
    isLoading: false,
    categorySelectValue: 'Categories',
    mainMenu: [],
    catMenu: [],
    logoContent: {},
    topLeftContent: {},
    hotlineContent: {},
    navItemsContent: []
  };

  handleToggleCartBar = () => {
    this.setState({
      isShowCartBar: !this.state.isShowCartBar
    });
  };

  handleRemoveCartItem = id => {
    this.props.removeProductToCart(id);
  };

  async componentDidMount() {
    this.props.getCurrentUser();
    try {
      this.setState({
        ...this.state,
        isLoading: true
      });

      const navItemsContentRes = await axios.get(
        `${baseApiURL}/api/component/detail/name/navlinks`
      );
      const navItemsContent = navItemsContentRes.data.items;

      this.setState({
        ...this.state,
        isLoading: false,
        navItemsContent
      });
    } catch (err) {
      console.log(err);
      this.setState({
        ...this.state,
        isLoading: false
      });
    }

    try {
      this.setState({
        ...this.state,
        isLoading: true
      });
      const topLeftContentRes = await axios.get(
        `${baseApiURL}/api/component/detail/name/welcome`
      );
      const topLeftContent = topLeftContentRes.data.items;

      this.setState({
        ...this.state,
        topLeftContent: topLeftContent,
        isLoading: false
      });
    } catch (err) {
      this.setState({
        ...this.state,
        isLoading: false
      });
    }

    try {
      this.setState({
        ...this.state,
        isLoading: true
      });
      const logoContentRes = await axios.get(
        `${baseApiURL}/api/component/detail/name/logo`
      );
      const logoContent = logoContentRes.data.items;

      this.setState({
        ...this.state,
        logoContent: logoContent,
        isLoading: false
      });
    } catch (err) {
      this.setState({
        ...this.state,
        isLoading: false
      });
    }

    try {
      this.setState({
        isLoading: true
      });
      const navItemsContentRes = await axios.get(
        `${baseApiURL}/api/component/detail/name/navlinks`
      );
      const navItemsContent = navItemsContentRes.data.items;

      this.setState({
        ...this.state,
        navItemsContent: navItemsContent,
        isLoading: false
      });
    } catch (err) {
      console.log(err);
      this.setState({
        ...this.state,
        isLoading: false
      });
    }

    try {
      this.setState({
        ...this.state,
        isLoading: true
      });
      // const categories = await getApi('/wp-json/wc/v3/products/categories');
      const categoryRes = await axios.get(`${baseApiURL}/api/category/list`);

      const categories = categoryRes.data;

      this.setState({
        ...this.state,

        categories: categories,
        isLoading: false
      });
    } catch (err) {
      console.log(err);
      this.setState({
        ...this.state,
        isLoading: false
      });
    }

    try {
      this.setState({
        ...this.state,
        isLoading: true
      });
      const catMenu = await getApi('/wp-json/wp/v2/menu_cat');
      this.setState({
        ...this.state,
        catMenu: catMenu,
        isLoading: false
      });
    } catch (err) {
      console.log(err);
      this.setState({
        ...this.state,
        isLoading: false
      });
    }

    try {
      this.setState({
        ...this.state,
        isLoading: true
      });
      const mainMenu = await getApi('/wp-json/wp/v2/menu_main');
      this.setState({
        ...this.state,
        mainMenu: mainMenu,
        isLoading: false
      });
    } catch (err) {
      console.log(err);
      this.setState({
        ...this.state,
        isLoading: false
      });
    }

    try {
      this.setState({
        ...this.state,
        isLoading: true
      });

      const hotlineContentRes = await axios.get(
        `${baseApiURL}/api/component/detail/name/hotline`
      );

      const hotlineContent = hotlineContentRes.data.items;

      this.setState({
        ...this.state,
        hotlineContent: hotlineContent,
        isLoading: false
      });
    } catch (err) {
      console.log(err);
      this.setState({
        ...this.state,
        isLoading: false
      });
    }
  }

  handleSearchBar = e => {
    e.preventDefault();
    this.setState({
      ...this.state,
      searchBarValue: e.target.value
    });
  };

  handleSearch = e => {
    e.preventDefault();

    this.props.history.push({
      pathname: '/productSearch',
      search: `?cat=${this.state.categorySelectValue}&key=${this.state.searchBarValue}`
    });
  };

  handleCategorySelectChange = event => {
    const value = event.target.value;
    this.setState({ categorySelectValue: value });
  };

  render() {
    const { isAuthenticate, user } = this.props.auth;
    const { cartItems, totalPrice } = this.props;
    const {
      isLoading,
      topLeftContent,
      hotlineContent,
      navItemsContent
    } = this.state;
    const {
      isShowCartBar,
      categories,
      categorySelectValue,
      logoContent
    } = this.state;

    return (
      <>
        <div className="top-head-1">
          <div className="langandcurrency">
            <span
              style={{
                fontSize: '14px'
              }}
            >
              {topLeftContent &&
                topLeftContent.length > 0 &&
                topLeftContent.map(item => {
                  return (
                    <>
                      {`${item.elements &&
                        isElementExists(item.elements, 'text') &&
                        getElement(item.elements, 'text').value}`}
                    </>
                  );
                })}
              {/* {topLeftContent &&
                topLeftContent.length > 0 &&
                topLeftContent[0].text} */}
            </span>
            {/* {topLeftContent && ReactHtmlParser(topLeftContent.rendered)} */}
            {/* <p>
              ENGLISH <i className="fa fa-angle-down"></i>
            </p>
            <p>
              USD <i className="fa fa-angle-down"></i>
            </p> */}
          </div>
          <div className="trackorderandauthlinks">
            {(isAuthenticate && user && (
              <>
                <p>
                  <i className="fa fa-dashboard"></i>
                  <span onClick={() => this.props.history.push('/dashboard')}>
                    Dashboard
                  </span>{' '}
                </p>
                <p>
                  <i className="fa fa-user"></i>
                  <span onClick={() => this.props.logoutUser()}>
                    Logout
                  </span>{' '}
                </p>
              </>
            )) || (
              <p>
                <i className="fa fa-user"></i>
                <span onClick={() => this.props.history.push('/login')}>
                  Login
                </span>{' '}
                or{' '}
                <span onClick={() => this.props.history.push('/register')}>
                  Register
                </span>
              </p>
            )}
          </div>
        </div>
        <div
          className="navbar"
          style={{
            position: 'relative'
          }}
        >
          <div className="navbar-center">
            <div
              className="navbar-center-logoBox"
              // onClick={() => this.props.history.push('/')}
            >
              {/* <img
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain'
                }}
                src={`${baseApiURL}${logoContent}`}
                alt=""
              /> */}

              {logoContent &&
                logoContent.length > 0 &&
                logoContent.map(item => {
                  return (
                    <React.Fragment key={item._id}>
                      {(item.elements &&
                        isElementExists(item.elements, 'url') && (
                          <a href={`${getElement(item.elements, 'url').value}`}>
                            <img
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain'
                              }}
                              src={`${baseApiURL}${item.elements &&
                                isElementExists(item.elements, 'img') &&
                                getElement(item.elements, 'img').value}`}
                              alt="ShoppingHands"
                            />
                          </a>
                        )) || (
                        <img
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain'
                          }}
                          src={`${baseApiURL}${item.elements &&
                            isElementExists(item.elements, 'img') &&
                            getElement(item.elements, 'img').value}`}
                          alt="ShoppingHands"
                        />
                      )}
                    </React.Fragment>
                  );
                })}
            </div>
            <div className="navbar-center-categoryAndSearch">
              <div className="categoryAndSearchFeilds">
                <div className="s003">
                  <form onSubmit={this.handleSearch}>
                    <div className="inner-form">
                      <div className="input-field first-wrap">
                        <div className="input-select">
                          <select
                            data-trigger="choices"
                            name="choices-single-default"
                            value={categorySelectValue}
                            onChange={e => this.handleCategorySelectChange(e)}
                          >
                            <option placeholder="">Categories</option>
                            {categories &&
                              categories.length > 0 &&
                              categories.map(item => {
                                return (
                                  <option value={item._id} key={item._id}>
                                    {item.name.charAt(0).toUpperCase() +
                                      item.name.slice(1)}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                      </div>
                      <div className="input-field second-wrap">
                        <input
                          id="search"
                          type="text"
                          placeholder="Enter Keywords?"
                          name="searchbar"
                          value={this.state.searchBarValue}
                          onChange={this.handleSearchBar}
                        />
                      </div>
                      <div className="input-field third-wrap">
                        <button className="btn-search">
                          <svg
                            className="svg-inline--fa fa-search fa-w-16"
                            aria-hidden="true"
                            data-prefix="fas"
                            data-icon="search"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path
                              fill="currentColor"
                              d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div
              className="navbar-center-cartBox"
              style={{
                marginRight: '10px'
              }}
            >
              <div className="cartt-btn" onClick={this.handleToggleCartBar}>
                <span className="nav-icon">
                  <i className="fa fa-shopping-cart"></i>
                </span>
                <div className="cartt-items">
                  {this.props.cartLength ? ` ${this.props.cartLength}` : 0}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="navbar">
          <div className="navbar-center">
            <div className="all-department">
              <span
                className="nav-icon nav-menu"
                style={{
                  display: 'block',
                  fontSize: '18px',
                  padding: '10px 25px',
                  borderRadius: '5px',
                  border: '1px solid #ddd',
                  background: '#FAFAFA'
                }}
              >
                <i
                  className="fa fa-bars"
                  style={{
                    fontSize: '15px',
                    color: '#FF5C00'
                  }}
                ></i>
                <span
                  style={{
                    marginLeft: '7px',
                    fontSize: '16px',
                    textTransform: 'uppercase',
                    color: '#333',
                    fontWeight: '500'
                  }}
                >
                  All Departments
                </span>
              </span>
              <div className="all-department-sideMenu">
                <ul>
                  {(categories &&
                    categories.length > 0 &&
                    categories.map(item => {
                      return (
                        <li
                          key={item._id}
                          onClick={() =>
                            this.props.history.push(
                              `/productsListing/${item._id}`
                            )
                          }
                        >
                          {' '}
                          {item.name}
                          {/* <ul> */}
                          {/* <li onClick={()=> this.props.history.push(`/productsListing/${item.id}`)}> {item.name}s</li>
                      <li onClick={()=> this.props.history.push(`/productsListing/${item.id}`)}> {item.name}s</li>
                      <li onClick={()=> this.props.history.push(`/productsListing/${item.id}`)}> {item.name}s</li>
                      <li onClick={()=> this.props.history.push(`/productsListing/${item.id}`)}> {item.name}s</li>
                      <li onClick={()=> this.props.history.push(`/productsListing/${item.id}`)}> {item.name}s</li>
                      <li onClick={()=> this.props.history.push(`/productsListing/${item.id}`)}> {item.name}s</li>
                      <li onClick={()=> this.props.history.push(`/productsListing/${item.id}`)}> {item.name}s</li>
                      <li onClick={()=> this.props.history.push(`/productsListing/${item.id}`)}> {item.name}s</li> */}
                          {/* </ul> */}
                        </li>
                      );
                    })) ||
                    (isLoading && <Spinner />)}
                </ul>
              </div>
            </div>

            {/* <Link to='/products' style={{fontWeight: '700', textDecoration: 'none', color: '#444',textTransform: 'uppercase',fontSize:'20px' }}>
              ShopInHands
            </Link> */}
            {/* <div className='cartt-btn' onClick={this.handleToggleCartBar}>
              <span className='nav-icon'>
                  <i className='fa fa-shopping-cart'></i>
              </span>
              <div className='cartt-items'>
                {this.props.cartLength ? ` ${this.props.cartLength}` : 0}
              </div>
            </div> */}

            <div className="navbar-center-navItems">
              {/* {!isLoading && mainMenu && mainMenu.length > 0 && (
                <>
                  <span onClick={() => this.props.history.push('/')}>Home</span>
                  <span
                    onClick={() =>
                      this.props.history.push('/productsListing/all')
                    }
                  >
                    Products
                  </span>
                </>
              )} */}
              {!isLoading &&
                navItemsContent &&
                navItemsContent.length > 0 &&
                navItemsContent.map(item => {
                  return (
                    <a
                      key={item.name}
                      href={`${item.elements &&
                        isElementExists(item.elements, 'url') &&
                        getElement(item.elements, 'url').value}`}
                    >
                      {item.name}
                    </a>
                  );
                })}
            </div>
            <div className="navbar-center-phoneNumberbox">
              <span className="phone">
                {hotlineContent &&
                  hotlineContent.length > 0 &&
                  hotlineContent.map(item => {
                    return (
                      <>
                        <i className="fa fa-phone" />
                        <span className="phoneText">hotline</span>
                        <span className="phoneNumber">
                          {`${item.elements &&
                            isElementExists(item.elements, 'text') &&
                            getElement(item.elements, 'text').value}`}
                        </span>
                      </>
                    );
                  })}
              </span>
            </div>
          </div>
        </div>

        <div
          className={
            isShowCartBar ? 'cart-overlay show-cart-bar' : 'cart-overlay'
          }
        >
          <div className={isShowCartBar ? 'cart showCart' : 'cart'}>
            <span className="close-cart" onClick={this.handleToggleCartBar}>
              <i className="fa fa-window-close"></i>
            </span>
            {/* <h2>Your Cart</h2> */}

            <div className="cart-content">
              {(this.props.cartItems.length &&
                this.props.cartItems.map(cartItem => {
                  return (
                    <React.Fragment key={cartItem._id}>
                      <CartOverLayCartItem
                        cartItem={cartItem}
                        handleRemoveCartItem={this.handleRemoveCartItem}
                        handleToggleCartBar={this.handleToggleCartBar}
                        key={cartItem._id}
                      />
                    </React.Fragment>
                  );
                })) || (
                <div className="cart-footer">
                  <button
                    className="clear-cart banner-btn"
                    onClick={this.handleToggleCartBar}
                  >
                    Add Products
                  </button>
                </div>
              )}
            </div>
            {cartItems && cartItems.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total">
                  <h3>Your total :</h3>
                  <span>৳{totalPrice}</span>
                </div>
                <button
                  className="clear-cart banner-btn"
                  onClick={() => {
                    this.handleToggleCartBar();
                    this.props.history.push('/cart');
                  }}
                >
                  View Cart
                </button>
                <button
                  className="clear-cart banner-btn"
                  onClick={() => {
                    this.handleToggleCartBar();
                    this.props.history.push('/checkout');
                  }}
                >
                  Checkout
                </button>
              </div>
            )}
          </div>
        </div>
        <div
          style={{
            borderBottom: '1px solid #eee'
          }}
        ></div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    cartLength: state.shop.cart.length,
    cartItems: state.shop.cart,
    category: state.category,
    totalPrice: state.shop.cart.reduce((count, curItem) => {
      return count + curItem.price * curItem.quantity;
    }, 0)
  };
};

export default connect(mapStateToProps, {
  logoutUser,
  removeProductToCart,
  getCurrentUser
})(withRouter(Header));
