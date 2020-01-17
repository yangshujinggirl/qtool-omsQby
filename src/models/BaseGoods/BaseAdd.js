import { all,call, put, take, takeEvery, fork, select } from 'redux-saga/effects'
import {
  GetBrandApi, GetEditInfoApi,
  GetCategoryApi, GetAttributeApi,
  GetSupplierApi
} from "../../api/home/BaseGoods";

//属性--商品
function* getSpec(action){
  yield put({
    type: 'BASEGOODSADD_SPEC',
    payload: action.payload
  })
}
//图片
function* getFileListState(action){
  yield put({
    type: 'BASEGOODSADD_FILELIST',
    payload: {fileList:action.payload}
  })
}
//详情
function* getTotalState(action){
  let totalData = yield select(state => state.BaseGoodsAddReducers.totalData);
  totalData={...totalData,...action.payload};
  yield put({
    type: 'BASEGOODSADD_TOTALDATA',
    payload: {totalData}
  })
}
function* fetchTotal(action){
  let params = action.payload;
  const res = yield call(GetEditInfoApi,params);
  let { result } =res;
  let { categoryDetail, list } =result;
  result={ ...result, ...categoryDetail };
  yield call(getTotalState,{payload:result})
  const [levelTwo,levelThr,levelFour] = yield all([
    call(GetCategoryApi,{level:'2',parentId:categoryDetail.categoryId}),
    call(GetCategoryApi,{level:'3',parentId:categoryDetail.categoryId2}),
    call(GetCategoryApi,{level:'4',parentId:categoryDetail.categoryId3}),
  ])
  const categoryData = yield select(state => state.BaseGoodsAddReducers.categoryData);
  yield put({
    type: 'BASEGOODSADD_CATEGORY',
    payload: {
      categoryData:{
        categoryLevelOne:categoryData.categoryLevelOne,
        categoryLevelTwo:levelTwo.result?levelTwo.result:[],
        categoryLevelThr:levelThr.result?levelThr.result:[],
        categoryLevelFour:levelFour.result?levelFour.result:[],
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
  result=result?result:[]
  result.length>0&&result.map((el)=>el.key =el.id);
  const { level, parentId } =params;
  let categoryData = yield select(state => state.BaseGoodsAddReducers.categoryData);
  let totalData = yield select(state => state.BaseGoodsAddReducers.totalData);
  let { categoryLevelOne,categoryLevelTwo,
    categoryLevelThr,categoryLevelFour,
    isLevelTwo,isLevelThr,isLevelFour } =categoryData;
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
      totalData.categoryCode = parentId;
      totalData.categoryCode2=undefined;
      totalData.categoryCode3=undefined;
      totalData.categoryCode4=undefined;
      break;
    case 3:
      categoryLevelThr = result
      isLevelTwo=false;
      isLevelThr=false;
      isLevelFour=true;
      totalData.categoryCode2 = parentId;
      totalData.categoryCode3=undefined;
      totalData.categoryCode4=undefined;
      break;
    case 4:
      totalData.categoryCode3 = parentId;
      categoryLevelFour = result
      isLevelTwo=false;
      isLevelThr=false;
      isLevelFour=false;
      break;
  }
  // console.log('action')
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
        categoryLevelFour,
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
  const res = yield call(GetAttributeApi);
  let { result } =res;
  result=result?result:[]
  result.length>0&&result.map((el)=>el.key =el.attributeId);
  // console.log('action')
  yield put({
    type: 'BASEGOODSADD_ATTRUBTEARRAY',
    payload: {attributeArray:result}
  })
};
function* fetchbrandList(action) {
  let params = action.payload;
  const res = yield call(GetBrandApi,params);
  let { result } =res;
  result=result?result:[]
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
    attrubteArray:[],//规格
    goodsList:[{key:'00'}],
    specData:{
      specOne:[],
      specTwo:[],
    },
    categoryData:{
      categoryLevelOne:[],
      categoryLevelTwo:[],
      categoryLevelThr:[],
      categoryLevelFour:[],
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
  yield takeEvery('baseGoodsAdd/getFileList', getFileListState)
  yield takeEvery('baseGoodsAdd/getSpec', getSpec)
}
