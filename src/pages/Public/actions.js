import { GetMenuApi } from '../../api/home/Home';
/**
 * 请求开始的通知
 */
function fetchStart() {
  return {
    type: 'FETCH_START',
    time: Date.now()
  }
}
/**
 * 请求成功的通知
 * @param data 成功后的数据
 */
function fetchSuccess(data) {
  return {
    type: 'FETCH_SUCCESS',
    ...data,
    time: Date.now()
  }
}
/**
 * 请求失败后的通知
 * @param error 异常信息
 */
function fetchFailed(error) {
  return {
    type: 'FETCH_FAILED',
    error,
    time: Date.now()
  }
}
//请求设置loading
function setload(data) {
  return {
    type: 'SET_LOADING',
    ...data,
    time: Date.now()
  }
}
/*-----------------首页公共action----------------------------------*/
//设置loading
export const setLoading =(loading)=> {
  return (dispatch) => {
    dispatch(setload({ loading }))
  }
}

export const getMenuList =(value)=> {
  return (dispatch) => {
    dispatch(fetchStart())
    GetMenuApi(value)
    .then((res) => {
      dispatch(fetchSuccess({ menuList: res.data }))
    },err=> {
      dispatch(fetchFailed(err))
    })
  }
}
//设置菜单，权限
export const setMenuList =(value)=> {
  return (dispatch) => {
    dispatch(fetchStart())
    dispatch(fetchSuccess({ menuList:value.menuList,totalData:value.totalData }))
  }
}
