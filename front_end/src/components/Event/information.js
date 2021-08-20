import React, {Component} from 'react';
import axios from "axios";
import Navbar from "../Admin/Navbar";
import {useHistory, withRouter, Route, Link} from "react-router-dom";

class Information extends Component {
    state = {
        result: "",
        managerResult: [],
        managerList: [],
        loading: true,

        eventId: "",
        title: "",
        startDate: "",
        endDate: "",
        image: "",
        userId: "",
        managerUserId: "",
        managerId: "",
        targetAmount: "",
        commission: "",
        status: "",

        managerDetails: "",

        commissionErr: "",
        managerStatus: "",
    }

    async componentDidMount() {
        var isLoggedIn = localStorage.getItem("id2");

        if(isLoggedIn == null){
            this.props.history.push("/logout/index");
        }

        var id = this.props.match.params.id; //parameter from url

        const resp = await axios.get(`http://localhost:8000/api/event/information/${id}`);
        console.log(resp.data);

        if (resp.data.status === 200){
            this.setState({
                image: resp.data.result[0].image,
                title: resp.data.result[0].title,
                targetAmount: resp.data.result[0].targetAmount,
                startDate: resp.data.result[0].startDate,
                endDate: resp.data.result[0].endDate,
                commission: resp.data.result[0].commission,
                managerId: resp.data.result[0].managerId,

                managerStatus: resp.data.managerStatus,

                managerResult: resp.data.managerResult,
                loading: false,
            })
        }

        const resp1 = await axios.get(`http://localhost:8000/api/event/getManagerList/${this.state.managerId}`);

        if(resp1.data.status === 200){
            this.setState({
                managerList: resp1.data.managerList,
                managerDetails: resp1.data.managerDetails[0].userName,
            })
        }
    }

    loadPage = async () => {
        var id = this.props.match.params.id; //parameter from url

        const resp = await axios.get(`http://localhost:8000/api/event/information/${id}`);
        console.log(resp.data);

        if (resp.data.status === 200){
            this.setState({
                image: resp.data.result[0].image,
                title: resp.data.result[0].title,
                targetAmount: resp.data.result[0].targetAmount,
                startDate: resp.data.result[0].startDate,
                endDate: resp.data.result[0].endDate,
                commission: resp.data.result[0].commission,
                managerId: resp.data.result[0].managerId,

                managerStatus: resp.data.managerStatus,

                managerResult: resp.data.managerResult,
                loading: false,
            })
        }

        const resp1 = await axios.get(`http://localhost:8000/api/event/getManagerList/${this.state.managerId}`);

        if(resp1.data.status === 200){
            this.setState({
                managerList: resp1.data.managerList,
                managerDetails: resp1.data.managerDetails[0].userName,
            })
        }
    }

    handleEventUpdateForm = async (e, id) => {
        e.preventDefault();
        var eventId = this.props.match.params.id; //parameter from url
        var requestArray = {
            managerUserId: id
        }
        //alert("hello: "+id);

        const resp1 = await axios.put(`http://localhost:8000/api/event/information/${eventId}`, requestArray);

        if(resp1.data.status === 200){
            alert("Updated Successfully");
            await this.loadPage();
        }
    }

    render() {
        var managerResultTable = "";
        var managerStatusDetails = "";
        var managerDropDown = "";

        if(this.state.loading){
            managerResultTable = <tr><td>Loading...</td></tr>
        }
        else if(this.state.managerStatus == 0){
            managerStatusDetails = <strong style={{color: "blue"}}>Manager Deactivated. Select a manager for update! </strong>
            managerResultTable = this.state.managerResult.map((item) => {
                return (
                    <option onClick={(e) => {this.handleEventUpdateForm(e, item.userId)}} value={item.userId} name={item.userId} key={item.userId}>
                        {item.userName}
                    </option>
                )
            })
        }
        else {
            managerStatusDetails = <label>
                                        Event Manager:
                                        <strong style={{color: "green"}}>{this.state.managerDetails}</strong> <br/>
                                        Swap a manager from drop down for update
                                    </label>
            managerResultTable = this.state.managerList.map((item) => {
                return (
                    <option onClick={(e) => {this.handleEventUpdateForm(e, item.userId)}} value={item.userId} name={item.userId} key={item.userId}>
                        {item.userName}
                    </option>
                )
            })
        }

        return (
            <div>
                <Navbar/> <br/> <br/> <br/>
                <div className="container">
                    <form onSubmit={this.handleFormSubmit}>
                        <table className="table">
                            <tbody>
                            <tr>
                                <th>
                                    <img src={"http://localhost:8000/"+this.state.image} width="300" height="200"/>
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    <h2>{this.state.title}</h2>
                                    <input type="text" hidden name="title" value={this.state.title}/>
                                </th>
                            </tr>
                            <tr>
                                <th>Target Amount: <strong>{this.state.targetAmount}</strong></th>
                            </tr>
                            <tr>
                                <th>
                                    Commission: <label style={{color: "red"}}><strong>{this.state.commission}</strong></label>
                                </th>
                            </tr>
                            <tr>
                                <th>Starting Date: {this.state.startDate}</th>
                            </tr>
                            <tr>
                                <th>Closing Date: {this.state.endDate}</th>
                            </tr>
                            <tr>
                                <th>
                                    Select Manager: {/*<select name="managerUserId">*/}
                                    {managerStatusDetails}
                                    {/*{managerDropDown}*/}
                                    <select name="managerUserId">
                                        {managerResultTable}
                                    </select>
                                </th>
                            </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(Information);