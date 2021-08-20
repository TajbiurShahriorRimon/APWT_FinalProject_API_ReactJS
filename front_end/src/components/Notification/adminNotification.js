import React, {Component} from 'react';
import axios from "axios";
import {Link, withRouter} from "react-router-dom";
import Navbar from "../Admin/Navbar";

class AdminNotification extends Component {
    state = {
        result: [],
        loading: true,
    }

    async componentDidMount() {
        //alert("dssd")
        var isLoggedIn = localStorage.getItem("id2");

        if(isLoggedIn == null){
            this.props.history.push("/logout/index");
        }

        const resp = await axios.get('http://localhost:8000/api/admin/notice');
        console.log(resp.data);

        if (resp.data.status === 200){
            this.setState({
                result: resp.data.result,
                loading: false,
            })
            /*var arrayLength = resp.data.result.length;
            var i = 0;
            for(i = 0; i < arrayLength; i++){
                if(resp.data.result[i].status == 0){
                    this.setState({
                    })
                }
            }*/
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
                            <td>
                                <h3><label style={{color: "#435"}}>{item.title}</label></h3>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label style={{color: "#5cab23"}}>Email: </label><strong>{item.email}</strong>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label style={{color: "#aba423"}}>Date: </label><strong>{item.date}</strong>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input hidden={item.status===0?false:true} style={{color: "green", backgroundColor: "#311035"}}
                                       type="submit" disabled="true" value={item.status===0?'Unread':'Read'}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Link to={`/notification/readNotification/${item.notificationId}`}>
                                    <button className="btn btn-primary">Check</button>
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
                <Link to="/notification/sentNoticeList">
                    <button className="btn btn-danger">Sent Notices</button>
                </Link> &nbsp; &nbsp;
                <Link to="/admin/createNotice">
                    <button className="btn btn-warning">+ Create New Notice</button>
                </Link>
            </div>
            {resultTable}
            </body>
        );
    }
}

export default withRouter(AdminNotification);