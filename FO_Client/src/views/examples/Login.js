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

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Alert
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";

///import Service User
import UserDataService from "../../services/user.service";


class Login extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }


  ///Login User Code 
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeMail = this.onChangeMail.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangePass = this.onChangePass.bind(this);
    this.logUser = this.logUser.bind(this);

    this.state = {
      id: null,
      name: "",
      mail: "",
      phone: null,
      password: "",

      submitted: false,
      log: 0
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeMail(e) {
    this.setState({
      mail: e.target.value
    });
  }

  onChangePhone(e) {
    this.setState({
      phone: e.target.value
    });
  }

  onChangePass(e) {
    this.setState({
      password: e.target.value
    });
  }



  logUser() {
    var data = {
      mail: this.state.mail,
      password: this.state.password
    };

    UserDataService.login(data)
      .then(response => {
        if (response.data == 'invalid credentials')
          this.setState({
            log: -1
          });
        else{
          this.setState({
            log: 1,
            submitted: true
          });
          window.currentUserID=90; 
          window.localStorage.setItem("id", response.data._id);
          window.localStorage.setItem("mail", response.data.mail);
          window.localStorage.setItem("name", response.data.name);
          window.localStorage.setItem("phone", response.data.phone);
          window.localStorage.setItem("picture", response.data.picture);
          window.localStorage.setItem("type", response.data.type);
          window.location.href = '/profil';
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return (
      <>
      { !window.localStorage.getItem("id") ? (
                  <span></span>
                ) : ( window.location.href = '/' )
        }
        <DemoNavbar />
        <main ref="main">
          <section className="section section-shaped section-lg">
            <div className="shape shape-style-1 bg-gradient-warning">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <Container className="pt-lg-7">
              <Row className="justify-content-center">
                <Col lg="5">
                  <Card className="bg-secondary shadow border-0">

                    <CardBody className="px-lg-5 py-lg-5">
                      <div className="text-center text-muted mb-4">
                        <large>Sign in with credentials</large>
                      </div>

                      {this.state.log == -1 ? (
                        <div>
                          <Alert color='danger' fade={true}>Invalid Credentials !</Alert>
                        </div>
                      ) : <h6></h6>}
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Email"
                            type="email"
                            id="mail"
                            required
                            value={this.state.mail}
                            onChange={this.onChangeMail}
                            name="mail"
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-lock-circle-open" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Password"
                            type="password"
                            autoComplete="off"
                            id="password"
                            required
                            value={this.state.password}
                            onChange={this.onChangePass}
                            name="password"
                          />
                        </InputGroup>
                      </FormGroup>
                      <div className="custom-control custom-control-alternative custom-checkbox">
                        <input
                          className="custom-control-input"
                          id=" customCheckLogin"
                          type="checkbox"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor=" customCheckLogin"
                        >
                          <span>Remember me</span>
                        </label>
                      </div>
                      <div className="text-center">

                        <Button
                          className="mt-4"
                          color="warning"
                          type="button"
                          onClick={this.logUser}
                        > Sign in </Button>

                      </div>

                    </CardBody>
                  </Card>
                  <Row className="mt-3">

                    <Col className="text-right" xs="12">
                      <a
                        className="text-light"
                        href="/register-page"
                      >
                        <small>Create new account</small>
                      </a>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default Login;
