import React, {Component} from 'react';
import {Link,BrowserRouter as Router, Route, Switch, useHistory} from "react-router-dom";
import axios from "axios";
import "../CSS/Table2.css";
import "../CSS/Table1.css";
import Navbar from "../Admin/Navbar";


class ArchivedEvents extends Component {
    constructor(props) {
        super(props);

        var isLoggedIn = localStorage.getItem("id2");
        //alert("id: "+localStorage.getItem("id2"));
        if(isLoggedIn == null){
            //alert("loggedId: "+localStorage.getItem("id2"));
            this.props.history.push("/logout/index");
        }
    }

    state = {
        result: [],
        loading: true,
    }

    async componentDidMount() {
        const resp = await axios.get('http://localhost:8000/api/events/archivedEvents');
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
                    <div align="center" className="container">
                        <table className="card-img-64" align="center" key={item.eventId}>
                            <tr>
                                <td>
                                    <img src={"http://localhost:8000/"+item.image} width="300" height="200"/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h3><label style={{color: "#435"}}>{item.title}</label></h3>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label style={{color: "#5cab23"}}>Target Amount: </label><strong>{item.targetAmount}</strong>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Link to={`/event/briefReport/${item.eventId}`}>
                                        <button className="w3-button w3-blue btn">Check Report</button>
                                    </Link> &nbsp;&nbsp;
                                    <Link to={`/event/detailReviews/${item.eventId}`}>
                                        <button className="w3-button w3-black btn">Reviews</button>
                                    </Link>
                                </td>
                            </tr>
                        </table>
                        <br/> <hr/>
                    </div>

                )
            })
        }

        return (
            <div>
                <Navbar/> <br/> <br/> <br/>
                <div>
                    {resultTable}
                </div>
            </div>
        );
    }
}

export default ArchivedEvents;