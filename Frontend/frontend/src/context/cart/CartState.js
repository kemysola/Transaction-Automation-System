import { useReducer, useEffect } from "react";
import CartContext from "./CartContext";
import CartReducer from "./CartReducer";
import {SHOW_HIDE_CART, ADD_TO_CART, REMOVE_ITEM}from './Types'

const CartState = ({ children }) => {
    const initalState = {
      showCart: false,
      cartItems: JSON.parse(localStorage.getItem('items')) || [],
    };
  
    const [state, dispatch] = useReducer(CartReducer, initalState);
  
    const addToCart = (item) => {
      dispatch({ type: ADD_TO_CART, payload: item });
    };
  
    const showHideCart = () => {
      dispatch({ type: SHOW_HIDE_CART });
    };
  
    const removeItem = (id) => {
      dispatch({ type: REMOVE_ITEM, payload: id });
    };

    useEffect(() => {
      localStorage.setItem("items", JSON.stringify(state.cartItems));
    }, [state.cartItems]);
  
  
    return (
      <CartContext.Provider
        value={{
          showCart: state.showCart,
          cartItems: state.cartItems,
          addToCart,
          showHideCart,
          removeItem,
        }}
      >
        {children}
      </CartContext.Provider>
    );
  };
  

export default CartState