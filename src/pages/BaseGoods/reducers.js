const initialState = {
  loading: false,
  goodLists: [],
  error: ""
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
        goodLists: action.goodLists
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
