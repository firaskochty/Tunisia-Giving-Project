import React from "react";

// reactstrap components
import { Button, Card, Container, Row, Col, Table } from "reactstrap";

import {
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";


import UserDataService from "../../services/user.service";
import LineFund from "../../components/Profile_LigneTab.js";
class ProfileOther extends React.Component {

  
  state = {};
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
    const idUser = this.props.match.params.idUser;
    this.getUser(idUser);
  }

  //GEt user 
  getUser(data) {
    UserDataService.get(data)
      .then(response => {
        this.setState({
          name: response.data.name,
          mail: response.data.mail,
          phone: response.data.phone,
          type:response.data.type,
          picture:response.data.picture
        });
      })
      .catch(e => {
        console.log(e);
      });
  }
  //End GEt user 


  render() {
    return (
      <>
        <DemoNavbar />
        <main className="profile-page" ref="main">
          <section className="section-profile-cover section-shaped my-0 bg-gradient-warning">
            <div className="shape shape-style-1 shape-default alpha-4">
            </div>
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
          <section className="section">
            <Container>
              <Card className="card-profile shadow mt--300">
                <div className="px-4">
                  <Row className="justify-content-center">
                    <Col className="order-lg-2" lg="3">
                      <div className="card-profile-image">
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("assets/img/pic_def.jpg")}
                          />
                        </a>
                      </div>
                    </Col>
                  </Row>

                  <div className="text-center mt-8">
                    <h3>
                      {this.state.name
                      }
                    </h3>
                    <div className="h6 font-weight-300">
                      <Row className="justify-content-center">
                        <Col lg="5">
                          <b>Mail :</b> {this.state.mail}
                        </Col>
                      </Row>
                    </div>
                    <div className="h6 font-weight-300">
                      <Row className="justify-content-center">
                        <Col lg="5">
                          <b>Phone :</b> {this.state.phone}
                        </Col>
                      </Row>
                    </div>

                    <div className="h6 font-weight-300">
                      <Row className="justify-content-center">
                        <Col lg="5">
                          <b>Type :</b> {this.state.type}
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              </Card>
            </Container>
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }
}


export default ProfileOther;
