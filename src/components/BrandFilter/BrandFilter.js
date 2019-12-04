import React, { Component } from "react";
import { connect } from "react-redux";
import "./BrandFilter.scss";
import { categories } from "../../data/brands";
import { addBrandToFilter, removeBrandFromFilter } from "../../actions";
import { getCategoriesAction } from "../../actions/categoryAction";

class BrandFilter extends Component {
  componentDidMount() {
    this.props.dispatch(getCategoriesAction());
  }

  handleSelectBox = e => {
    const name = e.target.name;
    const value = e.target.checked;

    if (e.target.checked) {
      this.props.dispatch(addBrandToFilter(name));
    } else {
      this.props.dispatch(removeBrandFromFilter(name));
    }
  };

  render() {
    const catgories = this.props.category.categories;
    let categories;
    if (catgories) {
      categories = catgories.map(category => {
        return category.title;
      });
    }

    const { dispatch, brandItemsCount } = this.props;

    return (
      <div className="card mb-3">
        <div className="card-header bg-danger">
          <h3 className="text-white">Categories</h3>
        </div>
        <ul className="list-group flex-row flex-wrap">
          {categories
            ? categories.map(category => {
                return (
                  <li className="list-group-item flex-50" key={category}>
                    <label className="custom-checkbox text-capitalize">
                      {" "}
                      {category}{" "}
                      <span class="badge badge-danger">
                        {brandItemsCount[category]}
                      </span>
                      <input
                        type="checkbox"
                        name={category}
                        className="custom-checkbox__input"
                        onInput={this.handleSelectBox}
                      />
                      <span className="custom-checkbox__span" />
                    </label>
                  </li>
                );
              })
            : ""}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const brandItemsCount = {};

  state.shop.products.forEach(p => {
    brandItemsCount[p.category] = brandItemsCount[p.category] + 1 || 1;
  });

  return {
    brandItemsCount,
    category: state.category
  };
};

export default connect(
  mapStateToProps,
  null
)(BrandFilter);
