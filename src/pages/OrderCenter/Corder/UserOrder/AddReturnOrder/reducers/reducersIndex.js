const initState = {
  selectedRows: []
};
const index = (state = initState, action) => {
  switch (action.type) {
    case "SET_SELECTEDROWS":
      return {
        ...state,
        selectedRows:action.payload
      };
    default:
      return state;
  }
};
export default index
