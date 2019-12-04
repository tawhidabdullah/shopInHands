import React, { Component } from "react";
import "./ReviewItem.scss";
import Moment from "react-moment";
export default class ReviewItem extends Component {
  render() {
    const { avatar, name, date, text, _id } = this.props.review;
    const { isAdmin } = this.props;

    let isAdminContent = "";

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
            <div class="is-left">
              <figure class="avatar">
                <img src={avatar} alt={name} />
              </figure>
            </div>
            <div class="is-right">
              {isAdminContent}
              <div class="is-right--inner">
                <a href="" class="name">
                  {name}
                </a>
                <small>
                  {" "}
                  <Moment format="YYYY/MM/DD">{date}</Moment>
                </small>
                <div class="the--comment">
                  <p>{text}</p>
                </div>
                <div class="ratings">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="shareCount plus feather feather-chevron-up"
                  >
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                  <span class="share share-count share-plus">1</span>{" "}
                  <span class="bar">|</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="shareCount minus feather feather-chevron-down"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>{" "}
                  <span class="share share-count share-minus" />
                  <span class="share sharing-init">Share</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
