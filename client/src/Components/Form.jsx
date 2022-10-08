import "../App.css";
import { React, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBInput,
  MDBCheckbox
} from "mdb-react-ui-kit";

function Form() {
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [pass, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [refer, setrefer] = useState("");
  const [justifyActive, setJustifyActive] = useState("tab1");
  //submit function : 
  async function submit() {
    let result = {
      "fullname": name,
      "email": email,
      "password": pass,
      "phoneNumber": mobile
    };
    function clear() {
      setName("");
      setemail("");
      setPassword("");
      setMobile("");
      setrefer("");
    }

    console.log(result);
    await axios.post('http://localhost:8080/auth/signup', result).then(respond => {
      //console.log("the frontend side is : ",respond);
      console.log(respond.data);
      clear();
      /*if(respond.data.status==200)
          return (<Redirect to={window.location.href="/"} />)*/
    }).catch(respond => {
      console.log(respond);
    });
  }
  async function loginbut() {
    let result = {
      "email": email,
      "password": pass,
    };
    function clear() {
      setemail("");
      setPassword("");
    }
    console.log(result);
    localStorage.setItem('email',email);
    await axios.post('http://localhost:8080/auth/signin', result).then(respond => {
      console.log("the frontend side is : ", respond.data.message, respond.data.port);
      localStorage.setItem('dataKey', respond.data.message);
      clear();
      return navigate("/OTPAuthen");
      /*if(respond.data.status==200)
          return (<Redirect to={window.location.href="/"} />)*/
    }).catch(respond => {
      console.log("catch");
      console.log(respond);
    });
  }

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <MDBTabs
        pills
        justify
        className="mb-3 d-flex flex-row justify-content-between"
      >
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleJustifyClick("tab1")}
            active={justifyActive === "tab1"}
          >
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleJustifyClick("tab2")}
            active={justifyActive === "tab2"}
          >
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={justifyActive === "tab1"}>
          <MDBInput
            wrapperClass="mb-4"
            label="Email address"
            id="form1"
            type="email"
            value={email}
            onChange={(e) => { (setemail(e.target.value)) }}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            id="form2"
            type="password"
            value={pass}
            onChange={(e) => { (setPassword(e.target.value)) }}
          />

          <div className="d-flex justify-content-between mx-4 mb-4">
          </div>

          <MDBBtn className="mb-4 w-100" onClick={loginbut}>Sign in</MDBBtn>
        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === "tab2"}>
          <MDBInput
            wrapperClass="mb-4"
            label="Name"
            id="form1"
            value={name}
            onChange={(e) => { (setName(e.target.value)) }}
            type="text"
          />
          <MDBInput wrapperClass="mb-4" label="Email" id="form1" type="email" value={email} onChange={(e) => { (setemail(e.target.value)) }} />
          <MDBInput
            wrapperClass="mb-4"
            label="Mobile Number"
            id="form2"
            type="tel"
            value={mobile}
            onChange={(e) => { (setMobile(e.target.value)) }}
            pattern="[6-9]{1}[0-9]{9}"
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            id="form3"
            value={pass}
            onChange={(e) => { (setPassword(e.target.value)) }}
            type="password"
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Referal Code"
            id="form4"
            type="text"
            value={refer}
            onChange={(e) => { (setrefer(e.target.value)) }}
          />

          <div className="d-flex justify-content-center mb-4"></div>

          <MDBBtn className="mb-4 w-100" onClick={submit}>Sign up</MDBBtn>
        </MDBTabsPane>
      </MDBTabsContent>
    </MDBContainer>
  );
}

export default Form;
