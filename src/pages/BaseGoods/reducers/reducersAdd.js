const index = (state = {
  loading: false,
  brandDataSource:[],
  totalData:{},
  supplierList:[],
  fileList:[],
  goodsList:[{key:'00'}],//商品数据
  attributeArray:[],//规格列表
  // sizeIdList:{//商品规格id
  //   pdSkusSizeOne:null,
  //   pdSkusSizeTwo:null
  // },
  specData:{
    specOne:[],
    specTwo:[],
  },
  pdSkus:[{key:'00'}],
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
    case "BASEGOODSADD_FILELIST":
      return { ...state,loading: false,...action.payload };
    case "BASEGOODSADD_SPEC":
      return { ...state,loading: false,...action.payload };
    case "BASEGOODSADD_ATTRUBTEARRAY":
      return { ...state,loading: false,...action.payload };
    case "BASEGOODSADD_TOTALDATA":
      return { ...state,loading: false,...action.payload };
    case "BASEGOODSADD_CATEGORY":
      return { ...state,loading: false,...action.payload };
    case "BASEGOODSADD_RESETPAGE":
      return { ...state,loading: false,...action.payload };
    case "BASEGOODSADD_SUPPLIERLIST":
      return { ...state,loading: false,...action.payload };
    case "BASEGOODSADD_BRANDLIST":
      return { ...state,loading: false,...action.payload };
    case "BASEGOODSADD_ATTRIBUTE":
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
