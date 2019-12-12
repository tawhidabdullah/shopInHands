import React, { Component } from 'react';
import './ReviewItem.scss';
import Moment from 'react-moment';
import StarRatings from 'react-star-ratings';

export default class ReviewItem extends Component {
  render() {
    const {
      avatar,
      name,
      date,
      rating,
      review,
      _id,
      date_created
    } = this.props.review;
    const { isAdmin } = this.props;

    let isAdminContent = '';

    if (isAdmin) {
      isAdminContent = (
        <div
          className=" icon-wrapper-review"
          onClick={this.props.deleteReview.bind(this, _id)}
        >
          <span className="icon delete" data-tooltip="Delete" />
        </div>
      );
    }

    return (
      <div class="content-wrap">
        <div class="comment-item">
          <div class="comment-item--inner">
            {/* <div class="is-left">
              <figure class="avatar">
                <img src={avatar} alt={name} />
              </figure>
            </div> */}
            <div class="is-right">
              <div class="is-right--inner">
                <a href="" class="name">
                  {name}
                </a>
                <small>
                  {' '}
                  <Moment format="YYYY/MM/DD">{date_created}</Moment>
                </small>
                <div class="the--comment">
                  <p>{review}</p>
                </div>
                <div class="ratings">
                  {/* <Rating
                    initialRating={rating}
                    // fullSymbol="fa fa-star fa-2x"
                  /> */}

                  <StarRatings
                    rating={rating}
                    numberOfStars={5}
                    starRatedColor="#FF0000"
                    starDimension="20px"
                    starSpacing="4"
                  />

                  <span
                    style={{
                      color: '#FF0000',
                      marginLeft: '7px',
                      fontSize: '16px',
                      marginTop: '4px'
                    }}
                  >
                    {rating}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
