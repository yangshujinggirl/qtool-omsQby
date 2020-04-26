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
};
function* resetPages(action){
  let data = {
    loading: false,
    totalData:{isSave:true,pdType1Id:'0',pdType2Id:'0',minBoxSpecification:'1',procurementTarget:1},
    goodsList:[{key:'0/0'}],
    specData:{
      specOne:[],
      specTwo:[],
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
  yield takeEvery('baseGoodsAdd/resetPage', resetPages)
  yield takeEvery('baseGoodsAdd/getSpec', getSpec)
}
