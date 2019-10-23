import {call,put,takeEvery} from 'redux-saga/effects'
import {GetListsApi} from 'api/home/StoreHouse'

function* getTableList(action){
    let params = action.payload;
    const res = yield call(GetListsApi,params)
    let {resultList,everyPage,currentPage,totalCount} = res.result
    resultList && resultList.map(item=>{
        item.key = item.id
    });
    yield put({
        type:'STORE_HOUSE_TABLELIST',
        payload:{
            tableLists:resultList,
            everyPage,
            totalCount,
            currentPage
        }
    })
}
export default function* rootSagas(){
    yield takeEvery('storeHouse/fetchList',getTableList)
}