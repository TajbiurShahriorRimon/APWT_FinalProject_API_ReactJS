import React, {Component} from 'react';
import axios from "axios";
import Navbar from "../Admin/Navbar";
import {useHistory, withRouter, Route, Link} from "react-router-dom";


class RequestApproval extends Component {
    state = {
        result: "",
        managerResult: [],
        loading: true,

        eventId: "",
        title: "",
        reqStartDate: "",
        reqEndDate: "",
        image: "",
        userId: "",
        managerUserId: "",
        targetAmount: "",
        commission: "",
        status: "",

        startDateErr: "",
        endDateErr: "",
        commissionErr: "",
    }

    async componentDidMount() {
        var id = this.props.match.params.id; //parameter from url

        const resp = await axios.get(`http://localhost:8000/api/eventRequest/approveForm/${id}`);
        console.log(resp.data);

        if (resp.data.status === 200){
            this.setState({
                image: resp.data.result[0].image,
                title: resp.data.result[0].title,
                targetAmount: resp.data.result[0].targetAmount,
                reqStartDate: resp.data.result[0].startDate,
                reqEndDate: resp.data.result[0].endDate,

                managerResult: resp.data.managerResult,
                loading: false,
            })
        }
    }

    handleFormSubmit = async (e) => {
        e.preventDefault();
        var isValid = true;

        var commissionVal = e.target.commission.value;
        var startDateVal = e.target.startDate.value;
        var titleVal = e.target.title.value;
        var endDateVal = e.target.endDate.value;
        var managerUserIdVal = e.target.managerUserId.value;

        /*alert("comm: "+commissionVal+"\nstart: "+e.target.startDate.value+"\nend: "+e.target.endDate.value
                +"\nmanager: "+e.target.managerUserId.value +"\nTitle: "+e.target.title.value
        )*/

        var requestArray = {
            commission: e.target.commission.value,
            startDate: e.target.startDate.value,
            endDate: e.target.endDate.value,
            managerUserId: e.target.managerUserId.value,
            title: e.target.title.value,
        }

        if(commissionVal == ""){
            isValid = false;
            this.setState({
                commissionErr: "Commission is required"
            });
        }
        else {
            if(commissionVal.match(/^-?\d+$/)){
                //alert("Integer");
                this.setState({
                    commissionErr: ""
                });
            }else if(commissionVal.match(/^\d+\.\d+$/)){
                //alert("float");
                this.setState({
                    commissionErr: ""
                });
            }else{
                isValid = false;
                this.setState({
                    commissionErr: "Commission must be numeric, cannot be less than zero and cannot be greater or equals to hundred and no space allowed"
                });
                if(commissionVal < 0 && commissionVal >= 100){
                    this.setState({
                        commissionErr: "Commission must be numeric, cannot be less than zero and cannot be greater or equals to hundred and no space allowed"
                    });
                }
            }
        }

        if(startDateVal == ""){
            isValid = false;
            this.setState({
                startDateErr: "Choose a starting date!"
            });
        }
        else {
            this.setState({
                startDateErr: ""
            });
        }

        if(endDateVal == ""){
            isValid = false;
            this.setState({
                endDateErr: "Choose a ending date!"
            });
        }
        else {
            this.setState({
                endDateErr: ""
            });
        }

        if(isValid == true){
            var id = this.props.match.params.id; //parameter from url

            const resp1 = await axios.post(`http://localhost:8000/api/eventRequest/approveForm/${id}`, requestArray);

            if (resp1.data.status === 200){
                alert("Event Approved successfully!");
                this.props.history.replace("/adminHome");
            }
        }
    }

    render() {
        var managerResultTable = "";

        if(this.state.loading){
            managerResultTable = <tr><td>Loading...</td></tr>
        }
        else {
            managerResultTable = this.state.managerResult.map((item) => {
                return (
                    <option value={item.userId} name={item.userId} key={item.userId}>
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
                                Commission: <input type="text" name="commission"/>
                                <label style={{color: "red"}}><strong>{this.state.commissionErr}</strong></label>
                            </th>
                        </tr>
                        <tr>
                            <th>
                                Select Manager: <select name="managerUserId">
                                                    {managerResultTable}
                                                </select>
                            </th>
                        </tr>
                        <tr>
                            <th>Requested Starting Date: {this.state.reqStartDate}</th>
                        </tr>
                        <tr>
                            <th>Choose Starting Date:
                                <input type="date" onChange={this.handleInput} name="startDate"/>
                                <label style={{color: "red"}}><strong>{this.state.startDateErr}</strong></label>
                            </th>
                        </tr>
                        <tr>
                            <th>Requested Closing Date: {this.state.reqEndDate}</th>
                        </tr>
                        <tr>
                            <th>Choose Ending Date:
                                <input type="date" onChange={this.handleInput} name="endDate"/>
                                <label style={{color: "red"}}><strong>{this.state.endDateErr}</strong></label>
                            </th>
                        </tr>
                        <tr>
                            <th>
                                <input type="submit" value="Remove Event"/>
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

export default withRouter(RequestApproval);