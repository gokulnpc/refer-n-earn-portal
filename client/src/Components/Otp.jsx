import { React, useState, useEffect } from "react";
import Swal from 'sweetalert2';
import {
  MDBContainer,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBInput
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
function Otp() {
  let navigate = useNavigate();
  const [otp, setotp] = useState('');
  const getData = async () => {
    let email = {
      email: localStorage.getItem('email')
    }
    await axios.post('http://localhost:8080/auth/otpgeneration', email).then(respond => {
      return true;
    }).catch(respond => {
      console.log("Session expired...");
      localStorage.removeItem("dataKey");
      return navigate("/");
    });
  };
  async function submit() {
    let otps = {
      otp: otp
    }
    await axios.post('http://localhost:8080/auth/emailauth', otps).then(respond => {
      console.log("successfully logged in");
      Swal.fire(
        'Good job!',
        'You have successfully registered!',
        'Enjoy'
      )
      return navigate("/home");
    }).catch(respond => {
      console.log("OTP expired...");
      localStorage.removeItem("dataKey");
      return navigate("/");
    });
  }
  useEffect(() => {
    getData();
  }, []);

  const [justifyActive, setJustifyActive] = useState("tab1");

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

      <MDBTabsContent>
        <center><b> <p class="fw-bold">Please Enter OTP</p></b></center>
        <MDBTabsPane show={justifyActive === "tab1"}>
          <MDBInput wrapperClass="mb-4" label="OTP" id="form1" type="text" value={otp}
            onChange={(e) => { (setotp(e.target.value)) }} />
          <MDBBtn className="mb-4 w-100" onClick={submit}>Submit</MDBBtn>
        </MDBTabsPane>
      </MDBTabsContent>
    </MDBContainer>
  );
}

export default Otp;