import React from "react";
import "./Search.css";
import productApi from './../../api/productApi';
import { actFetchProducts } from "../../actions/productAction";
import { connect } from 'react-redux';

const SearchBar = (props) => {
  const searchProduct = async (e) => {
    const key = e.target.value;
    var data = [];
    if (key === '') {
      data = await productApi.getProducts();
    } else {
      data = await productApi.searchProduct(key);
    }
    props.fetchProducts(data);
  };

  return (
    <div className="main">
      <div className="input-group">
        <input
          type="text"
          style={{ fontSize: "20px", color: "black" }}
          className="form-control"
          placeholder="Bạn muốn tìm gì..."
          onChange={searchProduct}
        />
        <div className="input-group-append">
          <button className="btn btn-secondary" type="button">
            <i className="fa fa-search" style={{fontSize:"15px"}}/>
          </button>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: (products) => {
      dispatch(actFetchProducts(products));
    },
  };
};
export default connect(null,mapDispatchToProps)(SearchBar);
