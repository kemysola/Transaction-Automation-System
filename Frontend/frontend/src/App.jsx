import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import StaffView from './Components/Staffs/StaffView';
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
import './App.css'

import styled from 'styled-components';

const BodyContainer = styled.div`
margin:-0.22px;
height:auto;
min-height:100vh;
background: #eff1f1;
overflow:hidden;
width:auto;
`

export default function App() {
//     {/*const [initialState, setInitialState] = useState();

//     useEffect(() => {
//   fetch('https://login.windows.net').then(res => {
//       return res.json()
//   }).then(jsonResponse => setInitialState(jsonResponse))
//     },[])*/}

    return (
        <BodyContainer>
        <React.Fragment>
            {/* <NewStaffs/> */}
            {/* <StaffView /> */}

            {/* <TransactionView /> */}
            <NewTransaction />
            {/* <UpdateTransaction /> */}
            {/*<UpdateTransaction />*/}
            
        </React.Fragment>
        </BodyContainer>
    ) 
    
}