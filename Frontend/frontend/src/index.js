import "bootstrap-icons/font/bootstrap-icons.css";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from 'react-router-dom'
// import CartState from './context/cart/CartState';
import TitleState from './context/TitleState'
import {Provider} from 'react-redux'
import {store} from './store/store'

ReactDOM.render( 
    <Provider store={store}>
        <Router>
        {/* <TitleState> */}
        <App />

        {/* </TitleState> */}
    </Router>
    </Provider>
    
    ,

    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();