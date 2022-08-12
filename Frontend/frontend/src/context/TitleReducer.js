import { ADD_TITLE,ADD_Guarantees,ADD_PIPELINE_REPORT } from "./Types";

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
    case ADD_PIPELINE_REPORT:{
      return{
        ...state,
        reportStore:[action.payload],
      };
    }
    

    default:
      return state;
  }
};

export default TitleReducer;
