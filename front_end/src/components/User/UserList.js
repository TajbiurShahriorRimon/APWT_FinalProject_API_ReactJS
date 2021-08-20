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
        var isLoggedIn = localStorage.getItem("id2");

        if(isLoggedIn == null){
            this.props.history.push("/logout/index");
        }

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
                    <tr key={item.userId} >
                        <td align={"center"}>{item.userName}</td>
                        <td align={"center"}>{item.email}</td>
                        <td align={"center"}>{item.type}</td>
                        <td align={"center"}>
                            <Link to={`/user/userProfile/${item.userId}`}>
                                <button className="btn btn-success">
                                    Check Profile
                                </button>
                            </Link>
                        </td>
                    </tr>
                )
            })
        }

        return(
            <div>
                <Navbar/> <br/> <br/> <br/>
            <div className="container"> <br/> <br/>
                <table  className="table">
                    <thead>
                    <tr>
                        <td align={"center"}>UserName</td>
                        <td align={"center"}>Email</td>
                        <td align={"center"}>Type</td>
                        <td align={"center"}></td>
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

export default withRouter(UserList);