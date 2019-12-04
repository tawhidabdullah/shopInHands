import React, { Component } from "react";
import { connect } from "react-redux";
import "./AddReview.scss";
import { addProductReview } from "../../actions/productAction";

class AddReview extends Component {
  state = {
    post: "",
    errors: {}
  };

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { user } = this.props.auth;
    const { productId } = this.props;

    const newComment = {
      text: this.state.post,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addProductReview(productId, newComment);
    this.setState({ post: "" });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      <div class="widget-post" aria-labelledby="post-header-title">
        <div class="widget-post__header">
          <h2 class="widget-post__title" id="post-header-title">
            <i class="fa fa-pencil" aria-hidden="true" />
            Write review
          </h2>
        </div>
        <form
          id="widget-form"
          class="widget-post__form"
          name="form"
          aria-label="post widget"
          onSubmit={this.onSubmit}
        >
          <div class="widget-post__content">
            <label for="post-content" class="sr-only">
              Add your review here....
            </label>
            <textarea
              name="post"
              value={this.state.post}
              onChange={this.onChange}
              error={errors.post}
              id="post-content"
              class="widget-post__textarea scroller"
              placeholder="Add your review here...."
            />
          </div>

          <div class="widget-post__actions post--actions">
            <div class="post-actions__attachments" />
            <div class="post-actions__widget ">
              <button class="post-actions__publish">Publish</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addProductReview }
)(AddReview);
