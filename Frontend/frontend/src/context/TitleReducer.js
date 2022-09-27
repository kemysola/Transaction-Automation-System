import { ADD_TITLE,ADD_Guarantees,ADD_PIPELINE_REPORT ,
  ADD_PROGRESS_HEADER,ADD_TABLE_HEADER,ADD_KEY_STATS,ADD_GUARANTEE_TARGET,
  ADD_PROGRESS_BODY,ADD_GUA_PIPELINE_YEAR,ADD_REPORT_ACT_YEAR,
  ADD_NBC_Submissions,
  ADD_Structuring_Developments} from "./Types";

const TitleReducer = (state, action) => {
  switch (action.type) {
    
    case ADD_TITLE: {
      return {
        ...state,
        cartTitle: [action.payload],
      };
    }
    case ADD_Structuring_Developments:{
      return{
        ...state,
        structuringDev:[action.payload],
      }
    }
    case ADD_NBC_Submissions:{
      return{
        ...state,
        nbcSubmissionStore:[action.payload],
      }
    }
    case ADD_REPORT_ACT_YEAR:{
      return{
        ...state,
        reportYearStore:[action.payload],
      }
    }
    case ADD_Guarantees:{
      return{
        ...state,
        guaranteeStore:[action.payload],
      }
    }
    case ADD_GUA_PIPELINE_YEAR:{
      return{
        ...state,
        guarPipelineYear:[action.payload],
      }
    }
    case ADD_GUARANTEE_TARGET:{
      return{
        ...state,
        guaranteeTargetStore:[action.payload],
      }
    }
    case ADD_PROGRESS_BODY:{
      return{
        ...state,
        progressBodyStore:[action.payload],
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
    case ADD_KEY_STATS:{
      return{
        ...state,
        keyTitleStore:[action.payload]
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
