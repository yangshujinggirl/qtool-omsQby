import { call, put, take, fork } from 'redux-saga/effects'
// import * as types from '../../action_type'
// import { lists } from '../../actions/server';
import { GoAuditApi } from "api/home/BaseGoods";

// const { GETLIST, TABS_UPDATE, START_FETCH, FETCH_ERROR, FETCH_END } = types

//----worker saga

function* getTabsList (tabs, rule, env) {
  yield put({ type: START_FETCH })
  try {
    return yield call(lists, tabs, rule, env)
  } catch (err) {
    yield put({ type: FETCH_ERROR,err})
  } finally {
    yield put({ type: FETCH_END })
  }
}

//-----watcher saga

export default function* getTabsListFlow() {
  const { code, data } = yield call(GoAuditApi,{value:1})
  yield put({ type: 'TABS_UPDATE', data, code })
}
import {
  GetBrandApi, GetEditInfoApi,
  GetCategoryApi, GetAttributeApi,
  GetSupplierApi
 } from "../../api/home/BaseGoods";
/**
 * 请求开始的请求
 */
function fetchStart() {
  return {
    type: "T.FETCH_START",
    time: Date.now()
  };
}
/**
 * 请求成功
 * @param {*} data
 */
function fetchSuccess(data) {
  return {
    type: "T.FETCH_SUCCESS",
    ...data,
    time: Date.now()
  };
}
/**
 * 请求失败
 * @param {*} error
 */
function fetchFailed(error) {
  return {
    type: "T.FETCH_FAIL",
    error,
    time: Date.now()
  };
}
//请求设置loading
function setload(data) {
  return {
    type: 'T.SET_LOADING',
    ...data,
    time: Date.now()
  }
}
/*-----------------首页公共action----------------------------------*/
//设置loading
export const setLoading =(loading)=> {
  return (dispatch) => {
    dispatch({
      type: 'T.SET_LOADING',
      loading,
      time: Date.now()
    })
    // dispatch(setload({ loading }))
  }
}
//重置数据
export const resetPages =()=> {
  let data = {
    loading: false,
    brandDataSource:[],
    totalData:{},
    supplierList:[],
    AttributeList:[],//规格
    categoryLevelOne:[],
    categoryLevelTwo:[],
    categoryLevelThr:[],
    categoryLevelFour:[],
    isLevelTwo:true,
    isLevelThr:true,
    isLevelFour:true
  }
  return (dispatch) => {
    dispatch(fetchSuccess(data));
  }
}
export const setData = value => {
  return dispatch => {
    dispatch(fetchSuccess(value));
  };
};
//详情
export  function* fetchTotalData(value){
  return dispatch => {
    dispatch(fetchStart());
    GetEditInfoApi(value)
    .then((res) => {
      let { result } =res;
      let { omsCategoryPropertyDto } =result;
      result={...result,...omsCategoryPropertyDto}
      dispatch(fetchSuccess({
        totalData:result,
      }));
      //分类列表
      Promise.all([
        GetCategoryApi({level:'2',parentId:omsCategoryPropertyDto.categoryId}),
        GetCategoryApi({level:'3',parentId:omsCategoryPropertyDto.secondCategoryId}),
        GetCategoryApi({level:'4',parentId:omsCategoryPropertyDto.thirdCategoryId})
      ]).then((values)=> {
        let [levelTwo,levelThr,levelFour] = values;
        dispatch(fetchSuccess({
            categoryLevelTwo:levelTwo.result,
            categoryLevelThr:levelThr.result,
            categoryLevelFour:levelFour.result,
            isLevelTwo:false,
            isLevelThr:false,
            isLevelFour:false
        }));
      })
      //规格列表
    },err=> {
      dispatch(fetchFailed(err));
    })
  };
};
