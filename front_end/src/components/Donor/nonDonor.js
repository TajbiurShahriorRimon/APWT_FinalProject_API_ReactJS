import React, {Component} from 'react';
import axios from "axios";
import Navbar from "../Admin/Navbar";
import {Link} from "react-router-dom";

class NonDonor extends Component {
    state = {
        result: [],
        loading: true,
    }

    async componentDidMount() {
        const resp = await axios.get('http://localhost:8000/api/nonDonorList');
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
                    <tr key={item.userId} style={{color: "green"}}>
                        <td className="info" align="center">{item.userId}</td>
                        <td className="active" align="center">{item.userName}</td>
                        <td className="danger" align="center">{item.email}</td>
                        <Link to={`/user/userProfile/${item.userId}`} >
                            <button className="btn btn-success">
                                Check Profile
                            </button>
                        </Link>
                    </tr>
                )
            })
        }

        return (
            <body>
            <Navbar/> <br/><br/> <br/> <br/>
            <br/><br/><br/>
            <div className="container">
                <table className="table">
                    <thead>
                    <tr>
                        <td align="center"><strong>User Id</strong></td>
                        <td align="center"><strong>User Name</strong></td>
                        <td align="center"><strong>Email</strong></td>
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

export default NonDonor;