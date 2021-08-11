import React, {Component} from 'react';
import axios from "axios";
import Navbar from "../Admin/Navbar";
import { withRouter } from "react-router";


class ReadNotice extends Component {
    state = {
        title: "",
        date: "",
        message: "",
    }

    async componentDidMount() {
        var id = this.props.match.params.id; //parameter from url
        //alert("emp_id\n"+id);

        const resp = await axios.get(`http://localhost:8000/api/admin/readNotice/${id}`);
        console.log(resp.data);
        if(resp.data.status === 200){
            //alert("found\n"+resp.data.result[0].userName);
            this.setState({
                title: resp.data.result[0].title,
                date: resp.data.result[0].date,
                message: resp.data.result[0].message,
            })
        }
    }

    render() {
        return (
            <body>
                <div align="center">
                    <Navbar/>
                </div> <br/> <br/> <br/> <br/>
                <div align="center">
                    <table align="center">
                        <tr>
                            <td>
                                <h3>{this.state.title}</h3>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label style={{color: "#237fab"}}>Date: </label><strong>{this.state.date}</strong>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h3>{this.state.message}</h3>
                            </td>
                        </tr>
                    </table>
                </div>
            </body>
        );
    }
}

export default withRouter(ReadNotice);