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
import SimpleFooter from "components/Footers/SimpleFooter.js";
// index page sections
import { Link } from "react-router-dom";
import FundDataService from "../../services/fund.service";
class Landing extends React.Component {
  state = {};
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;

    FundDataService.getAll()
      .then(response => {
        this.setState({
          funds: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    const funds = this.state.funds;
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
                <br></br>
                <br></br>
                <br></br>
                <Col lg="8" >
                  <Input type="text" name="search" id="search" placeholder="Search" />
                </Col>
                <Col lg="4" >
                  <Button color="warning" type="text" c >Search</Button>
                </Col>
                

                <br></br>
                <br></br>
                <br></br>
                
                <Col lg="12">
                  <Row className="row-grid">
                    {/* hedhom les cards mta3 les Available donations  */}
                    {funds && funds.map((fund, index) => ( // boucle 
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
                              tag={Link} to={`/fund/${fund._id}`}
                            >
                              Learn more
                            </Button>

                          </CardBody>
                        </Card>
                      </Col>
                    ))}
                    {/* Fin les cards mta3 les Available donations */}

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

export default Landing;
