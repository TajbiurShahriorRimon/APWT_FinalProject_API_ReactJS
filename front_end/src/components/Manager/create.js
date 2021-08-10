import React, {Component, useState} from 'react';
import "../CSS/Table2.css"
import Navbar from "../Admin/Navbar";
import axios from "axios";
import {Link,BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { withRouter } from "react-router";


class CreateManager extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        email: "",
        name: "",
        password: "",

        nameErr: "",
        emailErr: "",
        passwordErr: "",
    }

    handleFormInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleFormSubmit = async (e) => {
        e.preventDefault();
        var isValid = true;
        alert(this.state.name);

        //for name validation
        if(this.state.name == ""){
            isValid = false;
            this.setState({
                nameErr: "User Name Required"
            })
        }
        else if(!this.state.name.match(/^[a-zA-Z]/) || this.state.name.match(/[0-9]/)){
            isValid = false;
            this.setState({
                nameErr: "Letters only!"
            })
        }
        else {
            this.setState({
                nameErr: ""
            })
        }

        if(this.state.email == ""){
            isValid = false;
            this.setState({
                emailErr: "Email Required"
            })
        }
        /*else if(this.state.email != ""){
            //var emailAtSign = this.state.email.lastIndexOf()
            let lastAtPos = this.state.email.lastIndexOf('@');
            let lastDotPos = this.state.email.lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') == -1 && lastDotPos > 2 /!*&& (this.state.email.length - lastDotPos) > 2*!/)) {
                //formIsValid = false;
                this.setState({
                    emailErr: "Email is invalid! Give a proper Email"
                })
            }
        }*/
        else {
            this.setState({
                emailErr: ""
            })
        }

        if(this.state.password == ""){
            isValid = false;
            this.setState({
                passwordErr: "Password Required"
            })
        }
        else if(this.state.password.length < 5){
            isValid = false;
            this.setState({
                passwordErr: "Password must be minimum 5 characters"
            })
        }
        else if(!this.state.password.match(/[a-z]/) || !this.state.password.match(/[A-Z]/) || !this.state.password.match(/[0-9]/)){
            isValid = false;
            this.setState({
                passwordErr: "Password Must contain at least one small and one capital character and one number!"
            })
        }
        else {
            this.setState({
                passwordErr: ""
            })
        }

        if(isValid == true){
            const resp = await axios.post("http://localhost:8000/api/addManager", this.state);
            if (resp.data.status === 200){
                this.setState({
                    email: "",
                    name: "",
                    password: "",

                    nameErr: "",
                    emailErr: "",
                    passwordErr: "",
                })

                alert("Manager Added Successfully");
                this.props.history.push("/user/userList");
            }
            else if(resp.data.status === 205){
                this.setState({
                    emailErr: resp.data.message,
                    nameErr: "",
                    passwordErr: "",
                })
            }
        }
    }

    render() {
        return (
            <body>
                <Navbar/>
            <form onSubmit={this.handleFormSubmit}>
                <table>
                    <br/><br/><br/><br/>
                    <div className="container">
                        <h2>Register A Manager</h2>
                        <div className="form-group"> <br/> <br/>
                            <label className="control-label col-sm-2">Name:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="name" onChange={this.handleFormInput}
                                       placeholder="Enter Name" name="name" value={this.state.name}/>

                                <label style={{color: "red"}} id="nameErr">{this.state.nameErr}</label>
                            </div>
                        </div>
                        <div className="form-group"> <br/> <br/>
                            <label className="control-label col-sm-2" htmlFor="email">Email:</label>
                            <div className="col-sm-10">
                                <input type="email" className="form-control" id="email" onChange={this.handleFormInput}
                                       placeholder="Enter email" name="email" value={this.state.email}/>

                                <label style={{color: "red"}} id="emailErr">{this.state.emailErr}</label>
                            </div>
                        </div> <br/> <br/>
                        <div className="form-group">
                            <label className="control-label col-sm-2" htmlFor="pwd">Password:</label>
                            <div className="col-sm-10">
                                <input type="password" className="form-control" id="pwd" onChange={this.handleFormInput}
                                       placeholder="Enter password" name="password" value={this.state.password}/>

                                <label style={{color: "red"}} id="passwordErr">{this.state.passwordErr}</label>
                            </div>
                        </div>
                        <div className="form-group"> <br/> <br/>
                            <div className="col-sm-offset-2 col-sm-10">
                                <input type="submit" className="btn btn-success" value="Register"/>
                            </div>
                        </div>
                    </div>
                </table>
            </form>
            </body>
        );
    }
}


export default withRouter(CreateManager);