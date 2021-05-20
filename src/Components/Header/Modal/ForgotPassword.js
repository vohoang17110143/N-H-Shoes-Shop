import React, { useState } from "react";
import authApi from '../../../api/authApi';
import { Modal, Button } from "react-bootstrap";


const ForgotPassword = (props) => {
    const {forgotShow} = props;
    const {handleFogotClose} =props;
    const [acessEmail,setAccessEmail] = useState("")
    const [forgotSuccess,setForgotSuccess]= useState("");
    const [forgotFail,setForgotFail]= useState("");
    const [forgotError,setForgotError]= useState({});
    const onChangeEmailGet= (e) => {
        setAccessEmail(e.target.value);
      };
    
    
      const closeNotify = () =>{
        setForgotFail("");
        setForgotSuccess("");
        setForgotError({});
      }
      const onSubmitForgot= async (event) => {
        event.preventDefault();
    
        let errors = {};
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (acessEmail === "") {
          errors.msg = "Không được để trống !";
        } else if (!regex.test(acessEmail)) {
          errors.msg = "Không đúng định dạng email !";
        }
    
        setForgotError(errors);
        if (errors.msg == null) {
          authApi
            .forgotPassword(acessEmail)
            .then((res) =>{ 
              setForgotSuccess(res);
              setForgotError({});
              setForgotFail("");
            })
            .catch((error) => {
              setForgotFail(error.response.data.message);
              setForgotSuccess("");
              setForgotError({});
            });
        }
      };
     
    return (
        <Modal
        show={forgotShow}
        onHide={() => {
          handleFogotClose();
          closeNotify();
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Quên mật khẩu</Modal.Title>
        </Modal.Header>
        <form onSubmit={onSubmitForgot}>
          <Modal.Body>
            <span className="errMessage">{forgotError.msg}</span>
            <span className="errMessage">{forgotFail}</span>
            <span className="successMssg">{forgotSuccess.message}</span>
            <div className="form-group">
              <input
           className="form-control"
                  placeholder="Địa chỉ Email"
                  type="email"
                onChange={onChangeEmailGet}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => {
          handleFogotClose();
          closeNotify();
        }}>
              Hủy
            </Button>
            <Button variant="primary" type="submit">
              Xác thực
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    )
}

export default ForgotPassword
