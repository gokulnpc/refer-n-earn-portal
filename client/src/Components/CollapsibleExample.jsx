import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { useNavigate} from "react-router-dom";
import { React, useState,useEffect } from "react";
function CollapsibleExample() {
  const[ref,setref]=useState('');
  let navigate = useNavigate();
  async function logout() {
    localStorage.removeItem("dataKey");
    return navigate("/");
  }
  async function referal() {
    console.log(ref);
    await axios.post(ref).then(respond => {
        console.log(respond);
    }).catch(error => {
      console.log(error);
      console.log("not added");
    });
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">REFER EARN PORTAL</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Referral id"
            className="me-2"
            aria-label="Search"
            value={ref}
            onChange={(e) => { (setref(e.target.value)) }}
          />
          <Button variant="outline-success" onClick={referal}>Submit</Button>
        </Form>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav>
            <Nav.Link href="#deets"><Button variant="light" onClick={logout}>Logout</Button>{' '}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


export default CollapsibleExample;