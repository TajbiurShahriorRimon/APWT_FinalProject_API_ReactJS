import React, {Component} from 'react';
import Navbar from "../Admin/Navbar";
import axios from "axios";
import "../CSS/Table2.css"
import {withRouter} from "react-router-dom";

class NoticeCreate extends Component {

    state = {
        result: [],
        loading: true,

        message: "",
        title: "",
        managerUserId: "",

        titleErr: "",
        messageErr: "",
    }

    async componentDidMount() {
        var isLoggedIn = localStorage.getItem("id2");

        if(isLoggedIn == null){
            this.props.history.push("/logout/index");
        }

        const resp = await axios.get('http://localhost:8000/api/admin/createNotice');
        console.log(resp.data);

        if (resp.data.status === 200){
            this.setState({
                result: resp.data.result,
                loading: false,
            })
        }
    }

    handleInput = (e) => {
        this.setState({
            /*message: e.target.message,
            title: e.target.title*/
            [e.target.name]: e.target.value
        })
    }

    handleFormSubmit = async (e) => {
        e.preventDefault();
        var adminId = localStorage.getItem("id2");
        var managerId = e.target.managerUserId.value;
        var messageDescription = e.target.message.value;
        var titleHeadline = e.target.title.value;
        //alert(adminId+"\nmanager: "+managerId);

        var requestArray = {
            message: messageDescription,
            title: titleHeadline,
            managerUserId: managerId
        }

        var isValid = true;

        if(isValid == true) {
            this.setState({
                managerUserId: managerId
            });
        }

        if(this.state.title == ""){
            isValid = false;
            this.setState({
                titleErr: "Title Required"
            })
        }
        else{
            this.setState({
                titleErr: ""
            })
        }

        if(this.state.message == ""){
            isValid = false;
            this.setState({
                messageErr: "Message Description Required"
            })
        }
        else{
            this.setState({
                messageErr: ""
            })
        }

        if(isValid == true){
            /*this.setState({
                managerUserId: managerId
            });*/
            const resp1 = await axios.post(`http://localhost:8000/api/admin/createNotice/${adminId}`, requestArray);
            if(resp1.data.status === 200){
                this.setState({
                    title: "",
                    message: "",
                });
                alert("Notice Sent Successfully");

                this.props.history.push("/notification/adminNotification");
            }

        }
    }

    render() {
        var resultTable = "";

        if(this.state.loading){
            resultTable = <tr><td>Loading...</td></tr>
        }
        else {
            resultTable = this.state.result.map((item) => {
                return (
                    <option value={item.userId} name={item.userId} key={item.userId}>
                        {item.userName}
                    </option>
                )
            })
        }

        return (
            <body>
                <div>
                <Navbar/> <br/> <br/> <br/>
                </div>

                <div className="container">
                <form onSubmit={this.handleFormSubmit}>
                    <table className="table">
                        <thead>
                        {/*<tr>
                            <td><strong>TO</strong>
                                <select name="managerUserId">
                                    @foreach($managers as $manager)
                                    <option value="{{$manager['userId']}}"
                                            name="{{$manager['userId']}}">{{$manager['userName']}}</option>
                                    @endforeach
                                </select>
                            </td>
                        </tr>*/}
                        <tr>
                            <td>
                                <strong>To</strong>
                                <select name="managerUserId">
                                    {resultTable}
                                </select>
                            </td> <br/> <br/>

                        </tr>
                        <tr>
                            <td>
                                <input type="text" id="title" name="title" placeholder="Title..." size="100" onChange={this.handleInput}
                                       value={this.state.title}/> <br/>

                                <label style={{color: "red"}}>{this.state.titleErr}</label>
                            </td> <br/>
                        </tr>
                        <tr>
                            <td>
                    <textarea name="message" id="message" placeholder="Details..." onChange={this.handleInput}
                              rows="10" cols="100" value={this.state.message}>
                    </textarea> <br/>
                                <label style={{color: "red"}}>{this.state.messageErr}</label> <br/>

                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="submit" name="createNotice" value="Send Notice" className="btn btn-success"/>
                            </td>
                        </tr>
                        </thead>
                    </table>
                </form>
                </div>
            </body>
        );
    }
}

export default withRouter(NoticeCreate);