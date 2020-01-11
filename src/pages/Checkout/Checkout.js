import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getApi } from '../../utilities/wooApi';
import axios from 'axios';
import { baseApiURL } from '../../constants/variable';
import { useAlert } from 'react-alert';
import './checkout.scss';

const Checkout = props => {
  const [selectedPaymentGateway, setSelectedPaymentGateway] = React.useState(
    'cod'
  );
  const [isLoading, setIsLoading] = React.useState(false);
  const [isOrderError, setIsOrderError] = React.useState(false);
  const [isOrderSuccess, setisOrderSuccess] = React.useState(false);
  const [productErrorText, setProductErrorText] = React.useState('');

  const [senderBkashNumbr, setSenderBkashNumbr] = React.useState('');
  const [senderTransactionId, setSenderTransactionId] = React.useState('');
  const [ourWpNumber, setOurWpNumber] = React.useState('');

  const [fields, setfields] = React.useState({
    first_name: '',
    last_name: '',
    address_1: '',
    address_2: '',
    city: '',
    state: '',
    postcode: '',
    country: '',
    email: '',
    phone: '',
    address: ''
  });

  const [isShowBkashFeilds, setIsShowBkashFeilds] = React.useState(false);

  const [errors, seterrors] = React.useState({
    first_name: '',
    last_name: '',
    address_1: '',
    address_2: '',
    city: '',
    state: '',
    postcode: '',
    country: '',
    email: '',
    phone: '',
    address: ''
  });

  const alert = useAlert();
  const { cartItems } = props;

  const handleFieldsChange = e => {
    setfields({
      ...fields,
      [e.target.name]: e.target.value
    });
  };

  const handleOrder = async () => {
    const products = cartItems.map(item => {
      return {
        id: item._id,
        quantity: item.quantity
      };
    });

    const orderSchema = {
      products: products,
      address: fields.address
    };

    setisOrderSuccess(false);
    setIsOrderError(false);
    setIsLoading(true);
    seterrors({
      ...errors,
      address: ''
    });
    try {
      const awaitedRes = await axios({
        url: `${baseApiURL}/customer/api/order/add`,
        method: 'post',
        data: orderSchema,
        headers: {
          'content-type': 'application/json'
        },
        withCredentials: true
      });

      setIsLoading(false);
      setisOrderSuccess(true);
      setIsOrderError(false);
    } catch (err) {
      setIsLoading(false);
      setIsOrderError(true);
      setisOrderSuccess(false);

      if (err.response.data && err.response.data.address)
        seterrors({
          ...errors,
          address: err.response.data.address
        });

      if (err.response.data && err.response.data.products) {
        setProductErrorText(err.response.data.products);
      }
    }
  };

  return (
    <div className="checkout">
      <div className="container">
        <div className="row">
          <div className="col-md-7">
            {isOrderSuccess ? (
              <Alert variant={'success'}>Order Created Successfully</Alert>
            ) : (
              ''
            )}

            {productErrorText && isOrderError ? (
              <Alert variant={'danger'}>{productErrorText}</Alert>
            ) : (
              ''
            )}
            <h2 className="shipping-heading">shipping Address</h2>
            <div className="shipping-fields">
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label
                    style={{
                      marginBottom: '10px'
                    }}
                  >
                    Shipping Address
                  </Form.Label>
                  <Form.Control
                    name="address"
                    type="text"
                    placeholder="Shipping Address"
                    onChange={handleFieldsChange}
                  />
                  <Form.Text className="text-danger">
                    {errors.address && errors.address}
                  </Form.Text>
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  style={{
                    background: '#0000FE',
                    borderColor: '#fff'
                  }}
                  onClick={() => handleOrder()}
                >
                  Order
                </Button>
              </Form>
            </div>
          </div>
          <div className="col-md-5">
            <div className="row">
              <div className="col-md-12">
                <div className="order-summary">
                  <h2>Order Summary</h2>
                  <div className="order-summary-price">
                    <h3>{props.cartItems.length} items in Cart</h3>
                    <span>৳{props.totalPrice}</span>
                  </div>
                </div>
                {/* <div className="order-summary">
                  <h2>Place Order</h2>
                  <div className="mt-3 mb-3">
                    <form>
                      <input
                        checked={selectedPaymentGateway === 'cod'}
                        type="radio"
                        name="paymentGateway"
                        value="cod"
                        onChange={handlePaymentGatewayChange}
                      />{' '}
                      Cash On Delivery
                      <br />
                      <input
                        checked={selectedPaymentGateway === 'bkash'}
                        type="radio"
                        name="paymentGateway"
                        value="bkash"
                        onChange={handlePaymentGatewayChange}
                        style={{
                          marginTop: '10px'
                        }}
                      />{' '}
                      Bkash
                      <br />
                    </form>

                    {selectedPaymentGateway === 'bkash' ? (
                      <div
                        style={{
                          marginTop: '20px'
                        }}
                      >
                        <h2>Num: {ourWpNumber}</h2>

                        <Form>
                          <Form.Group controlId="formBasicEmail">
                            <Form.Label
                              style={{
                                marginBottom: '10px'
                              }}
                            >
                              Sender Number
                            </Form.Label>
                            <Form.Control
                              name="usernumber"
                              type="text"
                              placeholder="Sender Number"
                              onChange={handleSenderNumberChange}
                            />
                            <Form.Text className="text-muted text-danger">
                              {errors.senderNumber && errors.senderNumber}
                            </Form.Text>
                          </Form.Group>

                          <Form.Group controlId="formBasicPhone">
                            <Form.Label
                              style={{
                                marginBottom: '10px'
                              }}
                            >
                              Transaction ID
                            </Form.Label>
                            <Form.Control
                              name="transid"
                              type="text"
                              onChange={handleSenderTranncIdChange}
                              placeholder="Enter Transaction ID"
                            />

                            <Form.Text className="text-muted text-danger">
                              {errors.transId && errors.transId}
                            </Form.Text>
                          </Form.Group>
                        </Form>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                  <Button
                    variant="primary"
                    type="submit"
                    style={{
                      background: '#777',
                      borderColor: '#777'
                    }}
                    onClick={onPaymentGateWaySubmit}
                  >
                    Place Order
                  </Button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
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

export default connect(mapStateToProps, null)(withRouter(Checkout));
