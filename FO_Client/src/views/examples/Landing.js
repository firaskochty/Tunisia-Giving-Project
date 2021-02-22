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
// nodejs library that concatenates classes
import classnames from "classnames";



// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import CardsFooter from "components/Footers/CardsFooter.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
// index page sections
import Download from "../IndexSections/Download.js";
import { Link } from "react-router-dom";

import FundDataService from "../../services/fund.service";
import DonateDataService from "../../services/donate.service";
class Landing extends React.Component {
  state = {};
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;

    FundDataService.getAll() //bich ye5ou les funds ili fama bil getAll 
      .then(response => {
        this.setState({
          funds: response.data,  // funds tet7at feha les funds ili jew el kol 
          numberFund: response.data.length // iraja3lek 9adeh fama min fund 
        });
      })
      .catch(e => {
        console.log(e);
      });

    DonateDataService.getAll()
      .then(response => {
        this.setState({
          numberDonation: response.data.length //iraja3lek 9adeh fama min donation t3amlet
        });
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    const funds = this.state.funds;   //  hethi nich t7ot state funds  fi funds
    return (
      <>
        <DemoNavbar />
        <main ref="main">
          <div className="position-relative">
            {/* shape Hero */}
            <section className="section section-lg section-shaped">
              <div className="shape shape-style-1 shape-default bg-gradient-warning"> {/*hethi mta3 le background*/} </div>
              <br></br>
              <br></br>
              <Container className="py-lg-md d-flex">
                <div className="col px-0">
                  <Row>
                    <Col lg="12">
                      <h1 className="display-3 text-white">
                        Tunisia Giving
                        <span>n3awnou b3athna, Tounes Tet7assen </span>
                      </h1>
                      <p className="lead text-white">
                        The Tunisia Giving site is created by Tunisians to help each other ❤️
                      </p>

                    </Col>
                  </Row>
                </div>
              </Container>
              {/* SVG separator */}
              <div className="separator separator-bottom separator-skew">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  version="1.1"
                  viewBox="0 0 2560 100"
                  x="0"
                  y="0"
                >
                  <polygon
                    className="fill-white"
                    points="2560 0 2560 100 0 100"
                  />
                </svg>
              </div>
            </section>
          </div>

          <section className="section section-lg pt-lg-0 mt-200">
            <Container>

              <Row className="justify-content-center">
                <h1 className="text-uppercase" > fundraising Campaigns </h1>
                <br></br>
                <br></br>
                <Col lg="12">
                  <Row className="row-grid">

                    {/* hedhom les cards mta3 les Available donations  */}
                    {funds && funds.map((fund, index) => (
                      <>
                        {index < 3 ? (
                          <Col style={{ "padding-bottom": "25px" }} lg="4">
                            <Card className="card-lift shadow border-0">
                              <CardImg top height='180px' src={require("assets/img/pourVous.png")} alt="Card image cap" />
                              <CardBody className="py-5">
                                <h6 className="text-uppercase">
                                  <b>{fund.name}</b>
                                </h6>
                                <p className="description mt--2"> by <Link to={`/profil/${fund.orgid}`} >{fund.orgid} </Link> </p>
                                <p className="description mt-3">
                                  {fund.description.substring(0, 50)}...
                                </p>
                                <Row className="row-grid">
                                  <Col lg="6">
                                    <p className="description" ><b> Needed Amount</b></p>
                                    <p className="description mt--3" > {fund.amount} TND </p>
                                  </Col>
                                  <Col lg="6">
                                    <p className="description" ><b> End Date</b></p>
                                    {/* <p className="description mt--3" > {fund.datefin.substring(0, 10)} </p> */}
                                  </Col>
                                </Row>

                                <Button outline
                                  color="warning"
                                  href='/fund/${fund._id}'
                                  tag={Link} to={`/fund/${fund._id}`} // ki tenzel 3al button learn more bich ihzezk lil path /fund/**idfund ili bich icoufha fil fichier index.js ou fil index.js bich ihezek lil lil fichier js mta3 el route mte3ha 
                                >
                                  Learn more
                                </Button>
                              </CardBody>
                            </Card>
                          </Col>
                        ) : null}
                      </>
                    ))}
                    {/* Fin les cards mta3 les Available donations */}

                  </Row>
                </Col>
                <br></br>
                <Button className="" color="warning" href="/fund-list"> See More </Button>
              </Row>
            </Container>
          </section>


          <section className="section pb-0 bg-gradient-warning">
            <Container>
              <Row className="row-grid align-items-center">
                <Col className="order-lg-2 ml-lg-auto" md="6">
                  <div className="position-relative pl-md-5">
                    <img
                      alt="..."
                      className="img-center img-fluid"
                      src={require("assets/img/social-growth-animate.svg")}
                    />
                  </div>
                </Col>
                <Col className="order-lg-1" lg="6">
                  <div className="d-flex px-3">
                    <div>
                      <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-warning">
                        <i className="ni ni-chart-bar-32 text-warning" />
                      </div>
                    </div>
                    <div className="pl-4">
                      <h4 className="display-3 text-white">Some Numbers</h4>
                    </div>
                  </div>
                  <Card className="shadow shadow-lg--hover mt-5">
                    <CardBody>
                      <div className="d-flex px-3">
                        <div className="pl-4">
                          <h5 className="title text-success">
                            Number of Fundraise
                          </h5>
                          <p>
                            We have <b>{this.state.numberFund}</b> fundraise in our Site . Thank you ❤
                          </p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>

                  <Card className="shadow shadow-lg--hover mt-5">
                    <CardBody>
                      <div className="d-flex px-3">
                        <div className="pl-4">
                          <h5 className="title text-warning">
                            Number of Donation
                          </h5>
                          <p>
                            We have <b>{this.state.numberDonation}</b> Donation from all over Tunisia. Thank you ❤
                          </p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
            {/* SVG separator */}
            <div className="separator separator-bottom separator-skew zindex-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
          <section className="section section-lg">
            <Container>
              <Row className="justify-content-center text-center mb-lg">
                <Col lg="8">
                  <h2 className="display-3">The Tunisia Giving Team</h2>
                </Col>
              </Row>
              <Row>



                <Col className="mb-5 mb-lg-0" lg="12" md="12">
                  <div className="px-4">
                    <img
                      alt="..."
                      className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                      src={require("assets/img/theme/team-1-800x800.png")}
                      style={{ width: "200px" }}
                    />
                    <div className="pt-4 text-center">
                      <h5 className="title">
                        <span className="d-block mb-1">Firas Kochti</span>
                        <small className="h6 text-muted">Js Developer</small>
                      </h5>
                    </div>
                  </div>
                </Col>


              </Row>
            </Container>
          </section>

          <section className="section section-lg pt-0">
            <Container>
              <Card className="bg-gradient-warning shadow-lg border-0">
                <div className="p-5">
                  <Row className="align-items-center">
                    <Col lg="8">
                      <h3 className="text-white">
                        Tunisia Giving Simple for you
                      </h3>
                      <p className="lead text-white mt-3">
                        Tunisia Giving is a project carried out during my FullStack Js training at GoMyCode. Visit the GoMyCode site for more information.
                      </p>
                    </Col>
                    <Col className="ml-lg-auto" lg="3">
                      <Button
                        block
                        className="btn-white"
                        color="default"
                        href="https://gomycode.tn/TN-FR/home"
                        size="lg"
                      >
                        Visit GoMyCode
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Container>
          </section>

          <section className="section  bg-gradient-warning">
            <Container className="pt-lg pb-300">
              <Row className="text-center justify-content-center">
                <Col lg="10">
                  <h2 className="display-3 text-white">Tunisia Giving</h2>
                </Col>
              </Row>
              <Row className="row-grid mt-5">
                <Col lg="4">
                  <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                    <i className="ni ni-check-bold text-primary" />
                  </div>
                  <h5 className="text-white mt-3">Easy</h5>
                  <p className="text-white mt-3">
                    Start accepting donations in 10 minutes or less. No approval process and instant payments
                  </p>
                </Col>
                <Col lg="4">
                  <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                    <i className="ni ni-world text-primary" />
                  </div>
                  <h5 className="text-white mt-3">Fundraising Freedom</h5>
                  <p className="text-white mt-3">
                    Available globally and in every major currency. Crowdfund whatever matters to you
                  </p>
                </Col>
                <Col lg="4">
                  <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                    <i className="ni ni-satisfied text-primary" />
                  </div>
                  <h5 className="text-white mt-3">Dedicated Support</h5>
                  <p className="text-white mt-3">
                    Our 24/7 support and personal fundraising coaches ensure you raise more money online
                  </p>
                </Col>
              </Row>
            </Container>
            {/* SVG separator */}
            <div className="separator separator-bottom separator-skew zindex-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
          <section className="section section-lg pt-lg-0 section-contact-us">
            <Container>
              <Row className="justify-content-center mt--300">
                <Col lg="8">
                  <Card className="bg-gradient-secondary shadow">
                    <CardBody className="p-lg-5">
                      <h4 className="mb-1">Want to work with us?</h4>
                      <p className="mt-0">
                        Your project is very important to us.
                      </p>
                      <FormGroup
                        className={classnames("mt-5", {
                          focused: this.state.nameFocused
                        })}
                      >
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-user-run" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Your name"
                            type="text"
                            onFocus={e => this.setState({ nameFocused: true })}
                            onBlur={e => this.setState({ nameFocused: false })}
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup
                        className={classnames({
                          focused: this.state.emailFocused
                        })}
                      >
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Email address"
                            type="email"
                            onFocus={e => this.setState({ emailFocused: true })}
                            onBlur={e => this.setState({ emailFocused: false })}
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup className="mb-4">
                        <Input
                          className="form-control-alternative"
                          cols="80"
                          name="name"
                          placeholder="Type a message..."
                          rows="4"
                          type="textarea"
                        />
                      </FormGroup>
                      <div>
                        <Button
                          block
                          className="btn-round"
                          color="default"
                          size="lg"
                          type="button"
                        >
                          Send Message
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

export default Landing;
