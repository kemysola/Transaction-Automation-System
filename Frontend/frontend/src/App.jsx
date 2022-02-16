import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react';
import { Switch,Route, useLocation } from 'react-router-dom';
import Main from './Components/Auth/MainPage/Main';
import Landing from './Components/LandingPage/Landing'

/*import StaffView from './Components/Staffs/StaffView';
import Main from './Components/Auth/MainPage/Main';
import UpdateStaffs from './Components/Staffs/UpdateStaffs';
import TransactionCards from './Components/Transactions/TransactionCards';
import NewTransactions from './Components/Transactions/NewTransactions';
import TransactionView from './Components/Transactions/TransactionView'
import NewStaffs from './Components/Staffs/NewStaff';
import StaffDatabase from './Components/Staffs/StaffDatabase';
import AllStaff from './Pages/Staffs/AllStaff';
import UpdateStaff from './Pages/Staffs/UpdateStaff';
import NewTransaction from './Pages/Transactions/NewTransaction';
import UpdateTransaction from './Pages/Transactions/UpdateTransaction';
//import './App.css'

import styled from 'styled-components';
import Landing from './Components/LandingPage/Main/Landing'

/*const BodyContainer = styled.div`
margin:-0.22px;
height:auto;
min-height:100vh;
background: #eff1f1;
overflow:hidden;
width:auto;
`
*/
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
                        <Route path='/reset'>
                            
                        </Route>
                        </Switch>
        </React.Fragment>
    ) 
    
}