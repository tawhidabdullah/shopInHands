import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  getWishListsAction,
  deleteWishListAction
} from "../../../../actions/userAction";
import "./WishListContent.scss";
import Spinner from "../../../commonFeilds/Spinner";

class WishListContent extends Component {
  state = {
    searchInput: ""
  };

  componentWillMount() {
    this.props.getWishListsAction();
  }
  onSearchInputChange = e => {
    this.setState({
      searchInput: e.target.value.substr(0, 20)
    });
  };

  onClickDeleteWishList = id => {
    this.props.deleteWishListAction(id);
    this.props.getWishListsAction();
  };

  render() {
    const {
      wishLists: { wishLists }
    } = this.props.wishlist;
    let filterWishListContents = <Spinner />;

    if (wishLists) {
      if (wishLists.length === 0) {
        filterWishListContents = (
          <div className="haventCreatedProduct">
            <h1 className="display-4 text-center">
              {" "}
              Your don't have any wish list yet!
            </h1>
          </div>
        );
      } else if (wishLists.length > 0) {
        filterWishListContents = wishLists
          .filter(
            wishList => wishList.title.indexOf(this.state.searchInput) !== -1
          )
          .map(wishList => {
            console.log(wishList);
            return (
              <React.Fragment>
                <ul className="horizontal col header">
                  <li className="content  dated-content">Date</li>
                  <li className="content titled-content">TITLE</li>
                  <li className="content desced-content ">Description</li>
                  <li className="content right Remained-content">PRICING </li>
                </ul>

                <ul className="data col horizontal" key={wishList._id}>
                  <li className="content date-content">
                    <div>Nov 3</div>
                    <div className="secondary">4 months</div>
                  </li>
                  <li className="content has-image ">
                    <img
                      className="img"
                      src={wishList.productImage}
                      alt={wishList.desc}
                    />
                    <div>{wishList.title}</div>
                    <div className="secondary">{wishList.category}</div>
                  </li>
                  <li className="content desc-content">
                    <div>{wishList.desc}</div>
                    <div className="secondary">In stock</div>
                  </li>
                  <li className="content Remain-content">
                    <div id="price">${wishList.price}</div>
                    <div className="secondary">2.3</div>
                  </li>
                  <li className="content">
                    <div
                      className="icon-wrapper"
                      onClick={this.onClickDeleteWishList.bind(
                        this,
                        wishList._id
                      )}
                    >
                      <span className="icon delete" data-tooltip="Delete" />
                    </div>
                  </li>
                </ul>
              </React.Fragment>
            );
          });
      }
    }
    return (
      <div>
        <div className="containerx">
          <div className="header-wrapper">
            <div className="title">All the Wish lists here !</div>
            <div className="note">
              Recent: <span className="focus">$250 </span>to{" "}
              <span className="focus">Best Buy</span> on Saturday, June 5.
            </div>
            <div class="produc-wrap searchwrap">
              <div class="search">
                <input
                  onChange={this.onSearchInputChange}
                  value={this.state.searchInput}
                  type="text"
                  class="searchTerm searchTerm__red"
                  placeholder="search wish lists"
                />
                <button type="submit" class="searchButton searchButton__red">
                  <i class="fa fa-search" />
                </button>
              </div>
            </div>
            <span
              className="material-button"
              onClick={() => {
                this.props.history.push("/products");
              }}
            >
              <i className="fa fa-plus" />
            </span>
          </div>
          <div className="content-wrapper">
            <div className="table-wrapper">{filterWishListContents}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProp = state => {
  return {
    wishlist: state.wishList
  };
};

export default connect(
  mapStateToProp,
  { getWishListsAction, deleteWishListAction }
)(withRouter(WishListContent));
