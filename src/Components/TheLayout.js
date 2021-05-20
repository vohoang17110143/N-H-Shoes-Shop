import React from "react";
import Header from "./Header/Header";
import TheContent from "./TheContent";
import Footer from "./Footer/Footer";
import { CBreadcrumbRouter } from "@coreui/react";
import routes from './../routes';
const TheLayout = () => {
  return (
    <div className="c-app c-default-layout container-fluid " style={{margin:"0",padding:"0"}}>
      <div className="c-wrapper">
        <Header />

        <div className="c-body">

          <TheContent />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default TheLayout;
