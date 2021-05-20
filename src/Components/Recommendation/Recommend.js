import React, { useEffect, useState } from "react";
import "./Recommend.css";
import jwt_decode from "jwt-decode";
import ImageTest from "../../assets/image/1.jpg";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { formatMoney } from "./../../functions/formatMoney";
const Recommend = (props) => {
  const { products, AuthToken, favorites } = props;
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const filterFavorite = (products, favoriteProductList) => {
    return products.filter((product) => {
      return favoriteProductList.includes(product.productId);
    });
  };
  const loadData = () => {
    setFavoriteProducts(filterFavorite(products, favorites));
  };

  useEffect(() => {
    loadData();
  }, [favorites]);

  return (
    <div className="widget clearfix" style={{ maxWidth: "300px" }}>
      <div className="widget_title">
        <h4>Sản phẩm gợi ý </h4>
      </div>
      {AuthToken.isLoggedIn === true ? (
        <div>
          {favoriteProducts.map((favoriteProduct, index) => (
            <div className="widget_content" key={index}>
              <Link
                to={{
                  pathname: `/product/${favoriteProduct.name
                    .split(" ")
                    .join("+")}`,
                  state: {
                    productId: favoriteProduct.productId,
                    proName: favoriteProduct.name,
                    image: favoriteProduct.image,
                  },
                }}
                style={{ textDecoration: "none" }}
              >
                <div className="spost clearfix">
                  <div className="entry-image">
                    <img src={favoriteProduct.image} />
                  </div>
                  <div className="entry-c">
                    <div className="entry-title">{favoriteProduct.name}</div>
                    <ul className="entry-meta">
                      <li style={{ color: "red" }}>
                        {formatMoney(favoriteProduct.price)} đ{" "}
                      </li>
                    </ul>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    AuthToken: state.AuthToken,
    favorites:state.FavoriteList
  };
};
export default connect(mapStateToProps, null)(Recommend);
