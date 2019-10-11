import { all,call, put, take, takeEvery, fork, select } from 'redux-saga/effects'
import {
  GetBrandApi, GetEditInfoApi,
  GetCategoryApi, GetAttributeApi,
  GetSupplierApi
} from "../../api/home/BaseGoods";

//详情
function* getTotalState(action){
  let totalData={...totalData,...action.payload};
  yield put({
    type: 'BASEGOODSADD_TOTALDATA',
    payload: {totalData}
  })
}
function* fetchTotal(action){
  let params = action.payload;
  const res = yield call(GetEditInfoApi,params);
  let { result } =res;
  let { omsCategoryPropertyDto } =result;
  result={ ...result, ...omsCategoryPropertyDto };
  yield call(getTotalState,{payload:result})
  const [levelTwo,levelThr,levelFour,attributeList] = yield all([
    call(GetCategoryApi,{level:'2',parentId:omsCategoryPropertyDto.categoryId}),
    call(GetCategoryApi,{level:'3',parentId:omsCategoryPropertyDto.secondCategoryId}),
    call(GetCategoryApi,{level:'4',parentId:omsCategoryPropertyDto.thirdCategoryId}),
  ])
  yield call(fetchAttribute,{payload:omsCategoryPropertyDto.fourCategoryId})
  const categoryData = yield select(state => state.BaseGoodsAddReducers.categoryData);
  yield put({
    type: 'BASEGOODSADD_CATEGORY',
    payload: {
      categoryData:{
        categoryLevelOne:categoryData.categoryLevelOne,
        categoryLevelTwo:levelTwo.result,
        categoryLevelThr:levelThr.result,
        categoryLevelFour:levelFour.result,
        isLevelTwo:false,
        isLevelThr:false,
        isLevelFour:false
      }
    }
  })
};
//查询分类
function* fetchCategory(action){
  let params = action.payload;
  const res = yield call(GetCategoryApi,params);
  let { result } =res;
  result&&result.length>0&&result.map((el)=>el.key =el.id);
  const { level, parentId } =params;
  let categoryData = yield select(state => state.BaseGoodsAddReducers.categoryData);
  let totalData = yield select(state => state.BaseGoodsAddReducers.totalData);
  let { categoryLevelOne,categoryLevelTwo,
    categoryLevelThr,categoryLevelFour,
    isLevelTwo,isLevelThr,isLevelFour,attributeList } =categoryData;
  switch(level) {
    case 1:
      categoryLevelOne = result
      isLevelTwo=true;
      isLevelThr=true;
      isLevelFour=true;
      break;
    case 2:
      categoryLevelTwo = result
      isLevelTwo=false;
      isLevelThr=true;
      isLevelFour=true;
      totalData.categoryId=parentId;
      totalData.secondCategoryId=null;
      totalData.thirdCategoryId=null;
      totalData.fourCategoryId=null;
      break;
    case 3:
      categoryLevelThr = result
      isLevelTwo=false;
      isLevelThr=false;
      isLevelFour=true;
      totalData.secondCategoryId=parentId;
      totalData.thirdCategoryId=null;
      totalData.fourCategoryId=null;
      break;
    case 4:
      categoryLevelFour = result
      isLevelTwo=false;
      isLevelThr=false;
      isLevelFour=false;
      totalData.thirdCategoryId=parentId;
      break;
  }
  yield put({
    type: 'BASEGOODSADD_TOTALDATA',
    payload: {totalData}
  })
  yield put({
    type: 'BASEGOODSADD_CATEGORY',
    payload: {
      categoryData:{
        categoryLevelOne,
        categoryLevelTwo,
        categoryLevelThr,
        categoryLevelFour,attributeList,
        isLevelTwo,
        isLevelThr,
        isLevelFour
      }
    }
  })
};
//查询规格
function* fetchAttribute(action){
  let params = action.payload;
  const res = yield call(GetAttributeApi,{categoryId:params});
  let { result } =res;
  result=result?result:[]
  result.length>0&&result.map((el)=>el.key =el.id);
  console.log(result)
  yield put({
    type: 'BASEGOODSADD_ATTRIBUTE',
    payload: {attributeList:result}
  })
};
function* fetchbrandList(action) {
  let params = action.payload;
  const res = yield call(GetBrandApi,params);
  const { result } =res;
  let brandDataSource = result.map((el)=>{
    let item={}
    item.key =el.id;
    item.value =el.id;
    item.brandCountry =el.brandCountry;
    item.text =el.brandNameCn;
    return item;
  })
  yield put({
    type: 'BASEGOODSADD_BRANDLIST',
    payload: {brandDataSource}
  })
};
function* fetchSupplier(action){
  let params = action.payload;
  const res = yield call(GetSupplierApi,params);
  const { result } =res;
  result.map((el)=>el.key=el.id);
  yield put({
    type: 'BASEGOODSADD_SUPPLIERLIST',
    payload: {supplierList:result}
  })
};
function* resetPages(action){
  let data = {
    loading: false,
    brandDataSource:[],
    totalData:{},
    supplierList:[],
    AttributeList:[],//规格
    categoryData:{
      categoryLevelOne:[],
      categoryLevelTwo:[],
      categoryLevelThr:[],
      categoryLevelFour:[],
      attributeList:[],//规格
      isLevelTwo:false,
      isLevelThr:false,
      isLevelFour:false
    },
  }
  yield put({
    type: 'BASEGOODSADD_RESETPAGE',
    payload: data
  })
};

export default function* rootSagas () {
  yield takeEvery('baseGoodsAdd/fetchTotal', fetchTotal)
  yield takeEvery('baseGoodsAdd/getTotalState', getTotalState)
  yield takeEvery('baseGoodsAdd/fetchCategory', fetchCategory)
  yield takeEvery('baseGoodsAdd/fetchSupplier', fetchSupplier)
  yield takeEvery('baseGoodsAdd/fetchbrandList', fetchbrandList)
  yield takeEvery('baseGoodsAdd/fetchAttribute', fetchAttribute)
  yield takeEvery('baseGoodsAdd/resetPage', resetPages)
}
