const index = (state = {
  loading: false,
  totalData:{isSave:true,pdType1Id:'0',pdType2Id:'0',minBoxSpecification:"1",procurementTarget:1},
  allGoods:[],
  goodsList:[{key:'0/0'}],//商品数据
  specData:{
    specOne:[],
    specTwo:[],
  },
}, action) => {
  switch (action.type) {
    case "BASEGOODSADD_SPEC":
      return { ...state,loading: false,...action.payload };
    case "BASEGOODSADD_GOODSLIST":
      return { ...state,loading: false,...action.payload };
    case "BASEGOODSADD_TOTALDATA":
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
