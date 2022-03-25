import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css"
import { Switch, Route, Redirect } from "react-router-dom";
import Main from "./Components/Auth/MainPage/Main";
import Landing from "./Components/LandingPage/Landing";
import TransactionView from "./Components/Transactions/TransactionView";
import UpdateStaffs from "./Components/Staffs/UpdateStaffs";
import StaffView from "./Components/Staffs/StaffView";
import UpdateTransaction from "./Pages/Transactions/UpdateTransaction";
import MgtView from "./Components/Dashboard/Management/ManagementView";
import Origination from "./Components/Dashboard/Origination/Origination";
import NewText from "./Pages/Transactions/NewText";
import AllStaff from "./Pages/Staffs/AllStaff";
import Home from "./Components/Home";
import Execution from "./Components/Dashboard/Execution/Execution";
import StaffTable from "./Components/Staffs/StaffTable";
import Verify from "./Components/Auth/Verify";
import PasswordReset from "./Components/Auth/Reset/PasswordReset";
import Reset from "./Components/Auth/StaffReset/Reset";
import Updates from "./Pages/Staffs/Updates";
import UserLanding from "./Components/HomePage/UserLanding"
import ProtectedRoute from "./Components/Auth/Login/ProtectedRoute";

import StaffList from "./Components/Dashboard/Origination/stafflist/StaffList";
import SingleStaff from "./Components/Dashboard/Origination/deals/SingleStaff";
import SingleView from "./Components/Dashboard/Origination/deals/SingleView";

export default function App() {
 
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/user">
          <UserLanding />
        </Route>
        <Route exact path="/login">
          <Main />
        </Route>
        <Route path="/landing">
          <Landing />
        </Route>
        <Route exact path="/transaction">
          <TransactionView />
        </Route>

        <Route path="/newPages">
          <NewText />
        </Route>

        <Route path="/update_transactions">
          <UpdateTransaction />
        </Route>

        <ProtectedRoute exact path="/staff" component={StaffView}/>
        <ProtectedRoute exact path="/staffs" component={AllStaff} />
        <ProtectedRoute exact path="/update" component={UpdateStaffs} />
        <ProtectedRoute exact path="staffview" component={AllStaff }/>
        <ProtectedRoute exact path="/dashboard" component={MgtView}/>
        <ProtectedRoute exact path="/org-dashboard" component={Origination} />
        <ProtectedRoute exact path="/execution" component={Execution} />
        <ProtectedRoute exact path="/staff_transaction_report" component={SingleView} />
        
        <Route path="/verify">
          <Verify />
        </Route>
        <Route path="/resetyourpassword">
          <Reset />
        </Route>
        <Route path="/reset_password">
          <PasswordReset />
        </Route>
        <Route path="/one_view">
          <Updates />
        </Route>
      </Switch>
    </React.Fragment>
  );
}
