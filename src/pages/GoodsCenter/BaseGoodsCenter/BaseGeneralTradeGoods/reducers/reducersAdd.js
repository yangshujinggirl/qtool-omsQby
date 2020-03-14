const index = (state = {
  loading: false,
  totalData:{isSave:true},
  allGoods:[],
  goodsList:[{key:'00'}],//商品数据
  specData:{
    specOne:[],
    specTwo:[],
  },
  categoryData:{
    categoryLevelOne:[],
    categoryLevelTwo:[],
    categoryLevelThr:[],
    categoryLevelFour:[],
    isLevelTwo:true,
    isLevelThr:true,
    isLevelFour:true
  },
}, action) => {
  switch (action.type) {
    case "T.FETCH_START":
      return {
        ...state,
        loading: true
      };
    case "BASEGOODSADD_SPEC":
      return { ...state,loading: false,...action.payload };
    case "BASEGOODSADD_GOODSLIST":
      return { ...state,loading: false,...action.payload };
    case "BASEGOODSADD_TOTALDATA":
      return { ...state,loading: false,...action.payload };
    case "BASEGOODSADD_CATEGORY":
      return { ...state,loading: false,...action.payload };
    case "BASEGOODSADD_RESETPAGE":
      return { ...state,loading: false,...action.payload };
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
