import React, { Component } from 'react';
import { Link, BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import axios from 'axios';
import { withRouter } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, NavDropdown, Button, Form, FormControl } from 'react-bootstrap';

class MonthlyUpdate extends Component {
    state = {
        title: '',
        commission: '',
        raisedAmount: '',
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    async componentDidMount() {
        const eventId = this.props.match.params.id;
        const resp = await axios.get(`http://localhost:8000/api/MonthlyUpdate/${eventId}`)
        if (resp.data.status === 200) {
            this.setState({
                title: resp.data.result.title,
                commission: resp.data.result.commission,
                raisedAmount: resp.data.result.raisedAmount,
            });
        }
    }

    updateevent = async (e) => {
        e.preventDefault();
        const eventId = this.props.match.params.id;
        const resp = await axios.put(`http://localhost:8000/api/MonthlyUpdate/${eventId}`, this.state);
        if (resp.data.status === 200) {
            console.log(resp.data.message);
            // this.setState({
            //     commission:'',
            //     raisedAmount:'',
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

                <div className="Container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-header">
                                    <h4>
                                        Updating Event Details
                                        <Link to={'/Monthlycalculation'} className="btn btn-success btn-sm float-end">Back</Link>
                                    </h4>
                                </div>
                                <div className="Card-body">
                                    <form onSubmit={this.updateevent}>
                                        <div classname="form-group mb-3">
                                            <label>Title</label>
                                            <input type="text" name="title" onChange={this.handleInput} value={this.state.title} className="form-control" />
                                        </div>
                                        <div classname="form-group mb-3">
                                            <label>Commission</label>
                                            <input type="text" name="commission" onChange={this.handleInput} value={this.state.commission} className="form-control" />
                                        </div>
                                        <div classname="form-group mb-3">
                                            <label>New Raised Amount</label>
                                            <input type="text" name="raisedAmount" onChange={this.handleInput} value={this.state.raisedAmount} className="form-control" />
                                        </div>
                                        <div classname="form-group mb-3">
                                            <button type="Submit" className="btn btn-primary">Update</button>
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
export default withRouter(MonthlyUpdate)