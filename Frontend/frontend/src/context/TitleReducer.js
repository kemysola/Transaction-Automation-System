import { ADD_TITLE } from "./Types";

const TitleReducer = (state, action) => {
  switch (action.type) {
    
    case ADD_TITLE: {
      return {
        ...state,
        cartTitle: [action.payload],
      };
    }
    

    default:
      return state;
  }
};

export default TitleReducer;
