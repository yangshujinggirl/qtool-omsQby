import { all,call, put, take, takeEvery, fork, select } from 'redux-saga/effects'
import {
  GetEditInfoApi,
  GetCategoryApi,
} from "api/home/BaseGoods";
import { CommonUtils } from 'utils';

//属性--商品
function* getSpec({payload:{ specData }}){
  yield put({
    type: 'BASEGOODSADD_SPEC',
    payload: { specData }
  })
}
//loading
function* getLoad({payload: loading }){
  yield put({
    type: 'SET_LOADING',
    payload: {loading}
  })
}
//列表--商品
function* getListState({payload:{ goodsList }}){
  yield put({
    type: 'BASEGOODSADD_GOODSLIST',
    payload: { goodsList }
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
//fetch 详情
function* fetchTotal(action){
  let params = action.payload;
  yield call(getLoad,{payload:true})
  const res = yield call(GetEditInfoApi,params);
  let { result } =res;
  let { categoryDetail, attrList, list, ...pdSpu } =result;
  pdSpu={ ...pdSpu, ...categoryDetail };
  if(attrList) {
    attrList.map((el) =>{
      el.attributeValueList = el.attributeValueList&&el.attributeValueList.map((item,index)=>{
        let stem = {};
        stem.key=index;
        stem.disabled=true;
        stem.name=item;
        return stem;
      })
    })
    let specOne = attrList[0].attributeValueList
    let specTwo = attrList[1]?attrList[1].attributeValueList:[];
    pdSpu.pdType1Id = attrList[0].attributeId;
    pdSpu.pdType2Id = attrList[1]?attrList[1].attributeId:'';
    yield call(getSpec,{payload:{specData:{ specOne, specTwo }}});
    yield call(getLoad,{payload:false})
  }
  list&&list.map((el)=>el.key=el.skuCode);
  pdSpu = CommonUtils.clearEmptyObj(pdSpu);
  yield call(getTotalState,{payload:pdSpu})
  yield call(getListState,{payload:{goodsList:list}});
  // const [levelTwo,levelThr,levelFour] = yield all([
  //   call(GetCategoryApi,{level:'2',parentId:categoryDetail.categoryId}),
  //   call(GetCategoryApi,{level:'3',parentId:categoryDetail.categoryId2}),
  //   call(GetCategoryApi,{level:'4',parentId:categoryDetail.categoryId3}),
  // ])
  // const categoryData = yield select(state => state.BaseGoodsAddReducers.categoryData);
  // yield put({
  //   type: 'BASEGOODSADD_CATEGORY',
  //   payload: {
  //     categoryData:{
  //       categoryLevelOne:categoryData.categoryLevelOne,
  //       categoryLevelTwo:levelTwo.result?levelTwo.result:[],
  //       categoryLevelThr:levelThr.result?levelThr.result:[],
  //       categoryLevelFour:levelFour.result?levelFour.result:[],
  //       isLevelTwo:false,
  //       isLevelThr:false,
  //       isLevelFour:false
  //     }
  //   }
  // })
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
function* resetPages(action){
  let data = {
    loading: false,
    totalData:{isSave:true},
    goodsList:[],
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
  yield takeEvery('baseGoodsAdd/getListState', getListState)
  yield takeEvery('baseGoodsAdd/fetchCategory', fetchCategory)
  yield takeEvery('baseGoodsAdd/resetPage', resetPages)
  yield takeEvery('baseGoodsAdd/getSpec', getSpec)
}
