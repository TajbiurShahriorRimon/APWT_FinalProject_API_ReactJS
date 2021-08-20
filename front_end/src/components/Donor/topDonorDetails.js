import React, {Component} from 'react';
import axios from "axios";
import Navbar from "../Admin/Navbar";
import {withRouter} from "react-router-dom";

class TopDonorDetails extends Component {
    state = {
        userId: "",
        userName: "",
        email: "",
        status: "",
        type: "",
        totalAmount: "",
    }

    async componentDidMount() {
        var isLoggedIn = localStorage.getItem("id2");

        if(isLoggedIn == null){
            this.props.history.push("/logout/index");
        }

        const resp = await axios.get("http://localhost:8000/api/topDonor");
        console.log(resp.data);
        if(resp.data.status === 200){
            //alert("found\n"+resp.data.result[0].userName);
            this.setState({
                userId: resp.data.result[0].userId,
                userName: resp.data.result[0].userName,
                email: resp.data.result[0].email,
                status: resp.data.result[0].status,
                type: resp.data.result[0].type,
                totalAmount: resp.data.result[0].totalAmount,
            });

            if(resp.data.result[0].status == 1){
                this.setState({
                    status: "Active"
                });
            }
            else {
                this.setState({
                    status: "Inactive"
                });
            }
        }
    }

    render() {
        return (
            <body>
            <Navbar/><br/> <br/> <br/>
            <div className="container">
                <table className="table">
                    <tbody>
                    <tr>
                        <td><strong>User Id</strong></td>
                        <td>{this.state.userId}</td>
                    </tr>
                    <tr>
                        <td><strong>Name</strong></td>
                        <td>{this.state.userName}</td>
                    </tr>
                    <tr>
                        <td><strong>Email</strong></td>
                        <td>{this.state.email}</td>
                    </tr>
                    <tr>
                        <td><strong>Type</strong></td>
                        <td>{this.state.type}</td>
                    </tr>
                    <tr>
                        <td><strong>Total Donation</strong></td>
                        <td>{this.state.totalAmount}</td>
                    </tr>
                    <tr>
                        <td><strong>Status</strong></td>
                        <td>{this.state.status}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            </body>
        );
    }
}

export default withRouter(TopDonorDetails);