import React, {Component} from 'react';
import axios from "axios";
import {useHistory, withRouter, Route, Link} from "react-router-dom";
import "../CSS/Table1.css";
import Navbar from "../Admin/Navbar";

class UserList extends Component {
    state = {
        users: [],
        loading: true,
    }

    async componentDidMount() {
        const resp = await axios.get('http://localhost:8000/api/userList');
        //console.log(resp.data);

        if (resp.data.status === 200){
            this.setState({
                users: resp.data.users,
                loading: false,
            })
        }
    }

    render() {
        var userTable = "";

        if(this.state.loading){
            userTable = <tr><td>Loading...</td></tr>
        }
        else {
            userTable = this.state.users.map((item) => {
                return(
                    <tr key={item.userId}>
                        <td>{item.userName}</td>
                        <td>{item.email}</td>
                        <td>{item.type}</td>
                        <td>
                            <Link to={`/user/userProfile/${item.userId}`}>Check Profile</Link>
                        </td>
                    </tr>
                )
            })
        }

        return(
            <div>
                <Navbar/> <br/> <br/> <br/>
            <div id="wrapper">
                <table  id="keywords" cellspacing="0" cellpadding="0">
                    <thead>
                    <tr>
                        <th>UserName</th>
                        <th>Email</th>
                        <th>Type</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {userTable}
                    </tbody>
                </table>
            </div>
            </div>
        )
    }
}

export default UserList;