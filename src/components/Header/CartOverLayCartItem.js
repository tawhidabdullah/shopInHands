import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import { shortenTitle } from '../../pipes/shortenTitle';
// import { formatMoney } from '../../pipes/priceFormatter';
import { decrementCartQuantity, incrementCartQuantity } from '../../actions';
import { baseApiURL } from '../../constants/variable';

const CartOverLayCartItem = ({
  handleToggleCartBar,
  handleRemoveCartItem,
  cartItem,
  dispatch,
  history
}) => {
  const [itemQuantity, setItemQuantity] = useState(cartItem.quantity);

  const incrementOrDecrement = (e, type) => {
    const value = itemQuantity;
    console.log(type, value);

    if (type === 'inc' && value < 10) {
      setItemQuantity(itemQuantity + 1);
      dispatch(incrementCartQuantity(_id));
    }

    if (type === 'desc' && value > 1) {
      setItemQuantity(itemQuantity - 1);
      dispatch(decrementCartQuantity(_id));
    }
  };

  const { image, _id, name, price, quantity } = cartItem;
  return (
    <div className="cart-item">
      <img
        onClick={() => {
          handleToggleCartBar();
          history.push(`/products/${_id}`);
        }}
        src={`${baseApiURL}${image[0]}`}
        alt="productImg"
        style={{
          cursor: 'pointer'
        }}
      />
      <div className="">
        <h4
          onClick={() => {
            handleToggleCartBar();
            history.push(`/products/${_id}`);
          }}
        >
          {name}
        </h4>
        <h5>৳{price}</h5>
        <span className="remove-item" onClick={() => handleRemoveCartItem(_id)}>
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
