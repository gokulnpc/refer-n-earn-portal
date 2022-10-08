import "./Portal.css";
import { React, useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBInput,
  MDBCheckbox,
  MDBIcon
} from "mdb-react-ui-kit";
import CollapsibleExample from "./CollapsibleExample";
function Portal() {
  let navigate = useNavigate();
  const[id,setid]=useState("");
  const[info,setinfo]=useState({});
  const [justifyActive, setJustifyActive] = useState("tab1");
  const getData = async () => {
    console.log(localStorage.getItem('dataKey'));
    let token={
      token:localStorage.getItem('dataKey')
    }
    await axios.post('http://localhost:8080/auth/jwt',token).then(respond => {
      setinfo(respond.data.response);
            console.log(info);
        }).catch(respond => {
          console.log("Session expired...");
          localStorage.removeItem("dataKey");
          return navigate("/");
        });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
    <CollapsibleExample/>
    <div class="g-container">
        <br />
        <br />
        <br />
        <div class="card">
          <h5 class="card-header">Username</h5>
          <i class="fas fa-user-ninja"></i>
          <div class="card-body">
            <p class="card-text">
            {info.fullname}
            </p>
          </div>
        </div>
        <br />
        <div class="card">
          <h5 class="card-header">Rewards Earned</h5>
          <div class="card-body">
            <p class="card-text">
            {info.coins}
            </p>
          </div>
        </div>
        <br />
        <div class="card">
          <h5 class="card-header">Referral Link</h5>
          <div class="card-body">
            <p class="card-text">
              {'http://localhost:8080'+'/invite/'+info._id}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Portal;

