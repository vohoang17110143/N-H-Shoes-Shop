import React, { Fragment, useState, useEffect } from "react";
import { MenuItems } from "../MenuItems";
import { Link } from "react-router-dom";
import Logo from "../../../assets/icons/Shop logo.jpg";
import { connect } from "react-redux";
import { actFetchProducts } from "./../../../actions/productAction";
import { actFetchCates } from "./../../../actions/cateAction";
import productApi from "./../../../api/productApi";
import {
  CCard,
  CCardBody,
  CCollapse,
  CBreadcrumbRouter,
  CNavbarNav,
  CNavbarBrand,
  CToggler,
  CNavbar,
  CImg,
} from "@coreui/react";
const CateHeader = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { categories } = props;


  const fetchProduct = async (index, id) => {
    var data = [];
    var sex = "";
    if (id === null) {
      switch (index) {
        case 0:
          sex = "Nữ";
          localStorage.setItem("collection", "GIÀY NỮ")
          data = await productApi.getProductBySex(sex);
          break;
        case 1:
          sex = "Nam";
          localStorage.setItem("collection", "GIÀY NAM")
          data = await productApi.getProductBySex(sex);
          break;
        case 2:
          localStorage.setItem("collection", "GIÀY SALE 79K")
          data = await productApi.getProductByPrice(75);
          break;
        case 3:
          localStorage.setItem("collection", "GIÀY SALE 100K")
          data = await productApi.getProductByPrice(100);
          break;
        default:
            localStorage.setItem("collection", "")
          data = await productApi.getProducts();
          break;
      }
    } else {
      data = await productApi.getProductByCategory(id);
    }

    props.fetchProducts(data);
  };


  return (
    <Fragment>
      <CNavbar expandable="md" color="faded" light>
        <CToggler
          className="body-toggler"
          inNavbar
          onClick={() => setIsOpen(!isOpen)}
          style={{ backgroundColor: "white" }}
        />
        <CNavbarBrand
          to="/"
          className="ml-md-5 justify-content-center brand-icon "
        >
          <img
            className="shop-logo"
            src={Logo}
            alt="Shop logo"
            onClick={(e) => fetchProduct(null, null)}
          ></img>
        </CNavbarBrand>
        <h4 className="name-nabar">SẢN PHẨM</h4>
        <CCollapse className="item-menu-cl" show={isOpen} navbar>
          <CNavbarNav className="ml-auto justify-content-center nav-menu ">
            <div className="container-list mr-5">
              <ul className="list-inline ">
                {MenuItems.map((item, index) => {
                  return (
                    <li
                      className="list-inline-item  nav-item dropdown"
                      key={index}
                    >
                      <figure
                        className="figure"
                        onClick={(e) => fetchProduct(index, null)}
                      >
                        <Link
                          className="title-link"
                          to={item.url + "/" + item.title.split(" ").join("+")}
                        >
                          <img
                            className="type-img"
                            src={item.img}
                            alt={item.alt}
                            style={{ width: 45, height: 45 }}
                          ></img>
                        </Link>
                        <figcaption className="type-item">
                          <Link
                            className="title-link"
                            to={
                              item.url + "/" + item.title.split(" ").join("+")
                            }
                          >
                            {item.title}
                          </Link>
                        </figcaption>
                      </figure>
                      {index < 2 ? (
                        <ul className=" cate dropdown-menu  mt">
                          {categories
                            .filter((el) => el.sex === item.sex)
                            .map((category, index) => (
                              
                              <li
                                key={index}
                                onClick={(e) =>
                                  {fetchProduct(0, category.categoryId);
                                  localStorage.setItem("collection", category.name)}
                                }
                              >
                                <a className="dropdown-item" style={{cursor:"pointer"}}>
                                  <Link
                                  style={{textDecoration:"none",color:"black"}}
                                    to={{
                                      pathname: `/collections/${category.name
                                        .split(" ")
                                        .join("+")}`,
                                        // state: {
                                        //   cateName: category.name
                                        // }
                                    }}
                                  
                                  >
                                    {category.name}
                                  </Link>
                                </a>
                              </li>
                            ))}
                        </ul>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </div>
          </CNavbarNav>
        </CCollapse>
      </CNavbar>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    categories: state.CategoryList.cates,
    userInfo: state.UserInfo,
  };
};
const mapDispatchToPro = (dispatch) => {
  return {
    fetchProducts: (products) => {
      dispatch(actFetchProducts(products));
    },
    fetchCate: (cates) => {
      dispatch(actFetchCates(cates));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToPro)(CateHeader);
