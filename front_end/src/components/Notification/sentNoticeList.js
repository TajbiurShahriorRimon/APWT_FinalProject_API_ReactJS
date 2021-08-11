import React, {Component} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import Navbar from "../Admin/Navbar";

class SentNoticeList extends Component {
    state = {
        result: [],
        loading: true,
    }

    async componentDidMount() {
        var userId = localStorage.getItem("id2");
        //alert("dssd")
        const resp = await axios.get(`http://localhost:8000/api/notices/checkSentNotices/${userId}`);
        console.log(resp.data);

        if (resp.data.status === 200){
            this.setState({
                result: resp.data.result,
                loading: false,
            })
        }
    }

    render() {
        var resultTable = "";

        if(this.state.loading){
            resultTable = <tr><td>Loading...</td></tr>
        }
        else {
            resultTable = this.state.result.map((item) => {
                return(
                    <div align="center">
                        <table align="center" key={item.notificationId}>
                            <tr>
                                <td align="left">
                                    <h3><h1 style={{color: "#435"}}>{item.title}</h1></h3>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label style={{color: "#5cab23"}}>Email: </label><strong>{item.email}</strong>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label style={{color: "#8d5949"}}>User Name: </label><strong>{item.userName}</strong>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label style={{color: "#aba423"}}>Date: </label><strong>{item.date}</strong>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Link to={`/notification/readSentNotice/${item.notificationId}`}>
                                        <button className="btn btn-warning">Read</button>
                                    </Link>
                                </td>
                            </tr>
                        </table>
                        <br/> <hr/>
                    </div>
                )
            })
        }

        return (
            <body>
            <div align="center">
                <Navbar/>
            </div> <br/><br/><br/>
            <div align="right" style={{position: "fixed"}}>
                <Link to="/admin/createNotice">
                    <button className="btn btn-warning">+ Create New Notice</button>
                </Link>
            </div>
            {resultTable}
            </body>
        );
    }
}

export default SentNoticeList;