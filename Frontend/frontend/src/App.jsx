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
//import NewTransactions from './Components/Transactions/NewTransactions';
import StaffDatabase from './Components/Staffs/StaffDatabase';
import UpdateStaff from './Pages/Staffs/UpdateStaff';
import UpdateTransaction from './Pages/Transactions/UpdateTransaction';
import NewTransaction from './Pages/Transactions/NewTransaction';
import {useHistory, Redirect} from 'react-router-dom';
import Text from './Pages/Transactions/Text';
import NewText from './Pages/Transactions/NewText';
import AllStaff from './Pages/Staffs/AllStaff';
import './App.css';



export default function App() {
   const history = useHistory()
    useEffect(() =>{
        window.location.href='https://login.windows.net'
    
       
   }, [])
    return (
        <React.Fragment>
            <Switch>
                <Route exact path="/login">
                    <Main/>
                </Route>
                <Route path='/landing'>
                    <Landing/>
                </Route>
                <Route exact path='/transaction'>
                    <TransactionView/>
                </Route>
                <Route exact path='/staff_.id?user'>
                    <StaffView/>
                </Route>
                <Route exact path='/new_transactions'>
                    <NewTransaction/>
                </Route>
                <Route exact path='/staffs?admin'>
                    <StaffDatabase/>
                </Route>
                <Route exact path='/update._{user.id}'>
                    <UpdateStaffs/>
                </Route>
                <Route path='/update_transactions'>
                    <UpdateTransaction/>
                </Route>
                <Route path='all_staffs'>
                    <AllStaff/>
                </Route>
                <Route path='/Pages'>
                  <Text/>
                </Route>
                <Route path='/newPages'>
                  <NewText/>
                </Route>
            </Switch>
        </React.Fragment>
    ) 
    
}