import React, { useState } from "react";
import "./ProductSlider.scss";

const ProductSlider = ({ imgData }) => {
  return (
    <aside className="col-sm-5 border-right">
      <article className="gallery-wrap">
        <div className="img-big-wrap">
          <div style={{ padding: "2rem" }}>
            <img
              src={`/${imgData}`}
              style={{ width: "100%", height: "100%" }}
              alt="get a life"
            />
          </div>
        </div>
      </article>
    </aside>
  );
};

export default ProductSlider;
