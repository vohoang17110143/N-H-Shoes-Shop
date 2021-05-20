import React from "react";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";

import "./Dropdown.css";
const TheHeaderDropdown = () => {
  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down" >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <i className="fas fa-ellipsis-v drop-menu-icon-1"></i>
      </CDropdownToggle>
      <CDropdownMenu className="drop-menu-m mt-md-2" style={{background:"black"}} placement="bottom-end">

      <CDropdownItem className="item-sp" href="#" >
           ĐĂNG NHẬP
        </CDropdownItem>
        <CDropdownItem className="item-sp">
          ĐĂNG KÝ
        </CDropdownItem>
        <CDropdownItem className="item-sp">
           GIỚI THIỆU
        </CDropdownItem>

        <CDropdownItem className="item-sp">
         CHÍNH SÁCH BẢO HÀNH
        </CDropdownItem>

        <CDropdownItem className="item-sp">
          GIAO HÀNG TOÀN QUỐC
        </CDropdownItem>

        <CDropdownItem className="item-sp">
          THAN PHIỀN, GÓP Ý
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
