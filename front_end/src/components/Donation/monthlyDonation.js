import React, {Component} from 'react';
import "../CSS/Table1.css";
import Navbar from "../Admin/Navbar";
import axios from "axios";
import { withRouter } from "react-router";
import {Link} from "react-router-dom";

class MonthlyDonation extends Component {
    state = {
        result: [],
        loading: true,
    }

    async componentDidMount() {
        var year = this.props.match.params.year;
        //alert(year);
        const resp = await axios.get(`http://localhost:8000/api/donationReport/monthly/${year}`);
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
                        <td>{item.date}</td>
                        <td>{item.totalAmount}</td>
                    </tr>
                )
            })
        }

        return (
            <div>
                <Navbar/> <br/> <br/> <br/>
                <div id="wrapper">
                    <table id="keywords" cellspacing="0" cellpadding="0">
                        <thead>
                        <tr>
                            <th><strong>Month</strong></th>
                            <th><strong>Total Amount</strong></th>
                        </tr>
                        </thead>
                        <tbody>
                        {resultTable}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default withRouter(MonthlyDonation);