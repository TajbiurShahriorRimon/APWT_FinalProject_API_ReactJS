import React, {Component} from 'react';
import axios from "axios";
import "../CSS/Table1.css";
import "../CSS/Table2.css";
import Navbar from "../Admin/Navbar";
import { withRouter } from "react-router";

class Index extends Component {
    constructor(props) {
        super(props);
        var isLoggedIn = localStorage.getItem("id2");
        //alert("LoggedID: "+isLoggedIn);
        if(isLoggedIn == null){
            //alert("null "+localStorage.getItem("id2"));
            this.props.history.push("/logout/index");
        }
    }
    state = {
        transaction: [],
        loading: true,
    }

    async componentDidMount() {
        const resp = await axios.get('http://localhost:8000/api/transactions');
        console.log(resp.data);

        if (resp.data.status === 200){
            this.setState({
                transaction: resp.data.transaction,
                loading: false,
            })
        }
    }
    render() {
        var transactionTable = "";

        if(this.state.loading){
            transactionTable = <tr><td>Loading...</td></tr>
        }
        else {
            transactionTable = this.state.transaction.map((item) => {
                return(

                    <tr key={item.transactionId}>
                        <td className="info">{item.date}</td>
                        <td className="danger">{item.userName}</td>
                        <td className="success">{item.title}</td>
                        <td className="active">{item.commissionAmount}</td>
                        <td className="warning">{item.totalAmount}</td>
                    </tr>
                )
            })
        }
        return (
            <div>
                <div className="navbar">
                    <Navbar/> <br/> <br/> <br/>
                </div>
                <div className="container">
                    <h1>Yearly Report</h1>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Organizer</th>
                            <th>Event Title</th>
                            <th>Commission</th>
                            <th>Amount</th>
                        </tr>
                        </thead>

                        <tbody>
                        {transactionTable}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default withRouter(Index);