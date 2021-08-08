import React, {Component} from 'react';
import {Link} from "react-router-dom";
import "../CSS/Admin/Navbar.css"

class Navbar extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li><Link to="/adminHome" >Home</Link></li>
                    <li><Link to="/transaction/index" >Transaction</Link></li>
                    <li><Link to="/user/userList" >User List</Link></li>
                    <li><Link to="/donation/yearlyDonation" >Donation Report</Link></li>
                    <li><Link to="/donor/donorList" >Donor List</Link></li>
                    <li style={{float:"right"}}><Link >Log Out</Link></li>
                </ul>
            </div>
        );
    }
}

export default Navbar;