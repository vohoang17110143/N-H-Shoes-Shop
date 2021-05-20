import React from "react";
import "./Footer.css";
import { faPhoneSquare, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="page-footer">
        <div className="col-md-12 text-center pt-3">
          <h3>N&H “LỰA CHỌN HOÀN HẢO”</h3>
        </div>
        <div className="footer-info row mt-4 ml-4 mr-4">
          <div className="col-md-6 col-sm-6 col-xs-12 ml-4">
            <h4>Chất lượng</h4>
            <p>
              N&H đảm bảo chất lượng cho tất cả sản phẩm bán tại Store N&H bằng
              chính sách bảo hành vĩnh viễn
            </p>
            <h4>Phục vụ</h4>
            <p>
              N&H cam kết chất lượng phục vụ tốt nhất chuyên nghiệp nhất cho mọi
              khách hàng bằng chính sách hoàn tiền và tặng quà nếu nhân viên
              phục vụ quý khách không chu đáo
            </p>
            <h4>Hỗ trợ</h4>
            <p>
              Nếu bạn gặp rắc rối về sản phẩm hay chất lượng dịch vụ của MVC,
              hãy gọi ngay đến số 091234566 hoặc inbox ở fanpage{" "}
              <a href="https://www.google.com.vn/?gws_rd=ssl">https://www.google.com.vn/?gws_rd=ssl</a>
            </p>
          </div>
          
          <div className="col-md-3 col-sm-3 col-xs-12 ml-4">
            <p>&nbsp;</p>
            <p style={{ margin: 0 }}>Đặt hàng và thu tiền tận nơi toàn quốc</p>
            <p
              className="boxed-content-title"
              style={{ color: "#f0f8ff", fontSize: "16px", fontWeight: "bold" }}
            >
              <FontAwesomeIcon icon={faPhoneSquare} /> 1900633349
            </p>
            <br />
            <h4>Thông tin</h4>
            <ul className="contract-list">
              <li>
                <Link className="contract-item" to="/">
                  <FontAwesomeIcon icon={faAngleRight} /> Giới thiệu về MWC
                </Link>
              </li>
              <li>
                <Link className="contract-item" to="/">
                  <FontAwesomeIcon icon={faAngleRight} /> Tuyển dụng
                </Link>
              </li>
              <li>
                <Link className="contract-item" to="/">
                  <FontAwesomeIcon icon={faAngleRight} /> Quy chế hoạt động
                </Link>
              </li>
              <li>
                <Link className="contract-item" to="/">
                  <FontAwesomeIcon icon={faAngleRight} /> Chính sách và quy định
                </Link>
              </li>
            </ul>
          </div>
          <div className ="col-md-2 col-sm-2 col-xs-12 ml-4">
            <p>&nbsp;</p>
            <h4>CSKH</h4>
            <p>
              <a
                // style={{ color: "#337ab7" }}
                // href="#"
                // target="blank"
              >
                Than phiền/Chăm sóc khách hàng
              </a>
            </p>
            <h4>FAQ</h4>
            <ul className="customer-help-list">
              <li >
                <Link className="customer-help-item" to="/">
                <FontAwesomeIcon icon={faAngleRight} />  Vận chuyển
                </Link>
              </li>
              <li >
                <Link className = "customer-help-item" to="/">
                <FontAwesomeIcon icon={faAngleRight} />  Chính sách đổi trả
                </Link>
              </li>
              <li >
                <Link className="customer-help-item" to="/">
                <FontAwesomeIcon icon={faAngleRight} />  Chính sách bảo hành
                </Link>
              </li>
            </ul>
          </div>
         
        </div>
      </footer>
    </div>
  );
};

export default Footer;
