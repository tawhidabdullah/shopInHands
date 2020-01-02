import React, { useState } from 'react';
import { connect } from 'react-redux';
import { shortenTitle } from '../../pipes/shortenTitle';
import { formatMoney } from '../../pipes/priceFormatter';
import './CartItem.scss';
import { baseApiURL } from '../../constants/variable';
import { withRouter } from 'react-router';
import {
  addProductToCart,
  decrementCartQuantity,
  incrementCartQuantity,
  removeProductToCart
} from '../../actions';

const CartItem = ({
  name,
  price,
  description,
  quantity,
  _id,
  image,
  dispatch,
  history
}) => {
  const [itemQuantity, setItemQuantity] = useState(quantity);
  const removeItem = () => {
    dispatch(removeProductToCart(_id));
  };

  const handleQuantityChange = e => {
    /*  const value = e.target.value;
        console.log(value)

        if(value > 0 && value <= 10) {
            setItemQuantity(value);
            dispatch(addProductToCart(_id));
        } */
  };

  const incrementOrDecrement = (e, type) => {
    const value = itemQuantity;

    if (type === 'inc' && value < 10) {
      setItemQuantity(itemQuantity + 1);
      dispatch(incrementCartQuantity(_id));
    }

    if (type === 'desc' && value > 1) {
      setItemQuantity(itemQuantity - 1);
      dispatch(decrementCartQuantity(_id));
    }
  };

  return (
    <div className="row align-items-center mb-3">
      <div className="col-12 col-sm-12 col-md-2 text-center">
        <img
          onClick={() => {
            history.push(`/products/${_id}`);
          }}
          style={{
            cursor: 'pointer'
          }}
          className="img-responsive"
          src={`${baseApiURL}${image && image}`}
          style={{ height: '60%', width: '60%' }}
          alt={description}
        />
      </div>
      <div className="col-12 text-sm-center col-sm-12 text-md-left col-md-6">
        <h4
          className="product-name"
          style={{
            color: '#333',
            fontWeight: '700'
          }}
        >
          <strong>{name}</strong>
        </h4>
      </div>
      <div className="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row product-quantity-container align-items-center">
        <div
          className="col-6 col-sm-6 col-md-6 text-md-right"
          style={{ paddingTop: '5px' }}
        >
          <h6>
            <strong>
              {price}৳ <span className="text-muted">x</span>
            </strong>
          </h6>
        </div>
        <div className="col-4 col-sm-4 col-md-4">
          <div className="quantity">
            <input
              onClick={e => {
                incrementOrDecrement(e, 'inc');
              }}
              type="button"
              value="+"
              className="plus"
            />
            <input
              onChange={handleQuantityChange}
              type="number"
              step="1"
              max="10"
              min="1"
              value={itemQuantity}
              title="Qty"
              className="qty"
              size="4"
            />
            <input
              onClick={e => {
                incrementOrDecrement(e, 'desc');
              }}
              type="button"
              value="-"
              className="minus"
            />
          </div>
        </div>
        <div className="col-2 col-sm-2 col-md-2 text-right">
          <button
            onClick={removeItem}
            type="button"
            className="btn btn-outline-danger btn-xs"
          >
            <i className="fa fa-trash" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default connect()(withRouter(CartItem));
