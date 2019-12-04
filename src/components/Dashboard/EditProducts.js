import React, { Component } from "react";
import FileUploads from "../commonFeilds/FileUploads";
import { connect } from "react-redux";
import { getProductAction } from "../../actions/productAction";

class EditProducts extends Component {
  render() {
    const { title, desc, category, productImage, price } = this.props;
    return (
      <div>
        <div
          style={{
            background: "whitesmoke",
            padding: "5px 20px"
          }}
        >
          <h4 className="display-3 text-center mb-4">Edit your Product</h4>
        </div>
        <div className="row">
          <div className="col-md-12">
            {" "}
            <FileUploads
              title={title}
              desc={desc}
              category={category}
              productImage={productImage}
              price={price}
            />
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
  { getProductAction }
)(EditProducts);
