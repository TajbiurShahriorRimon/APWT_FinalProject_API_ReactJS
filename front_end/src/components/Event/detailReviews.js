import React, {Component} from 'react';
import axios from "axios";
import {Link, withRouter} from "react-router-dom";
import Navbar from "../Admin/Navbar";
import "../CSS/Table2.css"

class DetailReviews extends Component {
    state = {
        result: [],
        loading: true,
    }

    async componentDidMount() {
        var isLoggedIn = localStorage.getItem("id2");

        if(isLoggedIn == null){
            this.props.history.push("/logout/index");
        }

        var id = this.props.match.params.id;
        //alert(id);
        const resp = await axios.get(`http://localhost:8000/api/event/detailReviews/${id}`);
        console.log(resp.data);

        if (resp.data.status === 200){
            this.setState({
                result: resp.data.result,
                loading: false,
            })
        }
    }

    deleteEventReview = async (e, id, eventId) => {
        e.preventDefault();
        //alert("comment ID: "+id+"\nEvent Id: "+eventId);
        const resp = await axios.delete(`http://localhost:8000/api/event/removeComment/${id}/${eventId}`);

        if (resp.data.status === 200){
            this.setState({
                result: resp.data.result,
                loading: false,
            })
            alert("Review Deleted Successfully!");
            //this.props.history.push(`/event/detailReviews/${eventId}`);
            window.location.replace(`/event/detailReviews/${eventId}`);

            /*const resp1 = await axios.get(`http://localhost:8000/api/event/detailReviews/${eventId}`);
            console.log(resp.data);
            alert(eventId);

            if (resp1.data.status === 200){
                this.setState({
                    result: resp1.data.result,
                    loading: false,
                })
            }*/
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
                    <div className="container">
                        <table align="center" key={item.eventId}>
                            <thead>
                            <tr>
                                <th>
                                    {item.userName} <br/>
                                    {item.email} <br/>
                                    {item.date} <br/>
                                </th>
                            </tr>
                            </thead>
                            <tr>
                                <td>
                                    <textarea readOnly rows="5" cols="100">{item.description}</textarea>
                                       <button className="btn btn-danger" onClick={(e) => this.deleteEventReview(e, item.commentId, item.eventId)}>
                                           Remove Comment
                                       </button>
                                </td>
                            </tr>
                        </table>
                        <hr/> <br/>
                    </div>
                )
            })
        }

        return (
            <div>
                <Navbar/> <br/> <br/> <br/>
                {resultTable}
            </div>
        );
    }
}

export default withRouter(DetailReviews);