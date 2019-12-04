import React from "react";

export default function ShowCategory({
  title,
  date,
  onTrashClick,
  category_id
}) {
  return (
    <li className="list_shopping li_num_0_1">
      <div className="col_md_1_list">
        <p>seeproducts</p>
      </div>
      <div className="col_md_2_list">
        <h4>CREATED</h4>
        <p>{date}</p>
      </div>
      <div className="col_md_3_list">
        <h4>{title}</h4>
      </div>
      <div className="col_md_4_list">
        <div className="cont_trash">
          <i
            onClick={onTrashClick.bind(this, category_id)}
            className="fa fa-trash"
          />
        </div>
      </div>
    </li>
  );
}
