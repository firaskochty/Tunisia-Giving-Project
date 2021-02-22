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


import FundDataService from "../../services/fund.service";
import LineFund from "../../components/Profile_LigneTab.js";
class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.onChangeOrgid = this.onChangeOrgid.bind(this);
    this.onChangename = this.onChangename.bind(this);
    this.onChangedescription = this.onChangedescription.bind(this);
    this.onChangeamount = this.onChangeamount.bind(this);
    this.onChangedatefin = this.onChangedatefin.bind(this);
    this.onChangepicture = this.onChangepicture.bind(this);

    this.updateFund = this.updateFund.bind(this);

    this.saveFund = this.saveFund.bind(this);
    this.registerFund = this.registerFund.bind(this);

    this.state = {
      orgid: window.localStorage.getItem("id"),
      name: "",
      description: "",
      amount: null,
      datefin: "",
      picture: "",

      submitted: false,

      funds: []
    };
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;

    if (window.localStorage.getItem("type") == 'organization') {
      this.getFunds();
    }
  }


  // Add Fund 


  onChangeOrgid(e) {
    this.setState({
      orgid: e.target.value
    });
  }

  onChangename(e) {
    this.setState({
      name: e.target.value
    });
    console.log(this.state.name);

  }

  onChangedescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeamount(e) {
    this.setState({
      amount: e.target.value
    });
  }

  onChangedatefin(e) {
    this.setState({
      datefin: e.target.value
    });
  }

  onChangepicture(e) {
    this.setState({
      picture: e.target.value
    });
  }

  saveFund() {
    var data = {
      orgid: window.localStorage.getItem("id"),
      name: this.state.name,
      description: this.state.description,
      amount: this.state.amount,
      datefin: this.state.datefin,
      picture: this.state.picture
    };

    console.log(this.state);
    FundDataService.createFund(data)
      .then(response => {
        this.setState({
          orgid: window.localStorage.getItem("id"),
          name: response.data.name,
          description: response.data.description,
          amount: response.data.amount,
          datefin: response.data.datefin,
          picture: response.data.picture,

          submitted: true
        });
      })
      .catch(e => {
        console.log(e);
      });
    this.registerFund();
    this.getFunds();
    this.toggleModal("AddFundCampModal");
  }

  registerFund() {
    this.setState({
      orgid: window.localStorage.getItem("id"),
      name: "",
      description: "",
      amount: null,
      datefin: "",
      picture: "",

      submitted: false
    });
  }

  // End Add Fund 

  updateFund(idd) {
    console.log(idd);

    var data = {
      id: window.localStorage.getItem("id"),
      orgid: window.localStorage.getItem("id"),
      name: this.state.name,
      description: this.state.description,
      amount: this.state.amount,
      datefin: this.state.datefin,
      picture: this.state.picture
    };

    FundDataService.update(idd,data)
      .then(response => {
        this.setState({
          orgid: window.localStorage.getItem("id"),
          name: response.data.name,
          description: response.data.description,
          amount: response.data.amount,
          datefin: response.data.datefin,
          picture: response.data.picture,

          submitted: true
        });
      })
      .catch(e => {
        console.log(e);
      });
    this.registerFund();
    this.getFunds();
    this.toggleModal("UpdateFundCampModal")
  }

  //Delete Fund
  fundDelete(vardel) {
    FundDataService.delete(vardel)
      .then(response => {
        console.log(response.data);
        this.getFunds();
      })
      .catch(e => {
        console.log(e);
      });
  }
  //End Delete Fund 

  //GEt Fund 
  getFunds() {
    FundDataService.getOrg(window.localStorage.getItem("id"))
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
  //End GEt Fund 


  //////////////////////////

  ///////////////////////////

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
    return (
      <>
        { window.localStorage.getItem("id") ?
          (
            <span></span>
          ) :
          (
            window.location.href = '/'
          )
        }
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
                      {window.localStorage.getItem("name")}
                    </h3>
                    <div className="h6 font-weight-300">
                      <Row className="justify-content-center">
                        <Col lg="5">
                          <b>Mail :</b> {window.localStorage.getItem("mail")}
                        </Col>
                      </Row>
                    </div>
                    <div className="h6 font-weight-300">
                      <Row className="justify-content-center">
                        <Col lg="5">
                          <b>Phone :</b> {window.localStorage.getItem("phone")}
                        </Col>
                      </Row>
                    </div>

                    <div className="h6 font-weight-300">
                      <Row className="justify-content-center">
                        <Col lg="5">
                          <b>Type :</b> {window.localStorage.getItem("type")}
                        </Col>
                      </Row>
                    </div>
                  </div>

                  {window.localStorage.getItem("type") == 'client' ? (
                    <h6></h6>
                  ) : (
                      <div className="py-3 border-top text-center">
                        <h4> My Fund </h4>
                        <div className="text-right">
                          <Button color="warning" type="button" onClick={() => this.toggleModal("AddFundCampModal")}>
                            Add New Fund Campaign
                      </Button>

                          {/** Modal Add Fund Tebda Houni */}
                          <Modal
                            className="modal-dialog-centered"
                            size="sm"
                            isOpen={this.state.AddFundCampModal}
                            toggle={() => this.toggleModal("AddFundCampModal")}
                          >
                            <div className="modal-body p-0">
                              <Card className="bg-secondary shadow border-0">
                                <CardHeader className="bg-transparent">
                                  <div className="text-muted text-center">
                                    <large> <b>Add New Fund Campaign</b></large>
                                  </div>
                                </CardHeader>
                                <CardBody className="px-lg-5 py-lg-5">

                                  <FormGroup className="mb-3">
                                    <InputGroup className="input-group-alternative">
                                      <Input
                                        placeholder="Title"
                                        type="text"
                                        id="name"
                                        required
                                        value={this.state.name}
                                        onChange={this.onChangename}
                                        name="name"
                                      />
                                    </InputGroup>
                                  </FormGroup>
                                  <FormGroup>
                                    <InputGroup className="input-group-alternative">
                                      <Input
                                        placeholder="Description"
                                        type="textarea"
                                        id="description"
                                        required
                                        value={this.state.description}
                                        onChange={this.onChangedescription}
                                        name="description"
                                      />
                                    </InputGroup>
                                  </FormGroup>
                                  <FormGroup>
                                    <InputGroup className="input-group-alternative">
                                      <Input
                                        placeholder="Needed Amount (TND)"
                                        type="number"
                                        id="amount"
                                        required
                                        value={this.state.amount}
                                        onChange={this.onChangeamount}
                                        name="amount"
                                      />
                                    </InputGroup>
                                  </FormGroup>
                                  <FormGroup>
                                    <InputGroup className="input-group-alternative">
                                      <Input
                                        placeholder="End Date"
                                        type="date"
                                        id="datefin"
                                        required
                                        value={this.state.datefin}
                                        onChange={this.onChangedatefin}
                                        name="datefin"
                                      />
                                    </InputGroup>
                                  </FormGroup>
                                  <FormGroup>
                                    <InputGroup className="input-group-alternative">
                                      <Input name="ImageAddFund" id="ImageAddFund" placeholder="Image" type="file" />
                                    </InputGroup>
                                  </FormGroup>

                                  <div className="text-center">

                                    <Button
                                      className="mt-4"
                                      color="warning"
                                      type="button"
                                      onClick={this.saveFund}
                                    >
                                      Add Fund Campaign
                                      </Button>
                                  </div>

                                </CardBody>
                              </Card>
                            </div>
                          </Modal>
                          {/** Fin Modal Add Fund Tebda Houni */}

                        </div>


                        <br></br>
                        <Table responsive>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Fund Name</th>
                              <th>Fund Amount</th>
                              <th>End Date</th>
                              <th>Options</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.funds && this.state.funds.map((fund, index) => (
                              <tr>
                                <th scope="row">{index}</th>
                                <td>{fund.name}</td>
                                <td>{fund.amount}</td>
                                {/* <td>{fund.datefin.substring(0, 10)}</td> */}

                                <td>

                                  <button
                                    className="badge badge-success mr-2"
                                    onClick={() => this.toggleModal("UpdateFundCampModal")}
                                  >
                                    Update
                                  </button>
                                  {/** Modal Add Fund Tebda Houni */}
                                  <Modal
                                    className="modal-dialog-centered"
                                    size="sm"
                                    isOpen={this.state.UpdateFundCampModal}
                                    toggle={() => this.toggleModal("UpdateFundCampModal")}
                                  >
                                    <div className="modal-body p-0">
                                      <Card className="bg-secondary shadow border-0">
                                        <CardHeader className="bg-transparent">
                                          <div className="text-muted text-center">
                                            <large> <b>Update Fund Campaign {fund.name}</b></large>
                                          </div>
                                        </CardHeader>
                                        <CardBody className="px-lg-5 py-lg-5">
                                          <Form role="form">

                                            <FormGroup className="mb-3">
                                              <InputGroup className="input-group-alternative">
                                                <Input
                                                  placeholder="Title"
                                                  type="text"
                                                  id="name"
                                                  required
                                                  value={this.state.name}
                                                  onChange={this.onChangename}
                                                  name="name"
                                                />
                                              </InputGroup>
                                            </FormGroup>
                                            <FormGroup>
                                              <InputGroup className="input-group-alternative">
                                                <Input
                                                  placeholder="Description"
                                                  type="textarea"
                                                  id="description"
                                                  required
                                                  value={this.state.description}
                                                  onChange={this.onChangedescription}
                                                  name="description"
                                                />
                                              </InputGroup>
                                            </FormGroup>
                                            <FormGroup>
                                              <InputGroup className="input-group-alternative">
                                                <Input
                                                  placeholder="Needed Amount (TND)"
                                                  type="number"
                                                  id="amount"
                                                  required
                                                  value={this.state.amount}
                                                  onChange={this.onChangeamount}
                                                  name="amount"
                                                />
                                              </InputGroup>
                                            </FormGroup>
                                            <FormGroup>
                                              <InputGroup className="input-group-alternative">
                                                <Input
                                                  placeholder="End Date"
                                                  type="date"
                                                  id="datefin"
                                                  required
                                                  value={this.state.datefin}
                                                  onChange={this.onChangedatefin}
                                                  name="datefin"
                                                />
                                              </InputGroup>
                                            </FormGroup>

                                            <div className="text-center">
                                              <Button
                                                className="mt-4"
                                                color="warning"
                                                type="button"
                                                onClick={() => {console.log(fund._id); this.updateFund(fund._id)}}
                                              >
                                                Update Fund Campaign
                                              </Button>
                                            </div>
                                          </Form>
                                        </CardBody>
                                      </Card>
                                    </div>
                                  </Modal>
                                  {/** Fin Modal Add Fund Tebda Houni */}

                                  <button
                                    className="badge badge-danger mr-2"
                                    onClick={() => { if (window.confirm('Delete the Fund ?')) { this.fundDelete(fund._id) }; }}
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>

                    )}

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
