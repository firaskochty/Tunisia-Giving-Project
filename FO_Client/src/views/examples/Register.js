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
  Alert,
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";

///import Service User
import UserDataService from "../../services/user.service";

class Register extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  ///Register User Code
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this); // bich el function OnchangeName twalli accessible mil code el kol
    this.onChangeMail = this.onChangeMail.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangePass = this.onChangePass.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.registerUser = this.registerUser.bind(this);

    this.state = {
      id: null,
      name: "",
      mail: "",
      phone: null,
      password: "",
      type: "",

      submitted: false,
      isError: false,
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeMail(e) {
    this.setState({
      mail: e.target.value,
    });
  }

  onChangePhone(e) {
    this.setState({
      phone: e.target.value,
    });
  }

  onChangePass(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onChangeType(e) {
    this.setState({
      type: e.target.value,
    });
  }

  saveUser() {
    const { name, mail, phone, password, type } = this.state;
    // if(!mail.includes("@")){
    //   alert("Please enter a valid email")
    //   return ;
    // }

    var data = {
      name: this.state.name,
      mail: this.state.mail,
      phone: this.state.phone,
      password: this.state.password,
      type: this.state.type,
    };

    console.log(data);
    UserDataService.register(data)
      .then((response) => {
        this.setState({
          name: response.data.name,
          mail: response.data.mail,
          phone: response.data.phone,
          password: response.data.password,
          type: response.data.type,

          submitted: true,
        });
      })
      .catch((e) => {
        console.dir(e);
        this.setState({ isError: true, errMsg: e.response.data.message });
        // alert(e.response.data.message)
      });
  }

  registerUser() {
    this.setState({
      id: null,
      name: "",
      mail: "",
      phone: 0,
      password: "",
      submitted: false,
    });
  }

  render() {
    return (
      <>
        {!window.localStorage.getItem("id") ? (
          <span></span>
        ) : (
          (window.location.href = "/")
        )}
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
                        <large>Sign up with credentials</large>
                      </div>

                      {this.state.submitted ? (
                        <div>
                          <Alert variant="success">
                            Good! Account created with Success{" "}
                            <b>
                              <a href="/login-page"> go to Login </a>
                            </b>{" "}
                          </Alert>
                        </div>
                      ) : (
                        <h6></h6>
                      )}
                      {this.state.isError ? (
                        <div>
                          <Alert color="danger">
                            {" "}
                            Oups !!! : <b> {this.state.errMsg} </b>{" "}
                          </Alert>
                        </div>
                      ) : (
                        <h6></h6>
                      )}

                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-hat-3" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Name"
                            type="text"
                            id="name"
                            required
                            value={this.state.name}
                            onChange={this.onChangeName}
                            name="name"
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
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
                              <i className="ni ni-mobile-button" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Phone Number"
                            type="number"
                            id="phone"
                            required
                            value={this.state.phone}
                            onChange={this.onChangePhone}
                            name="phone"
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

                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend"></InputGroupAddon>
                          <select
                            id="type"
                            name="type"
                            value={this.state.type}
                            onChange={this.onChangeType}
                            required
                          >
                            <option> Choose Your Type </option>
                            <option value="client">Client </option>
                            <option value="organization">Organization </option>
                          </select>
                        </InputGroup>
                      </FormGroup>

                      <div className="text-muted font-italic">
                        <small>
                          password strength:{" "}
                          <span className="text-success font-weight-700">
                            strong
                          </span>
                        </small>
                      </div>
                      <Row className="my-4">
                        <Col xs="12">
                          <div className="custom-control custom-control-alternative custom-checkbox">
                            <input
                              className="custom-control-input"
                              id="customCheckRegister"
                              type="checkbox"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheckRegister"
                            >
                              <span>
                                I agree with the{" "}
                                <a
                                  href="#nchallah"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  Privacy Policy
                                </a>
                              </span>
                            </label>
                          </div>
                        </Col>
                      </Row>
                      <div className="text-center">
                        <Button
                          className="mt-4"
                          color="warning"
                          type="button"
                          onClick={this.saveUser}
                        >
                          Create account
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
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

export default Register;
