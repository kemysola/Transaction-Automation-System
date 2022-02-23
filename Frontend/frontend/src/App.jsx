import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Main from './Components/Auth/MainPage/Main';
import Landing from './Components/LandingPage/Landing'
import TransactionView from './Components/Transactions/TransactionView'
import UpdateStaffs from './Components/Staffs/UpdateStaffs';
import StaffView from './Components/Staffs/StaffView';
import UpdateTransaction from './Pages/Transactions/UpdateTransaction';
import NewTransaction from './Pages/Transactions/NewTransaction';
import MgtView from './Components/Dashboard/Management/ManagementView';
import Text from './Pages/Transactions/Text';
import NewText from './Pages/Transactions/NewText';
import AllStaff from './Pages/Staffs/AllStaff';
import './App.css';
import Home from './Components/Home'
import Testing from './Components/Transactions/Testing'

export default function App() {
    return (
        <React.Fragment>
            <Switch>
                <Route exact path='/' >
                    <Home />
                </Route>
                <Route exact path="/login">
                    <Main />
                </Route>
                <Route path='/landing'>
                    <Landing />
                </Route>
                <Route exact path='/transaction'>
                    <TransactionView />
                </Route>
                <Route exact path='/staff'>
                    <StaffView />
                </Route>
                <Route exact path='/new_transactions'>
                    <NewTransaction />
                </Route>
                <Route exact path='/staffs'>
                    <AllStaff />
                </Route>
                <Route exact path='/update._{user.id}'>
                    <UpdateStaffs />
                </Route>
                <Route path='/update_transactions'>
                    <UpdateTransaction />
                </Route>
                <Route path='staffview'>
                    <AllStaff />
                </Route>
                <Route path='/Pages'>
                    <Text />
                </Route>
                <Route path='/newPages'>
                    <NewText />
                </Route>
                <Route path='/dashboard'>
                    <MgtView />
                </Route>
                <Route path='/ing'>
                    <Testing />
                </Route>
            </Switch>
        </React.Fragment>
    );
};