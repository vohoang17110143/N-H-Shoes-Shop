import React from "react";
import { Link } from "react-router-dom";
import "./ProductItem.css";
import { formatMoney } from "./../../../functions/formatMoney";
import jwt_decode from "jwt-decode";
import { connect } from "react-redux";
import favoriteApi from "./../../../api/favoriteApi";
import StarRatingComponent from "react-star-rating-component";

const ProductItem = (props) => {
  // localStorage.setItem("currentProduct","")
  const { product, AuthToken } = props;
  // create favorite
  const addFavorite = (customerId, favorite) => {
    favoriteApi
      .createFavorite(customerId, favorite)
      .then((res) => {})
      .catch((err) => {});
  };
  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <div key={product.colorId} className="product-item">
        <Link
          style={{ textDecoration: "none" }}
          to={{
            pathname: `/product/${product.name.split(" ").join("+")}`,
            state: {
              productId: product.productId,
              proName: product.name,
              image: product.image,
              colorDefault: product.color_Name,
            },
          }}
          onClick={
            localStorage.getItem("isLoggedIn") === "false"
              ? null
              : (e) => {
                if(localStorage.getItem("isLoggedIn") === 'true'){
                  addFavorite(
                    
                    localStorage.getItem("cusID") ,
                    { ProductId: product.productId, NumberClick: 1 }
                  );
                }
                }
          }
        >
          <img
            src={product.image}
            alt="product image"
            className="img-thumbnail"
          />
          <div className="productName">
            <span>{product.name}</span>
          </div>
        </Link>

        <div className="row rate-row">
          <div className="rating-inactive">
            <span className="fa fa-star "></span>
            <span className="fa fa-star "></span>
            <span className="fa fa-star "></span>
            <span className="fa fa-star "></span>
            <span className="fa fa-star "></span>
          </div>
          <div
            className="rating-active"
            style={{ width: `${(product.averageStar*(67/5))}px` }}
          >
            <span className="fa fa-star "></span>
            <span className="fa fa-star "></span>
            <span className="fa fa-star "></span>
            <span className="fa fa-star "></span>
            <span className="fa fa-star "></span>
          </div>
        </div>
        <div className="row mx-0">
          <div className="col-7 px-0">
            <span className="priceProduct">
              {formatMoney(product.price)} vnd
            </span>
          </div>
          <div className="col-5 px-0">
            <span className="colorName" style={{ textTransform: "uppercase" }}>
              {product.color_Name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    AuthToken: state.AuthToken,
  };
};
export default connect(mapStateToProps, null)(ProductItem);
