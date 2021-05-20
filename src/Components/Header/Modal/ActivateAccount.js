import React, { useState } from "react";
import authApi from '../../../api/authApi';
import { Modal, Button } from "react-bootstrap";


const ActivateAccount = (props) => {

    const {accessShow} =props
    const {handleAccessClose} = props;
    const [accessComplete, setAccessComplete] = useState("");
    const [accessFail, setAccessFail] = useState("");
    const [accessCode, setAccessCode] = useState("");
   const [accessError, setAccessError] = useState({});
    const onchangeAccessCode = (e) => {
        setAccessCode(e.target.value);
      };
      const closeNotify = () =>{
        setAccessFail("");
        setAccessComplete("");
        setAccessError({});
      }
      const activaeAcountSubmit = async (event) => {
        event.preventDefault();
    
        let errors = {};
        if (accessCode === "") {
          errors.msg = "Không được để trống !";
        } else if (accessCode.length < 6) {
          errors.msg = "Mã xác thực có 6 ký tự !";
        }
    
        setAccessError(errors);
        if (errors.msg == null) {
          authApi
            .ConfirmCode(accessCode)
            .then((res) => {
              setAccessComplete(res);
              setAccessFail("");
              setAccessError({});
            })
            .catch((error) => {
              setAccessFail(error.response.data.message);
              setAccessComplete("");
              setAccessError({});
            });
        }
      };
    
    return (
       
      <Modal
      show={accessShow}
      onHide={() => {
        handleAccessClose();
          closeNotify();
        }}

      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Kích hoạt tài khoản </Modal.Title>
      </Modal.Header>
      <form onSubmit={activaeAcountSubmit}>
        <Modal.Body>
          <span className="errMessage">{accessError.msg}</span>
          <span className="errMessage">{accessFail}</span>
          <span className="successMssg">{accessComplete.message}</span>
          <div className="form-group">
            <input
              type="number"
              className="form-control"
              placeholder="Enter code ..."
              onChange={onchangeAccessCode}
              maxLength={6}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
        handleAccessClose();
          closeNotify();
        }}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Activate
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
    )
}

export default ActivateAccount
