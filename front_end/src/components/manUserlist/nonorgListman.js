import React, { Component } from 'react';
import { Link, BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import axios from 'axios';
import { withRouter } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, NavDropdown, Button, Form, FormControl } from 'react-bootstrap';

class NonorgListman extends Component {
    state = {
        result: [],
        loading: true,
    }

    async componentDidMount() {
        var isLoggedIn = localStorage.getItem("id3");

        if (isLoggedIn == null) {
            this.props.history.push("/logout/index");
        }

        const resp = await axios.get('http://localhost:8000/api/nonorgListman');
        console.log(resp.data);

        if (resp.data.status === 200) {
            this.setState({
                result: resp.data.result,
                loading: false,
            })
        }
    }

    render() {
        var DonorTable = "";

        if (this.state.loading) {
            DonorTable = <tr><td>Loading...</td></tr>
        }
        else {
            DonorTable = this.state.result.map((item) => {
                return (
                    <tr key={item.userId}>
                        <td align="center">{item.userId}</td>
                        <td align="center">{item.userName}</td>
                        <td align="center">{item.email}</td>
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
                <br />
                <div className="Container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4>
                                        NonorganizerList List
                                        <Link to={'/ManagerHome'} className="btn btn-success btn-sm float-end">Home</Link>
                                    </h4>
                                </div>
                                <div>
                                    <table className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>User Id</th>
                                                <th>User Name</th>
                                                <th>email</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {DonorTable}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(NonorgListman);