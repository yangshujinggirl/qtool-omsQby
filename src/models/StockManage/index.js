import {call,put,takeEvery} from 'redux-saga/effects'
import {GetListsApi} from 'api/home/StockManage'

function* getTableList(action){
    const params = action.payload;
    const res = yield call(GetListsApi,params);
    const {resultList,everyPage,currentPage,totalCount} = res.result;
    resultList&&resultList.map(item=>{
        item.key = item.id
    });
    yield put({
        type:'STOCK_MANAGE_TABLELIST',
        payload:{
            tableLists:resultList,
            everyPage,
            currentPage,
            totalCount
        }
    })
}
export default function* rootSaga(){
    yield takeEvery('stockManage/fetchList',getTableList)
}