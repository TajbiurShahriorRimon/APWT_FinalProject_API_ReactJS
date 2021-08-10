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
import NonOrganizerList from "./components/Organizer/nonOrganizerList";
import TopOrganizerDetails from "./components/Organizer/topOrganizerDetails";
import NumOfEvents from "./components/Organizer/numOfEvents";
import OrganizerYearlyReport from "./components/Organizer/organizerYearlyReport";
import AdminNotification from "./components/Notification/adminNotification";
import ReadNotice from "./components/Notification/readNotice";
import Logout from "./components/Logout/index";
import SentNoticeList from "./components/Notification/sentNoticeList";
import ReadSentNotice from "./components/Notification/readSentNotice";
import CreateManager from "./components/Manager/create";
import FormPage from "./components/Manager/create";


function App() {
  return(
      <div>
        <Router>
            <Switch>
                //Login
                <Route exact path="/">
                    <div><Login/></div>
                </Route>

                //Logout
                <Route exact path="/logout/index">
                    <div><Logout/></div>
                </Route>

                //Admin
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

                //Manager
                <Route path="/manager/create">
                    <div><CreateManager/></div>
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

                //Organizer
                <Route path="/organizer/nonOrganizerList">
                    <div><NonOrganizerList/></div>
                </Route>
                <Route path="/organizer/topOrganizerDetails">
                    <div><TopOrganizerDetails/></div>
                </Route>
                <Route path="/organizer/numOfEvents">
                    <div><NumOfEvents/></div>
                </Route>
                <Route path="/organizer/organizerYearlyReport/:id">
                    <div><OrganizerYearlyReport/></div>
                </Route>

                //Notification
                <Route path="/notification/adminNotification">
                    <div><AdminNotification/></div>
                </Route>
                <Route path="/notification/readNotification/:id">
                    <div><ReadNotice/></div>
                </Route>
                <Route path="/notification/sentNoticeList">
                    <div><SentNoticeList/></div>
                </Route>
                <Route path="/notification/readSentNotice/:id">
                    <div><ReadSentNotice/></div>
                </Route>
            </Switch>
        </Router>
      </div>
  )
}

export default App;
