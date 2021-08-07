import React, {Component} from 'react';
import axios from "axios";
//import "../CSS/Others/test1.scss";
import "../CSS/Table1.css"
import Navbar from "../Admin/Navbar";
class Index extends Component {
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
                        <td>{item.date}</td>
                        <td>{item.userName}</td>
                        <td>{item.title}</td>
                        <td>{item.commissionAmount}</td>
                        <td>{item.totalAmount}</td>
                    </tr>
                )
            })
        }
        return (
            <div>
                <Navbar/> <br/> <br/> <br/>
                <div id="wrapper">
                    <h1>Yearly Report</h1>
                    <table id="keywords" cellspacing="0" cellpadding="0">
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

export default Index;