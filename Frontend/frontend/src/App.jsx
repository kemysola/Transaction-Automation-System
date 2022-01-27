import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import StaffView from './Components/Staffs/StaffView';
import Landing from './Components/LandingPage/Landing';
import Main from './Components/Auth/MainPage/Main';
import UpdateStaffs from './Components/Staffs/UpdateStaffs';
import TransactionCards from './Components/Transactions/TransactionCards';
import NewTransactions from './Components/Transactions/NewTransactions';
import TransactionView from './Components/Transactions/TransactionView'
import './App.css'


export default function App() {
   
    return (
        <React.Fragment>
            <StaffView />
            {/* <Landing /> */}
            {/* <Main /> */}
            {/* <UpdateStaffs /> */}
            {/* <TransactionCards /> */}
            {/* <NewTransactions /> */}
            
        </React.Fragment>
    );
}