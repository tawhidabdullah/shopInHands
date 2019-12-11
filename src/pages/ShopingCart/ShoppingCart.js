import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { formatMoney } from "../../pipes/priceFormatter";
import CartItem from "../../components/CartItem/CartItem";
import "./ShoppingCart.scss";

const ShoppingCart = props => {
  return (
    <>
      <div className="container" >
        <div className="card shopping-cart">
          <div className="card-header  text-light" style={{
            background: '#F09D51'
          }}>
            <i className="fa fa-shopping-cart pr-2" aria-hidden="true" />
            Shopping Cart
            <div className="clearfix" />
          </div>
          <div className="card-body">
            {props.cartItemCount ? (
              props.cartItems.map(cart => (
                <CartItem {...cart} img={cart.productImage} />
              ))
            ) : (
              <h1 className="display-4 mt-5 text-center text-danger">
                There is no product in your cart
              </h1>
            )}
          </div>
        
          <div className="card-footer">
          {props.cartItemCount ? (
  <>
              <a 
              onClick={(e)=>{
                e.preventDefault(); 
                props.history.push('/products')
              }}
              className='btn btn-primary'
               style={{
                background: '#ff5c00',
                borderColor: '#ff5c00',
                color: "#fff",
                margin: '0 5px'
              }}>
               Continue Shopping
              </a>
              <a className='btn btn-primary' style={{
                background: '#ff5c00',
                borderColor: '#ff5c00',
                color: "#fff",
                margin: '0 5px'
              }}>
              Clear Shopping Cart
              </a>
              <a className='btn btn-primary' style={{
                background: '#ff5c00',
                borderColor: '#ff5c00',
                color: "#fff",
                margin: '0 5px'
              }}>
               Update Shopping Cart
              </a>
              
              <a 
               onClick={(e)=>{
                e.preventDefault(); 
                props.history.push('/checkout')
              }}
              className='btn btn-primary' 
              style={{
                background: '#ff5c00',
                borderColor: '#ff5c00',
                color: "#fff",
                margin: '0 5px'
              }}>
               Proceed To Checkout
              </a>
  </>
            ) : (
              <a 
              onClick={(e)=>{
                e.preventDefault(); 
                props.history.push('/products')
              }}
              className='btn btn-primary'
               style={{
                background: '#ff5c00',
                borderColor: '#ff5c00',
                color: "#fff",
                margin: '0 5px'
              }}>
              Go Back and Shopping
              </a>
            )}
         
            <div className="pull-right" style={{ margin: "10px" }}>
              <div className="pull-right" style={{ margin: "5px" }}>
                Total price: <b>{formatMoney(props.totalPrice)}$</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  console.log(state, "state has changed");

  return {
    cartItems: state.shop.cart,
    cartItemCount: state.shop.cart.reduce((count, curItem) => {
      return count + curItem.quantity;
    }, 0),
    totalPrice: state.shop.cart.reduce((count, curItem) => {
      return count + curItem.price * curItem.quantity;
    }, 0)
  };
};

export default connect(
  mapStateToProps,
  null
)(withRouter(ShoppingCart));
