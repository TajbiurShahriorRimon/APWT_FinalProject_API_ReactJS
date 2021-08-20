import React, {Component} from 'react';
import axios from "axios";
import Navbar from "../Admin/Navbar";
import "../CSS/Table2.css";
import {withRouter} from "react-router-dom";

class BriefReport extends Component {
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
        totalDonors: "",
        totalRaisedAmount: "",

        userId: "",
        userName: "",
        email: "",
        title: "",
        description: "",
        startDate: "",
        endDate: "",
    }

    async componentDidMount() {
        //alert("dsd");
        var id = this.props.match.params.id;
        const resp = await axios.get(`http://localhost:8000/api/event/smallReport/${id}`);
        console.log(resp.data);

        if(resp.data.status === 200) {
            //alert("found\n"+resp.data.result[0].userName);
            this.setState({
                totalDonors: resp.data.result[0].totalDonors,
                totalRaisedAmount: resp.data.result[0].totalRaisedAmount,

                userId: resp.data.info[0].userId,
                userName: resp.data.info[0].userName,
                email: resp.data.info[0].email,
                title: resp.data.info[0].title,
                description: resp.data.info[0].description,
                startDate: resp.data.info[0].startDate,
                endDate: resp.data.info[0].endDate,
            });
        }
    }

    render() {
        return (
            <div>
                <h2>dsfv</h2>
                <Navbar/> <br/> <br/> <br/>
                <div className="container">
                    <table className="table">
                        <tbody>
                        <tr>
                            <th>No. Of Donors</th><td>{this.state.totalDonors}</td>
                        </tr>
                        <tr>
                            <th>Total Raised Amount</th><td>{this.state.totalRaisedAmount}</td>
                        </tr>
                        <tr>
                            <th>User Id</th><td>{this.state.userId}</td>
                        </tr>
                        <tr>
                            <th>User Name</th><td>{this.state.userName}</td>
                        </tr>
                        <tr>
                            <th>Email</th><td>{this.state.email}</td>
                        </tr>
                        <tr>
                            <th>Title</th><td>{this.state.title}</td>
                        </tr>
                        <tr>
                            <th>Start Date</th><td>{this.state.startDate}</td>
                        </tr>
                        <tr>
                            <th>End Date</th><td>{this.state.endDate}</td>
                        </tr>
                        </tbody>
                    </table> <br/>
                    <div>
                        <h2 style={{color: "#3e0d21"}}>Description</h2>
                        <textarea readOnly={true} className="w3-input w3-border" style={{resize: "none"}}
                                  value={this.state.description}></textarea>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(BriefReport);