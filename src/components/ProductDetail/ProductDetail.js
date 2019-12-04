import React from "react";
import { connect } from "react-redux";
import { formatMoney } from "../../pipes/priceFormatter";
import { addProductToCart } from "../../actions";
import "./ProductDetail.scss";
const ProductDetail = props => {
  const { title, category, price, desc, reviews } = props.product;

  const onCart = () => {
    props.dispatch(addProductToCart(props.product));
  };

  return (
    <aside className="col-sm-7">
      <article className="card-body p-5">
        <h3 className="title mb-3">{title}</h3>

        <p className="price-detail-wrap">
          <span className="price h3 text-primary">
            <span className="currency">$</span>
            <span className="num">{price}</span>
          </span>
        </p>
        <div class="product-rating">
          <ul>
            <li class="fa fa-fw fa-lg fa-star" />
            <li class="fa fa-fw fa-lg fa-star" />
            <li class="fa fa-fw fa-lg fa-star" />
            <li class="fa fa-fw fa-lg fa-star" />
            <li class="fa fa-fw fa-lg fa-star-half" />
          </ul>
          <span class="product-reviews">
            <a href="#">{reviews.length} Reviews</a>
          </span>
        </div>
        <dl className="item-property">
          <dt>Description</dt>
          <dd>
            <p className="text-capitalize">{desc}</p>
          </dd>
        </dl>
        <dl className="param param-feature">
          <dt>Category</dt>
          <dd className="text-capitalize">{category}</dd>
        </dl>

        <hr />
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
