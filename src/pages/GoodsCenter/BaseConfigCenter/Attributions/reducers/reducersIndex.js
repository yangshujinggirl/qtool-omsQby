const initialState = {
  loading: false,
  atrLists: [],
  error: "",
  everyPage:15,
  currentPage:1,
  total:0
};
const index = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...state,
        loading: true
      };
    case "ATTRIBUTION_TABLELIST":
      return { 
        ...state,
        loading: false,
        ...action.payload
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
