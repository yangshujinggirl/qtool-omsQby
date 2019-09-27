const index = (state = {
  loading: false,
  brandDataSource:[],
  totalData:{}
}, action) => {
  console.log(action)
  switch (action.type) {
    case "T.FETCH_START":
      return {
        ...state,
        loading: true
      };
    case "T.FETCH_SUCCESS":
      return { ...state,loading: false,...action };
    case "T.FETCH_FAIL":
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case "SET_LOADING":
      return {...state,...action}
    case "RESET_DATA":
      return {...state,...action}
    default:
      return state
  }
};
export default index;
