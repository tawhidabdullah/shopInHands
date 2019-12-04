import React, { Component } from "react";
import "./CategoriesContent.scss";
import { connect } from "react-redux";
import ShowCategoryCotent from "./ShowCategoryCotent/ShowCategoryContent";

// import actions
import {
  addCategoryAction,
  deleteCategoryAction
} from "../../../../actions/categoryAction";

class CategoriesContent extends Component {
  state = {
    title: "",
    addCategory: false,
    showCategory: false,
    errors: {}
  };

  onAddCategoryClicked = () => {
    this.setState({
      addCategory: true,
      showCategory: false
    });
  };

  onCategorySubmit = e => {
    e.preventDefault();
    let categoryData = {};
    categoryData.title = this.state.title;
    this.props.addCategoryAction(categoryData);
  };

  onShowCategoryClicked = () => {
    this.setState({
      showCategory: true,
      addCategory: false
    });
  };

  onCategoryAddChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onCategoryDelete = id => {
    this.props.deleteCategoryAction(id);
  };


  componentWillReceiveProps(nextprops) {
    if (nextprops.errors) {
      this.setState({
        errors: nextprops.errors
      });
    }
  }

  render() {
    let showCategories;
    let addCategoryContent;
    let errors = this.state.errors;
    let errlabel;
    if (errors) {
      if (errors.title || errors.msgs) {
        errlabel = <label>{errors.title || errors.msgs}</label>;
      }
    }
    if (this.state.addCategory) {
      addCategoryContent = (
        <div className="notes-module cf">
          <form className="notes-form" onSubmit={this.onCategorySubmit}>
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.onCategoryAddChange}
              placeholder="Add a Category"
            />
            <input type="submit" value="Add" />
            {errlabel}
          </form>
        </div>
      );
    }

    if (this.state.showCategory) {
      showCategories = (
        <ShowCategoryCotent onTrashClick={this.onCategoryDelete} />
      );
    }

    return (
      <div>
        <section className="statistics">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6">
                <div
                  className="box"
                  id="addCategory"
                  onClick={this.onAddCategoryClicked}
                >
                  <i className="fa fa-plus fa-fw bg-danger" />
                  <div className="info">
                    <h3>Add Category</h3>
                    <p>Add categories for better navigation</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div
                  className="box"
                  id="showCategory"
                  onClick={this.onShowCategoryClicked}
                >
                  <i className="fa fa-file fa-fw bg-success" />
                  <div className="info">
                    <h3>5,245</h3> <span>Categories</span>
                    <p>Categories makes everything simple </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div>
          {this.state.addCategory ? addCategoryContent : showCategories}
        </div>
      </div>
    );
  }
}

const mapStateToProp = state => {
  return {
    category: state.category,
    errors: state.errors
  };
};

export default connect(
  mapStateToProp,
  { addCategoryAction, deleteCategoryAction }
)(CategoriesContent);
