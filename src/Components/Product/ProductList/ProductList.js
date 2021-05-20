import React from "react";
import ProductItem from "../ProductItem/ProductItem";

import './ProductList.css';

 const ProductList =props=>{

  return (
    <div className="container mt-0 pt-0  pb-0 pl-0 pr-0">
      {props.children}
    </div>
  );
};

export default ProductList;