import React, {Component} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import Navbar from "../Admin/Navbar";

class NumOfEvents extends Component {
    state = {
        result: [],
        loading: true,
    }

    async componentDidMount() {
        const resp = await axios.get('http://localhost:8000/api/organizerList/report');
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
                        <td align="center">{item.numOfEvents}</td>
                        <td align="left">
                            <Link to={`/organizer/organizerYearlyReport/${item.userId}`}>
                                <button className="btn btn-info">Yearly Report</button>
                            </Link>
                        </td>
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
                        <td align="center"><strong>No. of Events</strong></td>
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

export default NumOfEvents;