import {
  GetBrandApi, GetEditInfoApi,
  GetCategoryApi, GetAttributeApi,
  GetSupplierApi
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
      const { level } =value;
      let categoryKey, categoryLevelOne, categoryLevelTwo, categoryLevelThr, categoryLevelFour, isLevelTwo,isLevelThr,isLevelFour;
      switch(level) {
        case 1:
          categoryKey='categoryLevelOne';
          isLevelTwo=true;
          isLevelThr=true;
          isLevelFour=true;
          break;
        case 2:
          categoryKey='categoryLevelTwo';
          isLevelTwo=false;
          isLevelThr=true;
          isLevelFour=true;
          break;
        case 3:
          categoryKey='categoryLevelThr';
          isLevelTwo=false;
          isLevelThr=false;
          isLevelFour=true;
          break;
        case 4:
          categoryKey='categoryLevelFour';
          isLevelTwo=false;
          isLevelThr=false;
          isLevelFour=false;
          break;
      }
      dispatch(fetchSuccess({ [categoryKey]: result,isLevelTwo, isLevelThr, isLevelFour }));
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
export const fetchSupplier = value => {
  return dispatch => {
    dispatch(fetchStart());
    GetSupplierApi()
    .then(res => {
      const { result } =res;
      result.map((el)=>el.key=el.id);
      dispatch(fetchSuccess({ supplierList: result}));
    },err => {
      dispatch(fetchFailed(err));
    });
  };
};
