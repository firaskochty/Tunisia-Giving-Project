/*!

=========================================================
* Argon Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Link } from "react-router-dom";
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
// reactstrap components
import {
  Button,
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";
import Input from "reactstrap/lib/Input";


class DemoNavbar extends React.Component {

  componentDidMount() {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();
  }
  state = {
    collapseClasses: "",
    collapseOpen: false
  };

  onExiting = () => {
    this.setState({
      collapseClasses: "collapsing-out"
    });
  };

  onExited = () => {
    this.setState({
      collapseClasses: ""
    });
  };
  
  

  render() {
    return (
      <>
        <header className="header-global">
          <Navbar
            className="navbar-main navbar-transparent navbar-light headroom"
            expand="lg"
            id="navbar-main"
          >
            <Container>
              <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
                <img
                  alt="..."
                  src={require("assets/img/brand/argon-react-white.png")}
                />
              </NavbarBrand>
              <button className="navbar-toggler" id="navbar_global">
                <span className="navbar-toggler-icon" />
              </button>
              <UncontrolledCollapse
                toggler="#navbar_global"
                navbar
                className={this.state.collapseClasses}
                onExiting={this.onExiting}
                onExited={this.onExited}
              >
                <div className="navbar-collapse-header">
                  <Row>
                    <Col className="collapse-brand" xs="6">
                      <Link to="/">
                        <img
                          alt="..."
                          src={require("assets/img/brand/argon-react.png")}
                        />
                      </Link>
                    </Col>
                    <Col className="collapse-close" xs="6">
                      <button className="navbar-toggler" id="navbar_global">
                        <span />
                        <span />
                      </button>
                    </Col>
                  </Row>
                </div>


                <Nav>
                  <a style={{ "padding-right": "25px" }} className="text-white" href="/fund-list" > Fund List</a>
                </Nav>
                <Nav>
                  <a style={{ "padding-right": "25px" }} className="text-white" href="/profil" >  My Profil</a>
                </Nav>
                <Nav>
                  <a style={{ "padding-right": "25px" }} className="text-white" href="/contact" >Contact</a>
                </Nav>

                {!window.localStorage.getItem("id") ? (
                  <Nav className="align-items-lg-center ml-lg-auto" navbar>
                    <NavItem className="d-none d-lg-block ml-lg-4">
                      <Button
                        outline
                        color="white"
                        href="/login-page"
                      >
                        <span className="nav-link-inner--text ml-1">
                          Login
                      </span>
                      </Button>

                      <Button
                        className="btn-warning btn-icon"

                        href="/register-page"
                      >
                        <span className="nav-link-inner--text ml-1">
                          Register
                      </span>
                      </Button>
                    </NavItem>
                  </Nav>
                ) : (
                    <Nav className="align-items-lg-center ml-lg-auto" navbar>
                      <NavItem className="d-none d-lg-block ml-lg-4">
                        <Button
                          type="submit"
                          outline
                          color="white"
                          onClick={() => {logOut();}}
                        >
                          <span className="nav-link-inner--text ml-1">
                            LogOut
                          </span>
                        </Button>
                      </NavItem>
                    </Nav>
                  )}




              </UncontrolledCollapse>
            </Container>
          </Navbar>
        </header>
      </>
    );
  }
}

function logOut() {
  window.localStorage.clear();
  window.location.href = '/';
}
export default DemoNavbar;
