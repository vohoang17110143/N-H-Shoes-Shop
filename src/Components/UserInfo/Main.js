import React from "react";

import Content from "./Content";
import SidebarMenu from './Menu/Sidebar/SidebarMenu';
import {


  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
} from "@coreui/react";
const Main = () => {
  return (
    <CRow style={{ backgroundColor: "white" }}>
    <CCol lg="3">
      <SidebarMenu />
    </CCol>
    <CCol lg="9" >
      <Content/>
    </CCol>
  </CRow>

  );
};

export default Main;
