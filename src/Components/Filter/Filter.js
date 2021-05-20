import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import "./Filter.css";
import brandApi from "./../../api/brandApi";
import colorApi from "./../../api/colorApi";
import { actFetchProducts } from "./../../actions/productAction";
import productApi from "./../../api/productApi";
import { CRow, CCol } from "@coreui/react";
import { Accordion, Card, Button } from "react-bootstrap";

const Filter = (props) => {
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const { products } = props;
  const [checked, setChecked] = useState(false);
  const [productAll, setProductAll] = useState([]);

  const [filters, setFilters] = useState({
    color_Name: [],
    brand: [],
    price: [],
  });
  const loadBrand = async () => {
    await brandApi.getBrand().then((res) => setBrands(res));
    await colorApi.getColors().then((res) => setColors(res));
    await productApi.getProducts().then((res) => setProductAll(res));
  };

  useEffect(() => {
    loadBrand();
  }, []);

  const multiFilter = (productAll, filters) => {
    const filterKeys = Object.keys(filters);
    return productAll.filter((product) => {
      return filterKeys.every((eachKey) => {
        if (!filters[eachKey].length) {
          return true;
        }
        if (eachKey == "color_Name") {
          return filters[eachKey].includes(
            product.color_Name
          );
        }
        if (eachKey == "brand") {
          return filters[eachKey].includes(
            product.name.split(" ").splice(-1)[0]
          );
        }
      });
    });
  };

  const filterProductsColor = (e, typeFile) => {
    switch (typeFile) {
      case "color":
        if (e.target.checked) {
          filters.color_Name.push(e.target.value);
        } else {
          for (let index = 0; index < filters.color_Name.length; index++) {
            if (filters.color_Name[index] == e.target.value) {
              filters.color_Name.splice(index, 1);
            }
          }
        }
        break;
      case "brand":
        if (e.target.checked) {
          filters.brand.push(e.target.value);
        } else {
          for (let index = 0; index < filters.brand.length; index++) {
            if (filters.brand[index] == e.target.value) {
              filters.brand.splice(index, 1);
            }
          }
        }
        break;
    }

    setFilters(filters);
    var dataFilter = multiFilter(productAll, filters);
    props.fetchProducts(dataFilter);
  };
  return (
    <Fragment>
      <Accordion className="filter-table" defaultActiveKey="0" style={{ maxWidth: "260px" }}>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0" style={{background: "#F5F5F5"}}>
            <h4>
              {" "}
              Lọc sản phẩm{" "}
              <i style={{ float: "right" }} className="fa-angle-down fa" />
            </h4>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0"  >
            <Card.Body style={{padding: "0"}}>
            {/* Brand filter */}
              <Accordion defaultActiveKey="0"  >
                <Card style={{width: "100%",border: "0",marginBottom: "0"}}>
                  <Accordion.Toggle as={Card.Header} eventKey="0" style={{border: "0"}}>
                    <b>Thương hiệu: </b>
                    <i style={{ float: "right" }} className="fa-angle-down fa" />
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0" >
                    <Card.Body style={{paddingTop: "0", paddingBottom: "0"}}>
                      <ul className="brand-list ">
                        {brands.map((i, index) => (
                          <li className="brand_item" key={index}>
                            <input
                              key={index}
                              value={i.name}
                              defaultChecked={checked}
                              onChange={(e) => {
                                setChecked(!checked);
                                filterProductsColor(e, "brand");
                              }}
                              type="checkbox"
                              className="mr-3"
                            />
                            {i.name}
                          </li>
                        ))}
                      </ul>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>

              <Accordion defaultActiveKey="0"  >
                <Card style={{width: "100%",borderLeft: "0",borderRight:"0",borderBottom: "0", marginBottom: "0"}}>
                  <Accordion.Toggle as={Card.Header} eventKey="0" style={{border: "0"} }>
                    <b>Màu sắc: </b>
                    <i style={{ float: "right" }} className="fa-angle-down fa" />
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0" >
                    <Card.Body style={{paddingTop: "0", paddingBottom: "0"}}>
                      <ul className="color-list">
                  {colors.map((c, index) => (
                    <li className="brand_item" key={index}>
                      <input
                        key={index}
                        value={c.name}
                        defaultChecked={checked}
                        onChange={(e) => {
                          setChecked(!checked);
                          filterProductsColor(e, "color");
                        }}
                        type="checkbox"
                        className="mr-3"
                      />
                      {c.name}
                    </li>
                  ))}
                </ul>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.ProductList,
    // carts: state.CartList,
    brands: state.BrandList,
  };
};

const mapDispatchToPro = (dispatch) => {
  return {
    fetchProducts: (products) => {
      dispatch(actFetchProducts(products));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToPro)(Filter);
