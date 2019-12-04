import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../../../commonFeilds/Spinner";
import EditProducts from "../../EditProducts";
import "../../../styles_components/searchBar.scss";
import {
  getProductAction,
  deleteProductAction
} from "../../../../actions/productAction";
import "./ProductsContent.scss";

class ProductsContent extends Component {
  state = {
    editProduct: false,
    title: "",
    desc: "",
    category: "",
    price: "",
    productImage: "",
    searchInput: ""
  };

  onMaterialButtonclick = () => {
    this.props.clicked();
  };

  componentWillMount() {
    this.props.getProductAction();
  }

  onProductEdit(id, product) {
    this.setState({
      title: product.title,
      desc: product.desc,
      category: product.category,
      price: product.price,
      productImage: product.productImage,
      editProduct: true
    });
  }

  onProductDelete = id => {
    this.props.deleteProductAction(id);
  };

  componentWillUpdate() {
    this.props.getProductAction();
  }

  onSearchInputChange = e => {
    this.setState({
      searchInput: e.target.value.substr(0, 20)
    });
  };

  render() {
    const { products } = this.props.product;
    let fileterProductContents = <Spinner />;

    if (products) {
      if (products.length === 0) {
        fileterProductContents = (
         <div className='haventCreatedProduct'>
            <h1 className="display-4">You haven't created any products yet!</h1>
         </div>
        );
      } else if (products.length > 0) {
        fileterProductContents = products
          .filter(
            product => product.title.indexOf(this.state.searchInput) !== -1
          )
          .map(product => {
            return (
              <React.Fragment>
                <ul className="data col horizontal" key={product._id}>
                  <li className="content date-content">
                    <div>Nov 3</div>
                    <div className="secondary">4 months</div>
                  </li>
                  <li className="content has-image ">
                    <img
                      className="img"
                      src={product.productImage}
                      alt={product.desc}
                    />
                    <div>{product.title}</div>
                    <div className="secondary">{product.category}</div>
                  </li>
                  <li className="content desc-content">
                    <div>{product.desc}</div>
                    <div className="secondary">In stock</div>
                  </li>
                  <li className="content Remain-content">
                    <div id="price">${product.price}</div>
                    <div className="secondary">2.3</div>
                  </li>
                  <li className="content">
                    <div className="icon-wrapper">
                      <span
                        className="icon edit"
                        data-tooltip="Edit"
                        onClick={this.onProductEdit.bind(
                          this,
                          product._id,
                          product
                        )}
                      />
                      <span
                        className="icon delete"
                        data-tooltip="Delete"
                        onClick={this.onProductDelete.bind(this, product._id)}
                      />
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
            <div className="title">Here is your Products, {this.props.user.name}!</div>
            <div className="note">
              Recent: <span className="focus">$250 </span>to{" "}
              <span className="focus">Best Buy</span> on Saturday, June 5.
            </div>
           
            <span
              className="material-button"
              onClick={this.onMaterialButtonclick}
            >
              <i className="fa fa-plus" />
            </span>
          </div>
          <div className="content-wrapper">
            {this.state.editProduct ? (
              <EditProducts
                title={this.state.title}
                desc={this.state.desc}
                price={this.state.price}
                category={this.state.category}
                productImage={this.state.productImage}
              />
            ) : (
              <div className="table-wrapper">
                <ul className="horizontal col header">
                  <li className="content dated-content">Updated Date</li>
                  <li className="content titled-content">Titles</li>
                  <li className="content desced-content ">Description</li>
                  <li className="content right  Remained-content">Remaining</li>
                </ul>
                {fileterProductContents}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProp = state => {
  return {
    product: state.product
  };
};

export default connect(
  mapStateToProp,
  { getProductAction, deleteProductAction }
)(ProductsContent);
