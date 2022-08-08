import { useReducer, useEffect } from "react";
import TitleContext from "./TitleContext";
import TitleReducer from "./TitleReducer";
import {ADD_TITLE, ADD_Guarantees}from './Types'

const TitleState = ({ children }) => {
    const initalState = {
      showTitle: true,
      cartTitle: JSON.parse(localStorage.getItem('title')) || "Current Guarantee Portfolio",
      guaranteeStore: JSON.parse(localStorage.getItem('titles')) || " Gross guarantee fee income is based on total guarantee guarantees issued since inception of 77 6 Billion through 31 December 2021 In FY 2021 a total of N 34 1 in guarantee transactions have reached  financial close The pipeline of active mandates comprises",

    };
  
    const [state, dispatch] = useReducer(TitleReducer, initalState);
  
    const addTitle = (title) => {
      dispatch({ type: ADD_TITLE, payload: title });
    };
    const addGuarantees = (guar) => {
      dispatch({ type: ADD_Guarantees, payload: guar});
    };
  
   

    useEffect(() => {
      localStorage.setItem("title", JSON.stringify(state.cartTitle));
    }, [state.cartTitle]);
  
    useEffect(() => {
      localStorage.setItem("titles", JSON.stringify(state.guaranteeStore));
    }, [state.guaranteeStore]);
  
  
    return (
      <TitleContext.Provider
        value={{
          showTitle: state.showTitle,
          cartTitle: state.cartTitle,
          guaranteeStore:state.guaranteeStore,
          addGuarantees,
          addTitle,
        }}
      >
        {children}
      </TitleContext.Provider>
    );
  };
  

export default TitleState