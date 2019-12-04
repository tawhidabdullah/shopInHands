import React, { Component } from "react";
import FileUploads from "../commonFeilds/FileUploads";
import { connect } from "react-redux";
import { getProductAction } from "../../actions/productAction";
// import ShowImage from '../commonFeilds/ShowImage';

class AddProducts extends Component {
  render() {
    return (
      <div>
        <div
          style={{
            background: "whitesmoke",
            padding: "5px 20px"
          }}
        >
          <div className="add-product-heading">
            <h4 className="display-3 text-center mb-4">Add your Product</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            {" "}
            <FileUploads />
          </div>
          <div className="col-md-6 pt-4">
            <p className="lead text-muted">
              A wonderful serenity has taken possession of my entire soul, like
              these sweet mornings of spring which I enjoy with my whole heart.
              I am alone, and feel the charm of existence in this spot, which
              was created for the bliss of souls like mine. I am so happy, my
              dear friend, so absorbed in the exquisite sense of mere tranquil
              existence, that I neglect my talents. I should be incapable of
              drawing a single stroke at the present moment; and yet I feel that
              I never was a greater artist than now.
            </p>
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
)(AddProducts);
