import React, { Component } from "react";
import { connect } from "react-redux";
import ShowCategory from "./ShowCategory";
import Spinner from "../../../../commonFeilds/Spinner";

// import actions
import { getCategoriesAction } from "../../../../../actions/categoryAction";

class ShowCategoryContent extends Component {
  state = {
    searchInput: ""
  };
  componentWillMount() {
    this.props.getCategoriesAction();
  }

  onSearchInputChange = e => {
    this.setState({
      searchInput: e.target.value.substr(0, 20)
    });
  };

  render() {
    const categories = this.props.category.categories;
    let categoryItem = <Spinner />;
    if (categories) {
      categoryItem = categories
        .filter(
          category => category.title.indexOf(this.state.searchInput) !== -1
        )
        .map(category => {
          return (
            <ShowCategory
              title={category.title}
              category_id={category._id}
              date={category.date}
              onTrashClick={this.props.onTrashClick}
              key={category.title}
            />
          );
        });
    }

    return (
      <div className="showCategorycontent">
        <div>
          <div className="search">
            <input
              type="text"
              className="searchTerm searchTerm__green"
              placeholder="Search products by name.."
              onChange={this.onSearchInputChange}
              value={this.state.searchInput}
            />
            <button type="submit" className="searchButton searchButton__green">
              <i className="fa fa-search" />
            </button>
          </div>
          <div className="cont_princ_lists">
            <ul>{categoryItem}</ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProp = state => {
  return {
    category: state.category
  };
};

export default connect(
  mapStateToProp,
  { getCategoriesAction }
)(ShowCategoryContent);
