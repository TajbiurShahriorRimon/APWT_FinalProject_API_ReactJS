import React, {Component} from 'react';
import "../CSS/Table1.css";
import "../CSS/Table2.css";
import Navbar from "../Admin/Navbar";
import axios from "axios";
import {Link, withRouter} from "react-router-dom";

class YearlyDonation extends Component {
    state = {
        result: [],
        loading: true,
    }

    async componentDidMount() {
        var isLoggedIn = localStorage.getItem("id2");

        if(isLoggedIn == null){
            this.props.history.push("/logout/index");
        }

        const resp = await axios.get('http://localhost:8000/api/donationReport/yearly');
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
                        <td style={{color: "blue"}} align="center"><Link to={`/donationReport/monthly/${item.date}`}>{item.date}</Link></td>
                        <td align="center">{item.totalAmount}</td>
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
                            <th className="text-center"><strong>Year</strong></th>
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

export default withRouter(YearlyDonation);