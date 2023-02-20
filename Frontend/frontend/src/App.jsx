import React, { useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css"
import { Switch, Route} from "react-router-dom";
import Main from "./Components/Auth/MainPage/Main";
import Landing from "./Components/LandingPage/Landing";
import TransactionView from "./Components/Transactions/TransactionView";
import AllDeals from "./Components/Transactions/AllDeals";
import StaffView from "./Components/Staffs/StaffView";
import UpdateTransaction from "./Pages/Transactions/UpdateTransaction";
import MgtView from "./Components/Dashboard/Management/ManagementView";
import Origination from "./Components/Dashboard/Origination/Origination";
import AllStaff from "./Pages/Staffs/AllStaff";
import DealTeamView from "./Pages/Staffs/DealTeamView";
import Home from "./Components/Home";
import Execution from "./Components/Dashboard/Execution/Execution";
import Report from './Components/Report/AllPages'
import PasswordReset from "./Components/Auth/Reset/PasswordReset";
import Reset from "./Components/Auth/StaffReset/Reset";
import Updates from "./Pages/Staffs/Updates";
import UserLanding from "./Components/HomePage/UserLanding"
import ProtectedRoute from "./Components/Auth/Login/ProtectedRoute";
import NotFound from "./Pages/NotFound";
import UserLogin from "./Components/Auth/Login/UserLogin";
import StaffList from "./Components/Dashboard/Origination/stafflist/StaffList";
import SingleStaff from "./Components/Dashboard/Origination/deals/SingleStaff";
import SingleView from "./Components/Dashboard/Origination/deals/SingleView";
import Settings from "./Components/Settings/SettingsView";
import jwt_decode from "jwt-decode";
import authService from "./Services/auth.Service"
import { useLocation } from 'react-router-dom';
import ForgotPassword from "./Components/Auth/forgot/ForgotPassword";
import PortfolioAllDeals from "./Components/Transactions/PortfolioAllDeals";
import NewTransactionPage from "./Pages/Transactions/NewTransactionPage";
import CCReportView from "./Components/Report/CCSubmissionReport/CCReportView";
import ComponentView from "./Components/Report/Reimbursible/ComponentView";
import ClosedDeals from "./Components/Report/closedDeals/pages/ClosedDeals";
import ClosedDealByFilter from "./Components/Report/closedDeals/pages/ClosedDealByFilter";
import Budget_cash from "./Components/Budget/pages/Budget_cash";
import AllReport from "./Components/Report/getReport/AllReport";


export default function App() {
  let location = useLocation()
  const parseJwt = (token) => {
    try {
      return jwt_decode(token);
    } catch (e) {
      return null;
    }
  };
  
  useEffect(() => {
    const user = localStorage.getItem("token");
    
    if (user) {
      const decodedJwt = parseJwt(user);
      if (decodedJwt.exp * 1000 < Date.now()) {
        authService.logout()
        alert("Session timed out")
      }
    }
  }, [location])

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
        <Route exact path='/forgot_password'>
          <ForgotPassword/>
        </Route>
        <Route exact path='/AllReport'>
          <AllReport/>
        </Route>

        <Route exact path="/transaction">
          <TransactionView />
        </Route>

        <Route path="/create_transaction">
          <NewTransactionPage/>
        </Route>

        <Route path="/all_transactions_portfolio"> <PortfolioAllDeals /></Route>
        
        <Route path="/update_transactions">
          <UpdateTransaction />
        </Route>

        <Route path="/dashboard"> <MgtView /> </Route>
        <Route path="/org_dashboard"> <Origination /> </Route>
        <Route path="/staff_transaction_report"> <SingleView /> </Route>
        <Route path="/execution"> <Execution /> </Route>
       


        <Route exact path="/landing" component={Landing} />
        <ProtectedRoute exact path="/create_user" component={StaffView}/>
        <ProtectedRoute exact path="/all_users" component={AllStaff} />
        <ProtectedRoute exact path="/deal_team" component={DealTeamView} />
        <ProtectedRoute exact path="/deal_team" component={DealTeamView} />
        <ProtectedRoute exact path="/all_transactions" component={AllDeals} />
        <ProtectedRoute exact path="/update_users" component={Updates} />
        <ProtectedRoute exact path="/annual_and_quarterly_report_page" component={Report} />
        <ProtectedRoute path="/reimbursible/top/n/reimbursible/report" component={ComponentView}/>
        <ProtectedRoute path="/closed_deals/inception_financial_year" component={ClosedDeals}/>
        <ProtectedRoute exact path="/settings" component={Settings} />
        <ProtectedRoute exact path="/cc_report" component={CCReportView} />
        <ProtectedRoute exact path="/closed_deals/filter" component={ClosedDealByFilter}/>
        {/* <ProtectedRoute exact path="/budget/id" component={Budget_cash}/> */}
        <ProtectedRoute exact path="/budget" component={Budget_cash}/>



        
        <Route path="/resetyourpassword">
          <Reset />
        </Route>
        <Route path="/reset_password">
          <PasswordReset />
        </Route>
        <Route path="/*">
          <NotFound />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
       
      </Switch>
    </React.Fragment>
  );
}
