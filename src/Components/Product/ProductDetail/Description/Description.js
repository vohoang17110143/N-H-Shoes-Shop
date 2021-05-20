import React from "react";
import './Description.css'
const Description = (props) => {
  const { description } = props;
  return (
    <div className="description-list">
      <div className="container-fliud ">
      <h3>Mô tả sản phẩm</h3>
        <div >
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>
      </div>
    </div>
  );
};

export default Description;
