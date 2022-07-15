import { useReducer, useEffect } from "react";
import TitleContext from "./TitleContext";
import TitleReducer from "./TitleReducer";
import {ADD_TITLE}from './Types'

const TitleState = ({ children }) => {
    const initalState = {
      showTitle: true,
      cartTitle: JSON.parse(localStorage.getItem('title')) || "Current Guarantee Portfolio",
    };
  
    const [state, dispatch] = useReducer(TitleReducer, initalState);
  
    const addTitle = (title) => {
      dispatch({ type: ADD_TITLE, payload: title });
    };
  
   

    useEffect(() => {
      localStorage.setItem("title", JSON.stringify(state.cartTitle));
    }, [state.cartTitle]);
  
  
    return (
      <TitleContext.Provider
        value={{
          showTitle: state.showTitle,
          cartTitle: state.cartTitle,
          addTitle,
        }}
      >
        {children}
      </TitleContext.Provider>
    );
  };
  

export default TitleState