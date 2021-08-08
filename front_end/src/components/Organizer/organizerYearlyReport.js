import React, {Component} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import Navbar from "../Admin/Navbar";
import { withRouter } from "react-router";


class OrganizerYearlyReport extends Component {
    state = {
        result: [],
        loading: true,
    }

    async componentDidMount() {
        var id = this.props.match.params.id;
        //alert(id);
        const resp = await axios.get(`http://localhost:8000/api/organizerReport/yearly/${id}`);
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
                        <td align="center">{item.date}</td>
                        <td align="center">{item.totalAmount}</td>
                    </tr>
                )
            })
        }

        return (
            <body>
            <div align="center">
                <Navbar/>
            </div>
            <div className="container">
                <table className="table">
                    <thead>
                    <tr>
                        <td align="center"><strong>Year</strong></td>
                        <td align="center"><strong>Total Raised Amount</strong></td>
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

export default withRouter(OrganizerYearlyReport);