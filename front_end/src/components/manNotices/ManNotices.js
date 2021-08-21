import React, { Component } from 'react';
import { Link, BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import axios from 'axios';
import { withRouter } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, NavDropdown, Button, Form, FormControl } from 'react-bootstrap';

class ManNotices extends Component {
    state = {
        userId: '',
        title: '',
        message: '',
        date: '',
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    
    saveNotices =async (e) => {
        e.preventDefault();
        const resp = await axios.post(`http://localhost:8000/api/notices`, this.state);
        if (resp.data.status === 200) {
            console.log(resp.data.message);
            // this.setState({
            //     userId: 'resp.data.status.userId',
            //     title: '',
            //     message: '',
            //     date: '',
            // });
        }
    }

    render() {
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

                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4>
                                        Updating Event Details
                                        <Link to={'/ManagerHome'} className="btn btn-success btn-sm float-end">Home </Link>
                                    </h4>
                                </div>
                                <div className="Card-body">
                                    <form onSubmit={this.saveNotices}>
                                        <div classname="form-group mb-3">
                                            <label>User</label>
                                            <input type="text" name="userId" onChange={this.handleInput} value={this.state.userId} className="form-control" />
                                        </div>
                                        <div classname="form-group mb-3">
                                            <label>Title</label>
                                            <input type="text" name="title" onChange={this.handleInput} value={this.state.title} className="form-control" />
                                        </div>
                                        <div classname="form-group mb-3">
                                            <label>Notices</label>
                                            <input type="text" name="message" onChange={this.handleInput} value={this.state.message} className="form-control" />
                                        </div>
                                        <div classname="form-group mb-3">
                                            <label>Date</label>
                                            <input type="date" name="message" onChange={this.handleInput} value={this.state.date} className="form-control" />
                                        </div>
                                        <div classname="form-group mb-3">
                                            <button type="Submit" className="btn btn-primary">Notify</button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(ManNotices)