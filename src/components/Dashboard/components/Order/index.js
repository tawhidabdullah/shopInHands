import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { getCustomerOrders } from '../../../../actions/authAction';
import Moment from 'react-moment';
import { Table } from 'react-bootstrap';

import './order.scss';

const index = ({ history, auth, getCustomerOrders }) => {
  const { orders, isLoading } = auth;
  useEffect(() => {
    getCustomerOrders();
  }, []);

  return (
    <div className="order">
      <div
        className="block-title"
        style={{
          marginBottom: '20px'
        }}
      >
        <span>Orders</span>
      </div>
      {!isLoading && orders && orders.length > 0 ? (
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Billing Address</th>
              <th>Shipping Address</th>
              <th>Product Quantity</th>
              <th>Created At</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(
              (
                { billingAddress, shippingAddress, status, date, products },
                index
              ) => {
                return (
                  <tr key={index + 1}>
                    <td>{index + 1}</td>
                    <td>{billingAddress}</td>
                    <td>{shippingAddress}</td>
                    <td>{products.length}</td>
                    <td>
                      <Moment format="YYYY/MM/DD">{date}</Moment>
                    </td>
                    <td>{status}</td>
                  </tr>
                );
              }
            )}
          </tbody>
        </Table>
      ) : (
        !isLoading && <h2>No Order has been created yet!</h2>
      )}
      {isLoading && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <h2>Loading...</h2>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, {
  getCustomerOrders
})(withRouter(index));
