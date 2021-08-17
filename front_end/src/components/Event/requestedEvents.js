import React, {Component} from 'react';
import axios from "axios";
import {useHistory, withRouter, Route, Link} from "react-router-dom";
import Navbar from "../Admin/Navbar";
import "../CSS/Table2.css";
import "../CSS/Table1.css";

class RequestedEvents extends Component {
    constructor(props) {
        super(props);

        var isLoggedIn = localStorage.getItem("id2");
        //alert("id: "+localStorage.getItem("id2"));
        if(isLoggedIn == null){
            //alert("loggedId: "+localStorage.getItem("id2"));
            this.props.history.push("/logout/index");
        }
    }

    state = {
        result: [],
        loading: true,
    }

    async componentDidMount() {
        //alert("dsd");
        const resp = await axios.get('http://localhost:8000/api/events/eventRequest');
        console.log(resp.data);

        if (resp.data.status === 200){
            this.setState({
                result: resp.data.result,
                loading: false,
            })
        }
    }

    loadPage = async () => {
        const resp = await axios.get('http://localhost:8000/api/events/eventRequest');
        console.log(resp.data);

        if (resp.data.status === 200){
            this.setState({
                result: resp.data.result,
                loading: false,
            })
        }
    }

    handleRemoveEvent = async (e, id) => {
        //const updateState = e.currentTarget;
        e.preventDefault();
        alert("hello: "+id);

        const resp1 = await axios.delete(`http://localhost:8000/api/events/removePendingEvent/${id}`);
        if (resp1.data.status === 200){
            alert("Event Deleted Successfully");
            await this.loadPage();
        }
    }

    render() {
        var resultTable = "";

        if(this.state.loading){
            resultTable = <tr><td>Loading...</td></tr>
        }
        else {
            resultTable = this.state.result.map((item) => {
                return(
                    <div align="center" className="container" key={item.eventId}>
                        <table className="card-img-64" align="center">
                            <tr>
                                <td>
                                    <img src={"http://localhost:8000/"+item.image} width="300" height="200"/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h3><label style={{color: "#435"}}>{item.title}</label></h3>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label style={{color: "#5cab23"}}>Target Amount: </label><strong>{item.targetAmount}</strong>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Link to={`/event/briefReport/${item.eventId}`}>
                                        <button className="w3-button w3-blue btn">Check Report</button>
                                    </Link> &nbsp;
                                    <Link to={`/event/requestApproval/${item.eventId}`}>
                                        <button className="btn-success btn">Approve</button>
                                    </Link> &nbsp;
                                    <Link>
                                        <button onClick={(e) => this.handleRemoveEvent(e, item.eventId)}
                                                className="w3-red btn">Remove Event</button>
                                    </Link> &nbsp;
                                    <Link to={`/event/detailReviews/${item.eventId}`}>
                                        <button className="w3-button w3-black btn">Reviews</button>
                                    </Link>
                                </td>
                            </tr>
                        </table>
                        <br/> <hr/>
                    </div>

                )
            })
        }

        return (
            <div>
                <Navbar/> <br/> <br/> <br/>
                <div>
                    {resultTable}
                </div>
            </div>
        );
    }
}

export default withRouter(RequestedEvents);