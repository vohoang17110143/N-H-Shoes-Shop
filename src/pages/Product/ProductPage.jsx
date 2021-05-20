import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ProductList from "../../Components/Product/ProductList/ProductList";
import "./ProductPage.css";
import ProductItem from "../../Components/Product/ProductItem/ProductItem";
import productApi from "./../../api/productApi";
import { actFetchProducts, ProName } from "./../../actions/productAction";
import * as types from "../../actions/types";
import jwt_decode from "jwt-decode";
import cartApi from "./../../api/cartApi";
import { getNumberInCart } from "./../../actions/cartAction";
import { HubConnectionBuilder } from "@microsoft/signalr";
import Pagination from "react-responsive-pagination";
import Filter from "./../../Components/Filter/Filter";
import { Col, Row } from "react-bootstrap";
import Recommend from "./../../Components/Recommendation/Recommend";
import { useLocation } from "react-router-dom";
import favoriteApi from "./../../api/favoriteApi";
import { actFetchFavorites } from "./../../actions/favoriteAction";
import MessengerCustomerChat from "react-messenger-customer-chat";

const ProductPage = (props) => {
  const { products, carts, AuthToken } = props;
  const { brands } = props;
  const [pro, setPro] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage, setProductPerPage] = useState(10);
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  const location = useLocation();
  // ProName("")
  const loadProduct = async () => {
    //load product into redux
    var resultList = await productApi.getProducts();
    props.fetchProducts(resultList);
    // getFavoriteByCustomerId
    favoriteApi.getFavoriteByCustomerId(AuthToken.cusID).then((res) => {
      console.log("res" + res);
      props.fetchFavorites(res);
    });
  };
  const loadFavorite = () => {
    // getFavoriteByCustomerId
    favoriteApi.getFavoriteByCustomerId(AuthToken.cusID).then((res) => {
      console.log(res);
      props.fetchFavorites(res);
    });
  };

  const connection = new HubConnectionBuilder()
    .withUrl("https://localhost:5001/hubs/shopshoe")
    .withAutomaticReconnect()
    .build();

  useEffect(() => {
    loadProduct();

    connection
      .start()
      .then((res) => {
        console.log("result");
        connection.on("Add_Delete_Product", () => {
          loadProduct();
        });
      })
      .catch((e) => console.log("Connection failed: ", e));
  }, []);
  useEffect(() => {
    loadFavorite();
  }, []);

  const showProducts = (products) => {
    var result = null;
    if (products.length > 0) {
      result = products.map((product, index) => {
        return <ProductItem product={product} key={index} />;
      });
    }
    return result;
  };

  const indexOfLastPost = currentPage * productPerPage;
  const indexOfFirstPost = indexOfLastPost - productPerPage;
  const currentProduct = products.slice(indexOfFirstPost, indexOfLastPost);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / productPerPage); i++) {
    pageNumbers.push(i);
  }
  const name = () => {
    if (location.pathname == "/") {
      return "";
    }
    return location.pathname.split("/")[2].split("+").join(" ");
  };
  const filterCart = () => {
    var currentDate = new Date();
    for (let index = 0; index < carts.length; index++) {
      var addDate = new Date(carts[index].dateAdd);
      var expires = (currentDate.getTime() - addDate.getTime()) / 60000;
      if (expires > 10) {
        carts.splice(index, 1);
      }
    }
  };
  setInterval(filterCart(), 10);

  return (
    <div>
      <div className="background-light ">
        <div className="row  mr-5" style={{ marginLeft: "4.3em" }}>
          <div className="col-9 p-0">
            <h5 style={{ marginLeft: "3px" }}>{name()}</h5>
            <ProductList>{showProducts(currentProduct)}</ProductList>
          </div>
          <div className="col-3 p-0 my-2">
            <Filter products={products} />
            <Recommend products={products} />
          </div>
        </div>

        <MessengerCustomerChat
          pageId="108181108126171"
          appId="1194578134370274"
          htmlRef="<REF_STRING>"
        />
        <Pagination
          className="paging"
          current={currentPage}
          total={pageNumbers.length}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.ProductList,
    AuthToken: state.AuthToken,
    carts: state.CartList,
  };
};

const mapDispatchToPro = (dispatch) => {
  return {
    fetchProducts: (products) => {
      dispatch(actFetchProducts(products));
    },
    fetchCart: (carts) => {
      dispatch(getNumberInCart(carts));
    },
    fetchFavorites: (favorites) => {
      dispatch(actFetchFavorites(favorites));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToPro)(ProductPage);
