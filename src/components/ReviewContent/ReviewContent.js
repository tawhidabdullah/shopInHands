import React, { Component } from 'react';
import './ReviewContent.scss';
import { connect } from 'react-redux';
import { getProductReviews, deleteReview } from '../../actions/productAction';
import ReviewItem from './ReviewItem';
import Spinner from '../commonFeilds/Spinner';

class ReviewContent extends Component {
  componentDidMount() {
    const productId = this.props.productId;
    this.props.getProductReviews(productId);
  }

  componentDidUpdate() {
    // const productId = this.props.productId;
    // this.props.getProductReviews(productId);
  }
  onClickDeleteReview = reviewId => {
    const productId = this.props.productId;
    this.props.deleteReview(productId, reviewId);
  };

  render() {
    const { reviews } = this.props.reviews;
    console.log('reviews', reviews);
    const { isAdmin } = this.props.user;

    let reviewItemContent = <Spinner />;

    if (reviews) {
      if (reviews.length > 0) {
        reviewItemContent = reviews.map(review => {
          return (
            <ReviewItem
              review={review}
              isAdmin={isAdmin}
              deleteReview={this.onClickDeleteReview}
            />
          );
        });
      } else if (reviews.length === 0) {
        reviewItemContent = (
          <h2 className="display-5 text-center">No Reviews</h2>
        );
      }
    }
    return <div>{reviewItemContent}</div>;
  }
}

const mapStateToProps = state => {
  return {
    reviews: state.review,
    user: state.auth
  };
};

export default connect(mapStateToProps, { getProductReviews, deleteReview })(
  ReviewContent
);
