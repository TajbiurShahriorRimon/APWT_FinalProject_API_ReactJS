import React, {Component} from 'react';
import Navbar from "../Admin/Navbar";
import "../CSS/Table2.css";
import {Link} from "react-router-dom";
import axios from "axios";

class DonorList extends Component {
    state = {
        result: [],
        loading: true,
    }

    async componentDidMount() {
        const resp = await axios.get('http://localhost:8000/api/donorList');
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
                    <tr key={item.userId}>
                        <td align="center">{item.userId}</td>
                        <td align="center">{item.userName}</td>
                        <td align="center">{item.email}</td>
                        <td align="center">{item.totalAmount}</td>
                    </tr>
                )
            })
        }

        return (
            <body>
                <Navbar/> <br/><br/>
                <div align="center"> <br/> <br/>
                <Link to={"/donor/topDonorDetails"}><strong style={{backgroundColor : "hotpink"}}>Top Donor Details</strong></Link> |
                <Link to={"/donor/nonDonor"} style={{backgroundColor : "#ffc"}}>Non Donor</Link>
                </div>
                <div className="container">
                    <table className="table">
                        <thead>
                        <tr>
                            <td align="center"><strong>User Id</strong></td>
                            <td align="center"><strong>User Name</strong></td>
                            <td align="center"><strong>Email</strong></td>
                            <td align="center"><strong>Total Amount</strong></td>
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

export default DonorList;