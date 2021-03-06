import React, { Component } from 'react';
import { Link, BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import axios from 'axios';
import { withRouter } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, NavDropdown, Button, Form, FormControl } from 'react-bootstrap';
class ManagerHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: [],
            loading: true,
        }

        var userId = localStorage.getItem("id3");
        console.log(userId)
        //alert("id: "+localStorage.getItem("id2"));
        if (userId == null) {
            //alert("loggedId: "+localStorage.getItem("id2"));
            this.props.history.push("/logout/index");
        }
    }


    async componentDidMount() {
        const resp = await axios.get('http://localhost:8000/api/ManagerHome');
        console.log(resp.data);

        if (resp.data.status === 200) {
            this.setState({
                result: resp.data.result,
                loading: false,
            })
        }
    }

    render() {

        var resultTable = "";

        if (this.state.loading) {
            resultTable = <tr><td>Loading...</td></tr>
        }
        else {
            resultTable = this.state.result.map((item) => {
                return (
                    <table>
                        <td width="100%">
                            <div align="left" className="container" >
                                <table className="card-img-64" align="center" width="100%" key={item.eventId}>
                                    <tr>
                                        <td>
                                            <h3><label style={{ color: "#00008B" }}>{item.title}</label></h3>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img src={"http://localhost:8000/" + item.image} width="300" height="200" />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <label style={{ color: "#5cab23" }}>Target Amount: </label><strong>{item.targetAmount}</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Link to={`/event/briefReport/${item.eventId}`}>
                                                <button className="btn btn-secondary">Check Report</button>
                                            </Link> &nbsp;

                                            <Link to={`/event/detailReviews/${item.eventId}`}>
                                                <button className="btn btn-info">Reviews</button>
                                            </Link> &nbsp;

                                            <Link to={`/event/information/${item.eventId}`}>
                                                <button className="btn btn-outline-success">Information</button>
                                            </Link>
                                        </td>
                                    </tr>
                                </table>
                            </div>

                        </td>
                        <tr>
                            <td>

                            </td>
                        </tr>
                    </table>


                )
            })
        }

        return (
            <div>
                <>
                <Navbar bg="dark" variant="dark">
                        <Container>
                            <Navbar.Brand href="/ManagerHome">Home</Navbar.Brand>
                            <Nav className="me-auto">
                                <Nav.Link href="/ManagerProfile/2">Profile</Nav.Link>

                                <NavDropdown title="Calculation" id="navbarScrollingDropdown">
                                    <NavDropdown.Item href="/Monthlycalculation">Monthly</NavDropdown.Item>
                                    <NavDropdown.Item href="/Yearlycalculation">Yearly</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="User List" id="navbarScrollingDropdown">
                                    <NavDropdown.Item href="/donorListman">Donor List</NavDropdown.Item>
                                    <NavDropdown.Item href="/orgListman">Organizer List</NavDropdown.Item>
                                    <NavDropdown.Item href="/nonorgListman">NonOrganizer List</NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link href="/notices">Notices</Nav.Link>
                                <Nav.Link href="/logout/index">Logout</Nav.Link>
                            </Nav>
                            <Form className="d-flex">
                                <FormControl
                                    type="search"
                                    placeholder="Search"
                                    className="mr-2"
                                    aria-label="Search"
                                />
                                <Button variant="outline-success">Search</Button>
                            </Form>
                        </Container>
                    </Navbar>

                </>
                <br /> <br /> <br />
                <div>
                    {resultTable}
                </div>
            </div>
        );


    }
}
export default withRouter(ManagerHome);
