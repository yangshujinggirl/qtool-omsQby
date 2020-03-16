const index = (state = {
  loading: false,
  totalData:{isSave:true},
  allGoods:[],
  goodsList:[],//商品数据
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
    case "SET_LOADING":
      return {...state,...action.payload}
    default:
      return state
  }
};
export default index;
