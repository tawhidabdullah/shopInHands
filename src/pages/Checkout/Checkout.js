import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { postApi } from '../../utilities/wooApi';
import { useAlert } from 'react-alert';
import './checkout.scss';

const Checkout = props => {
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
      alert.show('Your Order Has Been Created SuccessFully');
    } catch (err) {
      alert.show('Something Went Wrong Went Creating The Order');

      console.log(err);
    }
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
                    background: '#666',
                    borderColor: '#666'
                  }}
                >
                  Create
                </Button>
              </Form>
            </div>
          </div>
          <div className="col-md-5">
            <div className="order-summary">
              <h2>Order Summary</h2>
              <div className="order-summary-price">
                <h3>{props.cartItems.length} items in Cart</h3>
                <span>${props.totalPrice}</span>
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
