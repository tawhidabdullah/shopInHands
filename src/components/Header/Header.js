import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Link,withRouter } from 'react-router-dom';
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
    const {cartItems,totalPrice} = this.props;
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
          
            <span className='nav-icon nav-menu' style={{
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
            {/* <h2>Your Cart</h2> */}

            <div className='cart-content'>
            
            {this.props.cartItems.length && this.props.cartItems.map(cartItem => {
              return (
                <div className='cart-item'>
                <img 
                onClick={()=>{
                  this.handleToggleCartBar(); 
                  this.props.history.push(`/products/${cartItem.id}`)
                }}
                src={require('../../assets/productImages/img7.jpg')} alt='productImg'/>
                  <div className=''>
                    <h4 
                     onClick={()=>{
                      this.handleToggleCartBar(); 
                      this.props.history.push(`/products/${cartItem.id}`)
                    }}
                    >{cartItem.name}</h4>
                    <h5>${cartItem.price}</h5>
                    <span className='remove-item' onClick={()=>this.handleRemoveCartItem(cartItem.id)}>
                    <i className='fa fa-trash' style={{
                      marginRight: '5px',
                      color: '#FF5C00'
                    }}></i>
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
                <button className='clear-cart banner-btn' onClick={this.handleToggleCartBar}>
                  Add Products
                </button>
            </div>
            )}

            </div>
           {cartItems && cartItems.length > 0 && (
              <div className='cart-footer'>
                <div className='cart-total'> 
                <h3>Your total : 
                </h3>
               <span >
               ${totalPrice}
                </span>
                </div>
              <button className='clear-cart banner-btn' onClick={()=>{
                this.handleToggleCartBar(); 
                this.props.history.push('/cart')
              }}>
                  View Cart
                </button>
                <button className='clear-cart banner-btn' style={{
                  marginLeft: '20px'
                }}>
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

export default connect(mapStateToProps, { logoutUser,removeProductToCart })(withRouter(Header));

