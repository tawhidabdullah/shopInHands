import React from 'react';
import { connect } from 'react-redux';
import { formatMoney } from '../../pipes/priceFormatter';
import { addProductToCart } from '../../actions';
import './ProductDetail.scss';
const ProductDetail = props => {
  const { name, price, desc } = props.product;

  const onCart = () => {
    props.dispatch(addProductToCart(props.product));
  };

  return (
    <aside className="col-sm-7">
      <article className="card-body p-5">
        <h3 className="title mt-3 mb-3" style={{marginLeft: '-12px'}}>{name}</h3>
        <div class="row">
        <h1><i class="fa fa-dollar" aria-hidden="true"></i> {price}</h1>
        &nbsp; &nbsp;
        <h3><del>799</del></h3>
        &nbsp; &nbsp;
        <h2 class="text-success">30% off</h2>
      </div>

      <div class="row">
        <h3 class="text-warning"><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star-half-o" aria-hidden="true"></i><i class="fa fa-star-o" aria-hidden="true"></i></h3>
        &nbsp; &nbsp;
        <h5>1200 star rating  and 250 reviews</h5>
      </div>
      

        {/* <p className="price-detail-wrap">
          <span className="price h3 text-primary">
            <span className="currency">$</span>
            <span className="num">{price}</span>
          </span>
        </p> */}
      
      

        <hr />
        <button className="btn btn-lg btn-outline-primary mr-4 ">
          Buy Now
        </button>
        <button onClick={onCart} className="btn btn-lg btn-outline-danger ">
          <i className="fa fa-shopping-cart" /> Add to cart
        </button>
      </article>
    </aside>
  );
};

export default connect()(ProductDetail);
