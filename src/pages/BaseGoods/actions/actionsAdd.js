import {
  GetBrandApi, GetEditInfoApi,
  GetCategoryApi, GetAttributeApi
 } from "../../../api/home/BaseGoods";
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
    totalData:{}
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
export const fetchTotalData = value => {
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
        GetCategoryApi({level:'-1',parentId:omsCategoryPropertyDto.categoryId}),
        GetCategoryApi({level:'-1',parentId:omsCategoryPropertyDto.secondCategoryId}),
        GetCategoryApi({level:'-1',parentId:omsCategoryPropertyDto.thirdCategoryId})
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
      fetchAttributeData({categoryId:omsCategoryPropertyDto.fourCategoryId})(dispatch);
    },err=> {
      dispatch(fetchFailed(err));
    })
  };
};
//查询分类
export const fetchCategoryData = value => {
  return dispatch=> {
    dispatch(fetchStart());
    GetCategoryApi(value)
    .then((res) => {
      let { result } =res;
      result&&result.length>0&&result.map((el)=>el.key =el.id);
      dispatch(fetchSuccess({ categoryLevelOne: result }));
    },err=> {
      dispatch(fetchFailed(err));
    })
  }
};
//查询规格
export const fetchAttributeData = value => {
  return dispatch=> {
    dispatch(fetchStart())
    GetAttributeApi(value)
    .then((res) => {
      let { result } =res;
      result&&result.length>0&&result.map((el)=>el.key =el.id);
      dispatch(fetchSuccess({ AttributeList: result }));
    },err=> {
      dispatch(fetchFailed(err));
    })
  }
};
export const fetchbrandList = value => {
  return dispatch => {
    dispatch(fetchStart());
    GetBrandApi({brandName:value})
    .then(res => {
      const { result } =res;
      let brandDataSource = result.map((el)=>{
        let item={}
        item.key =el.id;
        item.value =el.id;
        item.brandCountry =el.brandCountry;
        item.text =el.brandNameCn;
        return item;
      })
      dispatch(fetchSuccess({ brandDataSource }));
    },err => {
      dispatch(fetchFailed(err));
    });
  };
};
