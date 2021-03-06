import React, {Component} from 'react';
import axios from "axios";
import {Link, withRouter} from "react-router-dom";
import Navbar from "../Admin/Navbar";

class NonOrganizerList extends Component {
    state = {
        result: [],
        loading: true,
    }

    async componentDidMount() {
        var isLoggedIn = localStorage.getItem("id2");

        if(isLoggedIn == null){
            this.props.history.push("/logout/index");
        }

        const resp = await axios.get('http://localhost:8000/api/nonOrganizerList');
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
                    <tr key={item.date}>
                        <td align="center">{item.userId}</td>
                        <td align="center">{item.userName}</td>
                        <td align="center">{item.email}</td>
                        <td align="left"><Link to={`/user/userProfile/${item.userId}`}>
                            <button className="btn btn-info">Check Profile</button>
                        </Link></td>
                    </tr>
                )
            })
        }

        return (
            <body>
            <div align="center">
                <Navbar/> <br/><br/> <br/> <br/>
                <Link to={"/organizer/topOrganizerDetails"}><strong style={{color: "hotpink"}}>Top Organizer Details</strong></Link> <br/> <br/>
            </div>
            <div className="container">
                <table className="table">
                    <thead>
                    <tr>
                        <td align="center"><strong>User Id</strong></td>
                        <td align="center"><strong>User Name</strong></td>
                        <td align="center"><strong>Email</strong></td>
                        <td align="left"></td>
                    </tr>
                    </thead>
                    <tbody>
                    {resultTable}
                    </tbody>
                </table>
            </div>
            </body>
        );
    }
}

export default withRouter(NonOrganizerList);