import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react';
import { Switch,Route, useLocation } from 'react-router-dom';
import Main from './Components/Auth/MainPage/Main';
import Landing from './Components/LandingPage/Landing'
import  UserLogin from './Components/Auth/Login/UserLogin'
import  UserForm from './Components/Auth/Login/UserLogin'
import TransactionView from './Components/Transactions/TransactionView'
import UpdateStaffs from './Components/Staffs/UpdateStaffs';
import StaffView from './Components/Staffs/StaffView';
import NewTransactions from './Components/Transactions/NewTransactions';
import StaffDatabase from './Components/Staffs/StaffDatabase';
import UpdateStaff from './Pages/Staffs/UpdateStaff';
import NewTransaction from './Pages/Transactions/NewTransaction';
import UpdateTransaction from './Pages/Transactions/UpdateTransaction';
import AllStaff from './Pages/Staffs/AllStaff';



export default function App() {
    return (
        <React.Fragment>
                        <Switch>
                        <Route exact path="/">
                            <Main/>
                        </Route>
                        <Route path='/landing'>
                            <Landing/>
                        </Route>
                        <Route exact path ='/login'>
                            <UserForm/>
                        </Route>
                        <Route exact path='/transaction?id'>
                            <TransactionView/>
                        </Route>
                        <Route exact path='/staff_.id?user'>
                            <StaffView/>
                        </Route>
                        <Route exact path='/new_transactions._id?user'>
                            <NewTransactions/>
                        </Route>
                        <Route exact path='/staffs?admin'>
                            <StaffDatabase/>
                        </Route>
                        <Route exact path='/update._{user.id}'>
                            <UpdateStaffs/>
                        </Route>
                        <Route exact path='/update._{user.id}'>
                            <NewTransactions/>
                        </Route>
                        <Route path='/update_transactions?user'>
                            <UpdateTransaction/>
                        </Route>
                        <Route path='all_staffs'>
                            <AllStaff/>
                        </Route>
                        
                        </Switch>
        </React.Fragment>
    ) 
    
}