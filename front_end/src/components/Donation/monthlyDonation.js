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
                    <tr key={item.date} style={{backgroundColor: "#c4c6b8"}}>
                        <td align={"center"}>{item.date}</td>
                        <td align={"center"}>{item.totalAmount}</td>
                    </tr>
                )
            })
        }

        return (
            <div>
                <Navbar/> <br/> <br/> <br/>
                <div className="container">
                    <table className="table">
                        <thead>
                        <tr>
                            <th className="text-center"><strong>Month</strong></th>
                            <th className="text-center"><strong>Total Amount</strong></th>
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