import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { formatMoney } from '../../pipes/priceFormatter';
import CartItem from '../../components/CartItem/CartItem';
import { clearCart } from '../../actions/index';
import './ShoppingCart.scss';

const ShoppingCart = props => {
  return (
    <>
      <div className="container">
        <div className="card shopping-cart">
          <div
            className="card-header  text-light"
            style={{
              background: '#F09D51'
            }}
          >
            <i className="fa fa-shopping-cart pr-2" aria-hidden="true" />
            Shopping Cart
            <div className="clearfix" />
          </div>
          <div className="card-body">
            {props.cartItemCount ? (
              props.cartItems.map(cart => (
                <CartItem {...cart} image={cart.images[0].src} />
              ))
            ) : (
              <h1 className="display-4 mt-5 text-center text-danger">
                There is no product in your cart
              </h1>
            )}
          </div>

          <div
            className="card-footer"
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexWrap: 'wrap'
            }}
          >
            {props.cartItemCount ? (
              <>
                <a
                  onClick={e => {
                    e.preventDefault();
                    props.history.push('/products');
                  }}
                  className="btn btn-primary"
                  style={{
                    background: '#ff5c00',
                    borderColor: '#ff5c00',
                    color: '#fff',
                    margin: '10px 10px'
                  }}
                >
                  Continue Shopping
                </a>
                <a
                  className="btn btn-primary"
                  style={{
                    background: '#ff5c00',
                    borderColor: '#ff5c00',
                    color: '#fff',
                    margin: '10px 10px'
                  }}
                  onClick={() => props.clearCart()}
                >
                  Clear Shopping Cart
                </a>

                <a
                  onClick={e => {
                    e.preventDefault();
                    props.history.push('/checkout');
                  }}
                  className="btn btn-primary"
                  style={{
                    background: '#ff5c00',
                    borderColor: '#ff5c00',
                    color: '#fff',
                    margin: '10px 10px'
                  }}
                >
                  Proceed To Checkout
                </a>
              </>
            ) : (
              <a
                onClick={e => {
                  e.preventDefault();
                  props.history.push('/products');
                }}
                className="btn btn-primary"
                style={{
                  background: '#ff5c00',
                  borderColor: '#ff5c00',
                  color: '#fff',
                  margin: '10px 10px'
                }}
              >
                Go Back and Shopping
              </a>
            )}

            <div
              className="pull-right"
              style={{ margin: '10px' }}
              style={{
                flexGrow: 1
              }}
            >
              <div className="pull-right" style={{ margin: '5px' }}>
                Total price: <b>{formatMoney(props.totalPrice)}৳</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  console.log(state, 'state has changed');

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

export default connect(mapStateToProps, { clearCart })(
  withRouter(ShoppingCart)
);
