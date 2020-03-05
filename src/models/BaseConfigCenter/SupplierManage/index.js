import {call,put,takeEvery} from 'redux-saga/effects'
import {GetListApi} from 'api/home/BaseConfigCenter/SupplierManage'

function* getTableList(action){
    const params = action.payload;
    const res = yield call(GetListApi,params);
    const {resultList,everyPage,totalCount,currentPage} = res.result;
    resultList&&resultList.map(item=>{
        item.key = item.id;
    })
    yield put({
        type:'GET_TABLELIST',
        payload:{
            everyPage,
            tableLists:resultList,
            totalCount,
            currentPage
        }
    })
}
export default  function* rootSaga(){   
    yield takeEvery('supplierManage/fetchList',getTableList)
}