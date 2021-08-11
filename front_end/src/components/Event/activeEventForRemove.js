import React, {Component} from 'react';
import {useHistory, withRouter, Route, Link} from "react-router-dom";
import axios from "axios";
import Navbar from "../Admin/Navbar";
import "../CSS/Table2.css";
import "../CSS/Table1.css";

class ActiveEventForRemove extends Component {
    state = {
        title: "",
        targetAmount: "",
        image: "",
        eventId: "",
    }

    async componentDidMount() {
        var id = this.props.match.params.id; //parameter from url
        //alert("emp_id\n"+id);

        const resp = await axios.get(`http://localhost:8000/api/event/removeActiveEvent/${id}`);
        console.log(resp.data);
        if(resp.data.status === 200){
            //alert("found\n"+resp.data.result[0].userName);
            this.setState({
                title: resp.data.result[0].title,
                targetAmount: resp.data.result[0].targetAmount,
                image: resp.data.result[0].image,
                eventId: resp.data.result[0].eventId,
            })
        }
    }

    handleRemoveEvent = async (e, id) => {
        //const updateState = e.currentTarget;
        e.preventDefault();
        alert("hello: "+id);

        const resp1 = await axios.get(`http://localhost:8000/api/event/confirmRemoveEvent/${id}`);
        if (resp1.data.status === 200){
            alert("Event Removed Successfully! Saved in Archive");
            this.props.history.push("/adminHome")
        }
    }

    render() {
        return (
            <div>
                <Navbar/> <br/> <br/> <br/>
                <div align="center" className="container">
                    <table className="card-img-64" align="center" key={this.state.eventId}>
                        <tr>
                            <td>
                                <img src={"http://localhost:8000/"+this.state.image} width="300" height="200"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h3><label style={{color: "#435"}}>{this.state.title}</label></h3>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label style={{color: "#5cab23"}}>Target Amount: </label><strong>{this.state.targetAmount}</strong>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Link to={`/event/briefReport/${this.state.eventId}`}>
                                    <button className="w3-button w3-blue btn">Check Report</button>
                                </Link> &nbsp;
                                <Link to={`/event/detailReviews/${this.state.eventId}`}>
                                    <button className="w3-button w3-black btn">Reviews</button>
                                </Link> &nbsp;{/*
                                <Link to={`/event/activeEventForRemove/${this.state.eventId}`}>
                                    <button className="btn btn-danger">Confirm Remove</button>
                                </Link>*/}
                                <button className="btn btn-danger" onClick={(e) => this.handleRemoveEvent(e, this.state.eventId)}>
                                    Confirm Remove
                                </button>
                            </td>
                        </tr>
                    </table>
                    <br/> <hr/>
                </div>
            </div>
        );
    }
}

export default withRouter(ActiveEventForRemove);