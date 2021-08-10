import React, {Component} from 'react';
import {Link,BrowserRouter as Router, Route, Switch, useHistory} from "react-router-dom";
import Navbar from "./Navbar";
import Index from "../Transaction";
import UserList from "../User/UserList";
import { withRouter } from "react-router";

class AdminHome extends Component {
    constructor(props) {
        super(props);

        var isLoggedIn = localStorage.getItem("id2");
        alert("id: "+localStorage.getItem("id2"));
        if(isLoggedIn == null){
            alert("loggedId: "+localStorage.getItem("id2"));
            this.props.history.push("/logout/index");
        }
    }

    render() {
        return (
            <div>
                <Navbar/> <br/> <br/> <br/>
                <h2>Admin Home...</h2>
            </div>
        );
    }
}

export default withRouter(AdminHome);