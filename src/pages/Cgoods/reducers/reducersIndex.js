const initialState = {
  loading: false,
  goodLists: [],
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
    case "CGOODS_TABLELIST":
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
