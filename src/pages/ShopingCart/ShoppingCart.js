import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { formatMoney } from '../../pipes/priceFormatter';
import CartItem from '../../components/CartItem/CartItem';
import { clearCart } from '../../actions/index';
import axios from 'axios';
import './ShoppingCart.scss';

const ShoppingCart = props => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { cartItems } = props;

  const handleOrder = async () => {
    const products = cartItems.map(item => {
      return {
        _id: item.id,
        quantity: item.quantity
      };
    });
    console.log('cartItems', props.cartItems);
    setIsLoading(true);
    try {
      const awaitedRes = axios.post(
        'http://192.168.0.102:5000/customer/api/order/add',
        {
          products
        }
      );
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };
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
                <CartItem {...cart} image={cart.image[0]} />
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
                    handleOrder();
                  }}
                  className="btn btn-primary"
                  style={{
                    background: '#ff5c00',
                    borderColor: '#ff5c00',
                    color: '#fff',
                    margin: '10px 10px'
                  }}
                >
                  Order
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
