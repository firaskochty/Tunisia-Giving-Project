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
import { Button, Card, CardImg, Container, Row, Col, Table } from "reactstrap";

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
import FundDataService from "../../services/fund.service";
import DonateDataService from "../../services/donate.service";
import { Link } from "react-router-dom";
import { InlineShareButtons } from 'sharethis-reactjs';


class Profile extends React.Component {

  state = {};
  componentDidMount() { // execution 
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
    const idFund = this.props.match.params.idFund; // bich ye5ou mil url/path l id mta3 el fund

    FundDataService.get(idFund)
      .then(response => {
        this.setState({
          id: response.data._id,
          name: response.data.name,
          description: response.data.description,
          amount: response.data.amount,
          datefin: response.data.datefin.substring(0, 10),
          picture: response.data.picture,
          orgid: response.data.orgid
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });

    DonateDataService.getDonationofFund(idFund)
    .then(response => {
      if( response.data == "No donation matching this fund Id"){
        this.setState({ donatedAmount : 0 });
      }
      else {
        let calcul=0; 
        for (let i = 0; i < response.data.length; i++) {
          calcul = calcul + response.data[i].amount;
        }
        this.setState({ donatedAmount : calcul });
      }
    })
    .catch(e => {
      console.log(e);
    });
  }

  constructor(props) { // actualiser la valeur state 
    super(props);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onChangeAnony = this.onChangeAnony.bind(this);
    this.addDonation = this.addDonation.bind(this);
    this.DonateAdded = this.DonateAdded.bind(this);
    this.state = {
      amountDon: null,
      anomyme: 0,
      submitted: false
    };
  }

  onChangeAmount(e) {
    this.setState({
      amountDon: e.target.value
    });
  }
  onChangeAnony(e) {
    this.setState({
      anomyme: e.target.value
    });
  }

  addDonation() {
    var data = {
      userid: window.localStorage.getItem("id"),
      fundid: this.state.id,
      amount: this.state.amountDon,
      anomyme: this.state.anomyme
    };

    DonateDataService.addDonation(data)
      .then(response => {
        this.setState({
          amountDon: response.data.amount,
          submitted: true
        });
        this.componentDidMount();
        alert('Thank you for your Donation ❤');
        this.toggleModal("DonateModal");
      })
      .catch(e => {
        console.log(e);
      });
  }

  DonateAdded() {
    this.setState({
      amountDon: null,
      anomyme: 0,
      submitted: false
    });
  }

  /* 7ajet lil Modal Add Fund  */
  state = {
    defaultModal: false
  };
  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };
  /*   Fin 7ajet lil Modal Add Fund*/

  render() {
    const funds = this.state.funds;
    return (
      <>
        <DemoNavbar />
        <main className="profile-page" ref="main">
          <section className="section-profile-cover section-shaped my-0 bg-gradient-warning">
            {/* Circles background */}
            <div className="shape shape-style-1 shape-default alpha-4">
            </div>
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

          <section className="section">
            <Container>
              <Card className="card-profile shadow mt--300">
                <div className="px-5 py-5 ">
                  <h2> {this.state.name} </h2>
                  <Row className="mt-3 py-3" >
                    <Col lg="5" >
                      <CardImg top src={require("assets/img/pourVous.png")} alt="Card image cap" />
                    </Col>
                    <Col lg="7" >
                      <h4> <b> Description</b> </h4>
                      <p  >
                        {this.state.description}
                      </p>

                      <h6> <b>Added by :</b> <Link to={`/profil/${this.state.orgid}`} >{this.state.orgid} </Link></h6>
                      <h6> <b>End Date:</b> { this.state.datefin}</h6>
                      <h6> <b>{this.state.donatedAmount}DT </b> raised of a goal of <b> {this.state.amount}TND</b> </h6>
                      <h6> <b>Percentage :</b> { (100 * this.state.donatedAmount / this.state.amount ).toFixed(2) } % </h6>
                      <h6> <b>Share :</b></h6>
                      <InlineShareButtons
                        config={{
                          alignment: 'left',  // alignment of buttons (left, center, right)
                          color: 'social',      // set the color of buttons (social, white)
                          enabled: true,        // show/hide buttons (true, false)
                          font_size: 16,        // font size for the buttons
                          labels: 'null',        // button labels (cta, counts, null)
                          language: 'en',       // which language to use (see LANGUAGES)
                          networks: [           // which networks to include (see SHARING NETWORKS)
                            'facebook',
                            'messenger',
                            'email',
                            'sms',
                            'whatsapp'
                          ],
                          padding: 12,          // padding within buttons (INTEGER)
                          radius: 4,            // the corner radius on each button (INTEGER)
                          show_total: false,
                          size: 40,             // the size of each button (INTEGER)

                          // OPTIONAL PARAMETERS
                          url: 'https://www.sharethis.com', // (defaults to current url)
                          image: 'https://bit.ly/2CMhCMC',  // (defaults to og:image or twitter:image)
                          description: 'Firas Kochty Tunisia Giving',       // (defaults to og:description or twitter:description)
                          title: 'Firas Kochty Tunisia Giving',            // (defaults to og:title or twitter:title)
                          message: 'Firas Kochty Tunisia Giving',     // (only for email sharing)
                          subject: 'Firas Kochty Tunisia Giving',  // (only for email sharing)
                          username: 'Firas Kochty Tunisia Giving' // (only for twitter sharing)
                        }}
                      />

                    </Col>
                  </Row>
                  {window.localStorage.getItem("id") ?
                    (
                      <Button block color="warning" type="button" onClick={() => this.toggleModal("DonateModal")}>
                        Donate Now
                      </Button>
                    )
                    :
                    (
                      <Button block color="warning" type="button" href='/login-page'>
                        Donate Now
                      </Button>

                    )

                  }


                  {/** Modal Add Fund Tebda Houni */}
                  <Modal
                    className="modal-dialog-centered"
                    size="sm"
                    isOpen={this.state.DonateModal}
                    toggle={() => this.toggleModal("DonateModal")}
                  >
                    <div className="modal-body p-0">
                      <Card className="bg-secondary shadow border-0">
                        <CardHeader className="bg-transparent">
                          <div className="text-muted text-center">
                            <large><b> Donate to Title of the fund Campaign</b></large>
                          </div>
                        </CardHeader>
                        <CardBody className="px-lg-5 py-lg-5">
                          <Form role="form">
                            <FormGroup className="mb-3">
                              <InputGroup className="input-group-alternative">
                                <Input
                                  placeholder="Amount to Donate"
                                  type="number"
                                  id="amountDon"
                                  required
                                  value={this.state.amountDon}
                                  onChange={this.onChangeAmount}
                                  name="amountDon"
                                />
                              </InputGroup>
                            </FormGroup>
                            {/*}
                            <div className="custom-control custom-control-alternative custom-checkbox">
                              <Input
                                className="custom-control-input"
                                id=" checkAnonyme"
                                type="checkbox"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor=" checkAnonyme"
                              >
                                <span className="text-muted">Anonymous Donation</span>
                              </label>
                            </div>
                            {*/}
                            <div className="text-center">
                              <Button
                                className="mt-4"
                                color="warning"
                                type="button"
                                onClick={this.addDonation}
                              >
                                Donate ❤
                              </Button>
                            </div>
                          </Form>
                        </CardBody>
                      </Card>
                    </div>
                  </Modal>
                  {/** Fin Modal Add Fund Tebda Houni */}

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

export default Profile;
