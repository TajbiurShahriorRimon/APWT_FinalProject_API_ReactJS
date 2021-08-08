import React, {Component} from 'react';
import axios from "axios";
import {BrowserRouter as Router, Route, Switch, useHistory} from "react-router-dom";
import { withRouter } from "react-router";
import "../CSS/Table1.css";
import Navbar from "../Admin/Navbar";

class UserProfile extends Component {
    state = {
        userName: "",
        email: "",
        status: "",
        type: "",
    }

    async componentDidMount() {
        var id = this.props.match.params.id; //parameter from url
        //alert("emp_id\n"+id);

        const resp = await axios.get(`http://localhost:8000/api/user/profile/${id}`);
        console.log(resp.data);
        if(resp.data.status === 200){
            //alert("found\n"+resp.data.result[0].userName);
            this.setState({
                userName: resp.data.result[0].userName,
                email: resp.data.result[0].email,
                status: resp.data.result[0].status,
                type: resp.data.result[0].type,
            })

            if (resp.data.result[0].status == 1){
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

    changeStatus = async (e) => {
        var id = this.props.match.params.id;
        var userStatus = "";

        if (this.state.status == "Active"){
            userStatus = 1;
        }
        else {
            userStatus = 0;
        }

        const resp = await axios.put(`http://localhost:8000/api/user/changeStatus/${id}/${userStatus}`);

        if(resp.data.status === 200){
            if (this.state.status == "Active"){
                this.setState({
                    status: "Inactive"
                });
                this.state.status = "Inactive";
            }
            else {
                this.setState({
                    status: "Active"
                });
                this.state.status = "Active";
            }
        }
    }

    render() {
        return(
            <div>
                <Navbar/> <br/> <br/> <br/>
                <div id="wrapper">
                    <table id="keywords" cellSpacing="0" cellPadding="0">
                        <tbody>
                        <tr>
                            <th>UserName</th><td>{this.state.userName}</td>
                        </tr>
                        <tr>
                            <th>Email</th><td>{this.state.email}</td>
                        </tr>
                        <tr>
                            <th>Type</th><td>{this.state.type}</td>
                        </tr>
                        <tr>
                            <th>Status</th><td>{this.state.status}</td>
                        </tr>
                        <tr>
                            <th></th>
                            <td>
                                <button onClick={this.changeStatus}>Change Status</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default withRouter(UserProfile);