import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Navbar from "./Navbar";
import Index from "../Transaction";
import UserList from "../User/UserList";

class AdminHome extends Component {
    render() {
        return (
            <div>
                <Navbar/> <br/> <br/> <br/>
                <h2>Admin Home...</h2>
            </div>
        );
    }
}

export default AdminHome;