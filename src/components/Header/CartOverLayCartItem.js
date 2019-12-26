import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import { shortenTitle } from '../../pipes/shortenTitle';
// import { formatMoney } from '../../pipes/priceFormatter';
import { decrementCartQuantity, incrementCartQuantity } from '../../actions';

const CartOverLayCartItem = ({
  handleToggleCartBar,
  handleRemoveCartItem,
  cartItem,
  dispatch
}) => {
  const [itemQuantity, setItemQuantity] = useState(cartItem.quantity);

  const incrementOrDecrement = (e, type) => {
    const value = itemQuantity;
    console.log(type, value);

    if (type === 'inc' && value < 10) {
      setItemQuantity(itemQuantity + 1);
      dispatch(incrementCartQuantity(id));
    }

    if (type === 'desc' && value > 1) {
      setItemQuantity(itemQuantity - 1);
      dispatch(decrementCartQuantity(id));
    }
  };

  const { image, id, name, price, history, quantity } = cartItem;
  return (
    <div className="cart-item">
      <img
        onClick={() => {
          handleToggleCartBar();
          history.push(`/products/${id}`);
        }}
        src={`http://192.168.0.102:5000${image[0]}`}
        alt="productImg"
      />
      <div className="">
        <h4
          onClick={() => {
            handleToggleCartBar();
            history.push(`/products/${id}`);
          }}
        >
          {name}
        </h4>
        <h5>৳{price}</h5>
        <span className="remove-item" onClick={() => handleRemoveCartItem(id)}>
          <i
            className="fa fa-trash"
            style={{
              marginRight: '5px',
              color: '#FF5C00'
            }}
          ></i>
          remove
        </span>
      </div>
      <div>
        <i
          className="fa fa-chevron-up"
          onClick={e => {
            incrementOrDecrement(e, 'inc');
          }}
        ></i>
        <p className="item-amount">{quantity}</p>
        <i
          className="fa fa-chevron-down"
          onClick={e => {
            incrementOrDecrement(e, 'desc');
          }}
        ></i>
      </div>
    </div>
  );
};

export default connect()(withRouter(CartOverLayCartItem));
