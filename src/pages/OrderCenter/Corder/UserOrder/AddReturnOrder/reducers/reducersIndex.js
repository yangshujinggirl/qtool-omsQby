const initState = {
  selectedRows: [],
  expressStatus:'',
  selectedRowKeys:[],
  parentId:''
};
const index = (state = initState, action) => {
  switch (action.type) {
    case "SET_SELECTEDROWS":
      return {
        ...state,
        selectedRows: action.payload,
      };
    case "SET_SELECTEDROWKEYS":
      return {
        ...state,
        selectedRowKeys: action.payload,
      };
    case "SET_PARENTID":
      return {
        ...state,
        parentId: action.payload,
      };
    case "SET_EXPRESSSTATUS":
      return {
        ...state,
        expressStatus: action.payload,
      };
    default:
      return state;
  }
};
export default index;
