const initialState = {
  loading: false,
  brandLists: [],
  error: "",
  everyPage:15,
  currentPage:1,
  totalCount:0
};
const index = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...state,
        loading: true
      };
    case "FETCH_SUCCESS":
      return { 
        ...state,
        loading: false,
        brandLists: action.resultList,
        totalCount:action.totalCount,
        everyPage:action.everyPage,
        currentPage:action.currentPage
      };
    case "FETCH_FAIL":
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state
  }
};
export default index;
