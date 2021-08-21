import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, useHistory} from "react-router-dom";
import axios from "axios";

const Login = ({}) => {
    const history = useHistory();

    var userArray = {
        mail: "",
        pass: "",
        /*type: "",
        userId: "",*/
    }

    async function LoginSubmit(e){
        e.preventDefault();

        userArray.mail = e.target.mail.value;
        userArray.pass = e.target.pass.value;
        //userArray.type = "";
        const resp = await axios.post("http://localhost:8000/api/login", userArray);
        if(resp.data.status === 200){
            if(resp.data.type == "admin"){
                //alert("adminHomePage");
                var userID = resp.data.userId;
                var type = resp.data.type;
                var mail = resp.data.mail;
                //alert(userID+"\n"+mail+"\n"+type);

                localStorage.setItem("id2", userID);
                localStorage.setItem("type", type);
                localStorage.setItem("email", mail);

                history.push('/adminHome');
            }
            else if(resp.data.type == "user"){
                alert("userHomePage");
            }
            if(resp.data.type == "manager"){
                //alert("adminHomePage");
                var userID = resp.data.userId;
                var type = resp.data.type;
                var mail = resp.data.mail;
                //alert(userID+"\n"+mail+"\n"+type);

                localStorage.setItem("id3", userID);
                localStorage.setItem("type", type);
                localStorage.setItem("email", mail);

                history.push('/ManagerHome');
            }
            else if(resp.data.type == "user"){
                alert("userHomePage");
            }

        }
    }

    return (
        <div className="container">
            <h3>Login Page</h3>
            <form onSubmit={LoginSubmit}>
                <table className="table">
                    <tbody>
                    <tr>
                        <td>Email</td>
                        <td>
                            <input type="text" name="mail"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td>
                            <input type="password" name="pass"/>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <input className="btn btn-success" type="submit" value="Login"/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default Login;