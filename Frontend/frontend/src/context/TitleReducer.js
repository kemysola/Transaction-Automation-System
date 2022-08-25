import { ADD_TITLE,ADD_Guarantees,ADD_PIPELINE_REPORT ,ADD_PROGRESS_HEADER,ADD_TABLE_HEADER} from "./Types";

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
    case ADD_PROGRESS_HEADER:{
      return{
        ...state,
        progressHeaderStore:[action.payload]
      }
    }
    case ADD_TABLE_HEADER:{
      return{
        ...state,
        tableStore:[action.payload]
      }
    }

    default:
      return state;
  }
};

export default TitleReducer;
