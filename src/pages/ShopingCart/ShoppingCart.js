import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { formatMoney } from '../../pipes/priceFormatter';
import CartItem from '../../components/CartItem/CartItem';
import { clearCart } from '../../actions/index';
import { Modal, Button } from 'react-bootstrap';

import './ShoppingCart.scss';

const ShoppingCart = props => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    props.history.push('/login');
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const { auth, isAuthenticate } = props.auth;

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>You are not Authenticated </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          In Order to Order any Product You have to be Logged In
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Login
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
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
              <h1
                className=" mt-5 text-center "
                style={{
                  fontSize: '6vh',
                  color: '#777',
                  fontWeight: '500',
                  marginBottom: '50px'
                }}
              >
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

                    if (isAuthenticate) {
                      props.history.push('/checkout');
                    } else handleShow();
                  }}
                  className="btn btn-primary"
                  style={{
                    background: '#ff5c00',
                    borderColor: '#ff5c00',
                    color: '#fff',
                    margin: '10px 10px'
                  }}
                >
                  checkout
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
  return {
    auth: state.auth,
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
