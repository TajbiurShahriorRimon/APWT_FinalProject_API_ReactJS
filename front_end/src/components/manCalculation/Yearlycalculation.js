import React, { Component } from 'react';
import { Link, BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import axios from 'axios';
import { withRouter } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, NavDropdown, Button, Form, FormControl } from 'react-bootstrap';

class Yearlycalculation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: [],
            loading: true,
        }
    }
    async componentDidMount() {
        const resp = await axios.get('http://localhost:8000/api/Yearlycalculation');
        console.log(resp.data);

        if (resp.data.status === 200) {
            this.setState({
                result: resp.data.result,
                loading: false,
            })
        }
    }
    render() {
        var CalculationTableM = "";

        if (this.state.loading) {
            CalculationTableM = <tr><td>Loading...</td></tr>
        }
        else {
            CalculationTableM = this.state.result.map((item) => {
                return (

                    <tr key={item.eventId}>
                        <td>{item.eventId}</td>
                        <td>{item.title}</td>
                        <td>{item.targetAmount}</td>
                        <td>{item.raisedAmount}</td>
                        <td>{item.commission}</td>
                        <td>{item.remaining}</td>
                        <td>{item.startDate}</td>
                        <td>
                            <Link to={`/YearlyUpdate/${item.eventId}`} className="btn btn-dark">Update</Link>
                        </td>
                    </tr>
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
                                <Nav.Link href="/ManagerProfile/:userId">Profile</Nav.Link>

                                <NavDropdown title="Calculation" id="navbarScrollingDropdown">
                                    <NavDropdown.Item href="/Monthlycalculation">Monthly</NavDropdown.Item>
                                    <NavDropdown.Item href="/Yearlycalculation">Yearly</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="User List" id="navbarScrollingDropdown">
                                    <NavDropdown.Item href="/donorListman">Donor List</NavDropdown.Item>
                                    <NavDropdown.Item href="/orgListman">Organizer List</NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link href="#home">Notices</Nav.Link>
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

                <div className="Container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4>
                                        Yearly Calculation
                                    </h4>
                                </div>
                                <div>
                                    <table className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>EventId</th>
                                                <th>Title</th>
                                                <th>Target Amount</th>
                                                <th>Raised Amount</th>
                                                <th>Commission</th>
                                                <th>Remaining Amount</th>
                                                <th>Start Date</th>
                                                <th>Operation</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {CalculationTableM}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Yearlycalculation)