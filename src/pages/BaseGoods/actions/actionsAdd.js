import { GetBrandApi } from "../../../api/home/BaseGoods";
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
  (data.resultList || []).map(item => {
    item.key = item.id;
    item.list.map((subItem, index) => (subItem.key = index));
  });
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
//设置loading
export const resetPages =()=> {
  let data = {
    loading: false,
    brandDataSource:[],
    totalData:{}
  }
  return (dispatch) => {
    dispatch({
      type: 'RESET_DATA',
      ...data,
      time: Date.now()
    })
    // dispatch(setload({ loading }))
  }
}
export const getbrandList = value => {
  return dispatch => {
    dispatch(fetchStart());
    GetBrandApi({brandName:value})
    .then(res => {
      const { result } =res;
      let brandDataSource = result.map((el)=>{
        let item={}
        item.key =el.id;
        item.value =el.id;
        item.text =el.brandCountry;
        return item;
      })
      dispatch(fetchSuccess({ brandDataSource }));
    },err => {
      dispatch(fetchFailed(err));
    });
  };
};
