import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { logoutUser } from '../../actions/authAction';
import './Header.scss';
import '../styles_components/searchBar.scss';
import {addProductToCart, decrementCartQuantity, incrementCartQuantity, removeProductToCart} from "../../actions";



class Header extends Component {

  state = {
    isShowCartBar: false
  }

  handleToggleCartBar = () => {
    this.setState({
      isShowCartBar: !this.state.isShowCartBar
    })
  }

  handleRemoveCartItem = (id) => {
    this.props.removeProductToCart(id)
  }

  render() {
    const { isAuthenticate, user } = this.props.auth;
    const {cartItems} = this.props;
    const {isShowCartBar} = this.state; 


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

        <div className='navbar'>
          <div className='navbar-center'>
          
            <span className='nav-icon' style={{
              display: 'block',
              fontSize: '18px',
              padding: '10px 25px',
              borderRadius: '5px',
              border: '1px solid #ddd',
              background: '#FAFAFA'
            }}>
              <i className='fa fa-bars' style={{
                fontSize:'15px',
                color: '#FF5C00'
              }}></i>
              <span style={{
                marginLeft: '7px',
                fontSize: '16px',
                textTransform: 'uppercase',
                color: '#333',
                fontWeight: '500'
              }}>
              All Departments
              </span>
            </span>
            <Link to='/products' style={{fontWeight: '700', textDecoration: 'none', color: '#444',textTransform: 'uppercase',fontSize:'20px' }}>
              ShopInHands
            </Link>
            <div className='cartt-btn' onClick={this.handleToggleCartBar}>
              <span className='nav-icon'>
                  <i className='fa fa-shopping-cart'></i>
              </span>
              <div className='cartt-items'>
                {this.props.cartLength ? ` ${this.props.cartLength}` : 0}
              </div>
            </div>
           
          </div>
        </div>

        <div className={isShowCartBar ? 'cart-overlay show-cart-bar': 'cart-overlay'}>
          <div className={isShowCartBar ? 'cart showCart': 'cart'}>
            <span className='close-cart' onClick={this.handleToggleCartBar}>
              <i className='fa fa-window-close' ></i>
            </span>
            <h2>Your Cart</h2>

            <div className='cart-content'>
            
            {this.props.cartItems.length && this.props.cartItems.map(cartItem => {
              return (
                <div className='cart-item'>
                <img src={require('../../assets/productImages/img7.jpg')} alt='productImg'/>
                  <div className=''>
                    <h4 >{cartItem.name}</h4>
                    <h5>${cartItem.price}</h5>
                    <span className='remove-item' onClick={()=>this.handleRemoveCartItem(cartItem.id)}>
                      remove
                    </span>
                  </div>
                  <div>
                    <i className='fa fa-chevron-up'></i>
                    <p className='item-amount'>
                      1
                    </p>
                    <i className='fa fa-chevron-down'></i>
                  </div>
              </div>
              )
            }) || (
              <div className='cart-footer'>
                <button className='clear-cart banner-btn'>
                  Add Products
                </button>
            </div>
            )}

            </div>
           {cartItems && cartItems.length > 0 && (
              <div className='cart-footer'>
              <h3>Your total : $ <span className='cart-total'>
                  0
                </span>
                </h3>

                <button className='clear-cart banner-btn'>
                  Clear Cart
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
    category: state.category
  };
};

export default connect(mapStateToProps, { logoutUser,removeProductToCart })(Header);

