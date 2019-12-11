import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { logoutUser } from '../../actions/authAction';
import './Header.scss';
import '../styles_components/searchBar.scss';
import {
  addProductToCart,
  decrementCartQuantity,
  incrementCartQuantity,
  removeProductToCart
} from '../../actions';

class Header extends Component {
  state = {
    isShowCartBar: false
  };

  handleToggleCartBar = () => {
    this.setState({
      isShowCartBar: !this.state.isShowCartBar
    });
  };

  handleRemoveCartItem = id => {
    this.props.removeProductToCart(id);
  };

  render() {
    const { isAuthenticate, user } = this.props.auth;
    const { cartItems, totalPrice } = this.props;
    const { isShowCartBar } = this.state;

    return (
      <>
        <div className="top-head-1">
          <div className="langandcurrency">
            <p>
              ENGLISH <i className="fa fa-angle-down"></i>
            </p>
            <p>
              USD <i className="fa fa-angle-down"></i>
            </p>
          </div>
          <div className="trackorderandauthlinks">
            <p className="trackorderbutton">
              <i className="fa fa-car"></i>Track You Order{' '}
            </p>
            <p>
              <i className="fa fa-user"></i>
              <span>Login</span> or <span>Register</span>
            </p>
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
              onClick={() => this.props.history.push('/products')}
            >
              <img
                style={{
                  width: '100%',
                  height: '80%',
                  objectFit: 'contain'
                }}
                src={
                  'http://magento2.flytheme.net/themes/sm_shopping/pub/static/frontend/Sm/shopping/en_US/images/logo.svg'
                }
                alt="get a life"
              />
            </div>
            <div className="navbar-center-categoryAndSearch">
              <div className="categoryAndSearchFeilds">
                <div class="s003">
                  <form>
                    <div class="inner-form">
                      <div class="input-field first-wrap">
                        <div class="input-select">
                          <select
                            data-trigger="choices"
                            name="choices-single-default"
                          >
                            <option placeholder="">Category</option>
                            <option>New Arrivals</option>
                            <option>Sale</option>
                            <option>Ladies</option>
                            <option>Men</option>
                            <option>Clothing</option>
                            <option>Footwear</option>
                            <option>Accessories</option>
                          </select>
                        </div>
                      </div>
                      <div class="input-field second-wrap">
                        <input
                          id="search"
                          type="text"
                          placeholder="Enter Keywords?"
                        />
                      </div>
                      <div class="input-field third-wrap">
                        <button class="btn-search" type="button">
                          <svg
                            class="svg-inline--fa fa-search fa-w-16"
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
              <span onClick={() => this.props.history.push('/products')}>
                Home
              </span>
              <span
                onClick={() => this.props.history.push('/productsListing/22')}
              >
                Products
              </span>
              <span>Under $100</span>
              <span>Deals</span>
              <span>About Us</span>
              <span>Contact Us</span>
            </div>
            <div className="navbar-center-phoneNumberbox">
              <i className="fa fa-phone"></i>
              <span className="text">Hotline</span>
              <span className="phone">967021967021</span>
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
                    <div className="cart-item">
                      <img
                        onClick={() => {
                          this.handleToggleCartBar();
                          this.props.history.push(`/products/${cartItem.id}`);
                        }}
                        src={require('../../assets/productImages/img7.jpg')}
                        alt="productImg"
                      />
                      <div className="">
                        <h4
                          onClick={() => {
                            this.handleToggleCartBar();
                            this.props.history.push(`/products/${cartItem.id}`);
                          }}
                        >
                          {cartItem.name}
                        </h4>
                        <h5>${cartItem.price}</h5>
                        <span
                          className="remove-item"
                          onClick={() => this.handleRemoveCartItem(cartItem.id)}
                        >
                          <i
                            className="fa fa-trash"
                            style={{
                              marginRight: '5px',
                              color: '#FF5C00'
                            }}
                          ></i>
                          remove
                        </span>
                      </div>
                      <div>
                        <i className="fa fa-chevron-up"></i>
                        <p className="item-amount">1</p>
                        <i className="fa fa-chevron-down"></i>
                      </div>
                    </div>
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
                  <span>${totalPrice}</span>
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
                  style={{
                    marginLeft: '20px'
                  }}
                >
                  Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartLength: state.shop.cart.length,
    cartItems: state.shop.cart,
    auth: state.auth,
    category: state.category,
    totalPrice: state.shop.cart.reduce((count, curItem) => {
      return count + curItem.price * curItem.quantity;
    }, 0)
  };
};

export default connect(mapStateToProps, { logoutUser, removeProductToCart })(
  withRouter(Header)
);
