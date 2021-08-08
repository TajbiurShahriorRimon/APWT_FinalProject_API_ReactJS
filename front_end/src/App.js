import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from "./components/Login";
import AdminHome from "./components/Admin/AdminHome";
import UserList from "./components/User/UserList";
import UserProfile from "./components/User/userProfile";
import YearlyDonation from "./components/Donation/yearlyDonation";
import MonthlyDonation from "./components/Donation/monthlyDonation";
import Index from "./components/Transaction";
import DonorList from "./components/Donor/donorList";
import TopDonorDetails from "./components/Donor/topDonorDetails";
import NonDonor from "./components/Donor/nonDonor";


function App() {
  return(
      <div>
        <Router>
            <Switch>
                <Route exact path="/">
                    <div><Login/></div>
                </Route>
                <Route path="/adminHome">
                    <div><AdminHome/></div>
                </Route>

                //User
                <Route path="/user/userList">
                    <div><UserList/></div>
                </Route>
                <Route path="/user/userProfile/:id">
                    <div><UserProfile/></div>
                </Route>

                //Transaction
                <Route path="/transaction/index">
                    <div><Index/></div>
                </Route>

                //Donation
                <Route path="/donation/yearlyDonation">
                    <div><YearlyDonation/></div>
                </Route>
                <Route path="/donationReport/monthly/:year">
                    <div><MonthlyDonation/></div>
                </Route>

                //Donor
                <Route path="/donor/donorList">
                    <div><DonorList/></div>
                </Route>
                <Route path="/donor/topDonorDetails">
                    <div><TopDonorDetails/></div>
                </Route>
                <Route path="/donor/nonDonor">
                    <div><NonDonor/></div>
                </Route>
            </Switch>
        </Router>
      </div>
  )
}

export default App;
