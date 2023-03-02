import "bootstrap-icons/font/bootstrap-icons.css";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from 'react-router-dom'
// import CartState from './context/cart/CartState';
import TitleState from './context/TitleState'
import CartState from './context/cart/CartState'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// import {Provider} from 'react-redux'
// import {store} from './store/store'

/**
 * Import Provider hook from react-redux
 * import store from store folder 
 */
 const queryClient = new QueryClient()

ReactDOM.render( 
    <QueryClientProvider client={queryClient}>
        <Router>
        <TitleState>
            <CartState>
        <App />
        </CartState>
        </TitleState>
    </Router>
     </QueryClientProvider>
    
    ,

    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();