import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { postApi, getApi } from '../../utilities/wooApi';
import { useAlert } from 'react-alert';
import './checkout.scss';

const Checkout = props => {
  const [selectedPaymentGateway, setSelectedPaymentGateway] = React.useState(
    'cod'
  );
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
    phone: ''
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
    phone: ''
  });

  const alert = useAlert();

  const handleFieldsChange = e => {
    setfields({
      ...fields,
      [e.target.name]: e.target.value
    });
  };

  const onOrderSubmit = async e => {
    e.preventDefault();

    if (!fields.email.length > 0) {
      seterrors({
        ...errors,
        email: 'Email Field is Required!'
      });
    }

    const line_items = props.cartItems.map(cartItem => {
      return {
        product_id: cartItem.id,
        quantity: cartItem.quantity
      };
    });

    const orderData = {
      billing: {
        first_name: fields.first_name,
        last_name: fields.last_name,
        address_1: fields.address_1,
        address_2: fields.address_2,
        city: fields.city,
        state: fields.state,
        postcode: fields.postcode,
        country: fields.country,
        email: fields.email,
        phone: fields.phone
      },
      shipping: {
        first_name: fields.first_name,
        last_name: fields.last_name,
        address_1: fields.address_1,
        address_2: fields.address_2,
        city: fields.city,
        state: fields.state,
        postcode: fields.postcode,
        country: fields.country
      },
      line_items
    };

    try {
      const successOrderResponse = await postApi(
        `/wp-json/wc/v3/orders`,
        orderData
      );

      console.log('successOrderrestponse', successOrderResponse);
      // alert.show('Your Order Has Been Created SuccessFully');
    } catch (err) {
      alert.show('Something Went Wrong Went Creating The Order');
    }
  };

  React.useEffect(() => {
    const getPaymentGatewaysProps = async () => {
      try {
        const gatewaysProps = await getApi('/wp-json/wc/v3/payment_gateways');
        setOurWpNumber(gatewaysProps[4].settings.bkash_number.value);
      } catch (err) {
        console.log(err);
      }
    };

    getPaymentGatewaysProps();
  }, []);

  const handlePaymentGatewayChange = e => {
    setSelectedPaymentGateway(e.target.value);
  };

  const handleSenderNumberChange = e => {
    setSenderBkashNumbr(e.target.value);
  };

  const handleSenderTranncIdChange = e => {
    setSenderTransactionId(e.target.value);
  };

  const onPaymentGateWaySubmit = e => {
    e.preventDefault();
  };

  const toggleIsShowBkashFeilds = () => {
    setIsShowBkashFeilds(isShow => !isShow);
  };

  return (
    <div className="checkout">
      <div className="container">
        <div className="row">
          <div className="col-md-7">
            <h2 className="shipping-heading">shipping Address</h2>
            <div className="shipping-fields">
              <Form onSubmit={onOrderSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label
                    style={{
                      marginBottom: '10px'
                    }}
                  >
                    Email address
                  </Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="Enter email"
                    onChange={handleFieldsChange}
                  />
                  <Form.Text className="text-muted text-danger">
                    {errors.email && errors.email}
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPhone">
                  <Form.Label
                    style={{
                      marginBottom: '10px'
                    }}
                  >
                    Phone Number
                  </Form.Label>
                  <Form.Control
                    name="number"
                    type="text"
                    onChange={handleFieldsChange}
                    placeholder="Enter Phone Number"
                  />

                  <Form.Text className="text-muted text-danger">
                    {errors.number && errors.number}
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicFirstName">
                  <Form.Label
                    style={{
                      marginBottom: '10px'
                    }}
                  >
                    First Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="first_name"
                    onChange={handleFieldsChange}
                    placeholder="Enter First Name"
                  />

                  <Form.Text className="text-muted text-danger">
                    {errors.first_name && errors.first_name}
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicLastName">
                  <Form.Label
                    style={{
                      marginBottom: '10px'
                    }}
                  >
                    Last Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    onChange={handleFieldsChange}
                    placeholder="Enter Last Name"
                    name="last_name"
                  />
                  <Form.Text className="text-muted text-danger">
                    {errors.last_name && errors.last_name}
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicAddress1">
                  <Form.Label
                    style={{
                      marginBottom: '10px'
                    }}
                  >
                    Address 1
                  </Form.Label>
                  <Form.Control
                    onChange={handleFieldsChange}
                    type="text"
                    placeholder="Enter Address1"
                    name="address_1"
                  />

                  <Form.Text className="text-muted text-danger">
                    {errors.address_1 && errors.address_1}
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicAddress2">
                  <Form.Label
                    style={{
                      marginBottom: '10px'
                    }}
                  >
                    Address 2
                  </Form.Label>
                  <Form.Control
                    onChange={handleFieldsChange}
                    type="text"
                    placeholder="Enter Address2"
                    name="address_2"
                  />

                  <Form.Text className="text-muted text-danger">
                    {errors.address_2 && errors.address_2}
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicCity">
                  <Form.Label
                    style={{
                      marginBottom: '10px'
                    }}
                  >
                    City
                  </Form.Label>
                  <Form.Control
                    name="city"
                    type="text"
                    onChange={handleFieldsChange}
                    placeholder="Enter City"
                  />

                  <Form.Text className="text-muted text-danger">
                    {errors.city && errors.city}
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicState">
                  <Form.Label
                    style={{
                      marginBottom: '10px'
                    }}
                  >
                    State
                  </Form.Label>
                  <Form.Control
                    name="state"
                    type="text"
                    onChange={handleFieldsChange}
                    placeholder="Enter State"
                  />

                  <Form.Text className="text-muted text-danger">
                    {errors.state && errors.state}
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPostcode">
                  <Form.Label
                    style={{
                      marginBottom: '10px'
                    }}
                  >
                    Postcode
                  </Form.Label>
                  <Form.Control
                    name="postcode"
                    type="text"
                    onChange={handleFieldsChange}
                    placeholder="Enter Postcode"
                  />
                  <Form.Text className="text-muted text-danger">
                    {errors.postcode && errors.postcode}
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicCountry">
                  <Form.Label
                    style={{
                      marginBottom: '10px'
                    }}
                  >
                    Country
                  </Form.Label>
                  <Form.Control
                    name="country"
                    type="text"
                    onChange={handleFieldsChange}
                    placeholder="Enter Country"
                  />
                  <Form.Text className="text-muted text-danger">
                    {errors.country && errors.country}
                  </Form.Text>
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  style={{
                    background: '#0000FE',
                    borderColor: '#fff'
                  }}
                >
                  Save
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
                    <span>${props.totalPrice}</span>
                  </div>
                </div>
                <div className="order-summary">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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

export default connect(mapStateToProps, null)(withRouter(Checkout));
