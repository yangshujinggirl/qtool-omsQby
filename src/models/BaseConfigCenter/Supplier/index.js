import {call,put,takeEvery} from 'redux-saga/effects'
import {GetListsApi} from 'api/home/BaseConfigCenter/Supplier'

function* getTableList(action){
    let params = action.payload;
    const res = yield call(GetListsApi,params)
    let {resultList,everyPage,currentPage,totalCount} = res.result
    resultList && resultList.map(item=>{
        item.key = item.id
    });
    yield put({
        type:'GET_TABLELIST',
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