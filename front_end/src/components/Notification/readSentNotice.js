import React, {Component} from 'react';
import axios from "axios";
import Navbar from "../Admin/Navbar";
import { withRouter } from "react-router";


class ReadSentNotice extends Component {
    state = {
        title: "",
        date: "",
        message: "",
        email: "",
        userName: "",
    }

    async componentDidMount() {
        var isLoggedIn = localStorage.getItem("id2");

        if(isLoggedIn == null){
            this.props.history.push("/logout/index");
        }

        var id = this.props.match.params.id; //parameter from url
        //alert("emp_id\n"+id);

        const resp = await axios.get(`http://localhost:8000/api/notice/readSentNotices/${id}`);
        console.log(resp.data);
        if(resp.data.status === 200){
            //alert("found\n"+resp.data.result[0].userName);
            this.setState({
                title: resp.data.result[0].title,
                date: resp.data.result[0].date,
                message: resp.data.result[0].message,
                email: resp.data.result[0].email,
                userName: resp.data.result[0].userName,
            })
        }
    }

    render() {
        return (
            <body>
            <div align="center">
                <Navbar/>
            </div>
            <div align="center">
                <table align="center">
                    <tr>
                        <td>
                            <h2>{this.state.title}</h2>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label style={{color: "#220213"}}>Email: </label><strong>{this.state.email}</strong>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label style={{color: "#6f9f6b"}}>User Name: </label><strong>{this.state.userName}</strong>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label style={{color: "#237fab"}}>Date: </label><strong>{this.state.date}</strong>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h3>{this.state.message}</h3>
                        </td>
                    </tr>
                </table>
            </div>
            </body>
        );
    }
}

export default withRouter(ReadSentNotice);