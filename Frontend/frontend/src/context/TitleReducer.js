import { ADD_TITLE,ADD_Guarantees } from "./Types";

const TitleReducer = (state, action) => {
  switch (action.type) {
    
    case ADD_TITLE: {
      return {
        ...state,
        cartTitle: [action.payload],
      };
    }
    case ADD_Guarantees:{
      return{
        ...state,
        guaranteeStore:[action.payload],
      }
    }
    

    default:
      return state;
  }
};

export default TitleReducer;
