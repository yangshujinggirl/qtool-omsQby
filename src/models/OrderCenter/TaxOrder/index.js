import {call,put,takeEvery} from 'redux-saga/effects'
import {GetListsApi} from 'api/home/OrderCenter/TaxOrder'

function* getTableList(action){
    const params = action.payload;
    const res = yield call(GetListsApi,params)
    const {resultList,everyPage,currentPage,totalCount} = res.result;
    yield put({
        type:'SALE_TABLELIST',
        payload:{
            tableLists:resultList,
            everyPage,
            currentPage,
            totalCount
        }
    })
}
export default function* rootSaga(){
    yield takeEvery('taxOrder/fetchList',getTableList);
}
