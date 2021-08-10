import React, {Component} from 'react';
import {Link,BrowserRouter as Router, Route, Switch, useHistory, Redirect} from "react-router-dom";
import { withRouter } from "react-router";

class Logout extends Component {
    constructor(props) {
        super(props);

        localStorage.clear();
        this.props.history.push("/logout/index");
    }
    render() {
        return (
            <Redirect to="/"/>
            /*<div>

            </div>*/
        );
    }
}

export default withRouter(Logout);