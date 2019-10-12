import {call,put,takeEvery} from 'redux-saga/effects'
import {GetListsApi} from 'api/home/Brand'

function* getTabsList(action){
    let params = action.payload;
    const res = yield call(GetListsApi,params)
    let {resultList,everyPage,currentPage,totalCount} = res.result
    resultList && resultList.map(item => {
        item.key = item.id;
    });
    yield put({
        type:'BRAND_TABLELIST',
        payload:{
            brandLists:resultList,
            everyPage,
            currentPage,
            totalCount
        }
    })
}
export default function* rootSagas(){
    yield takeEvery("brand/fetchList",getTabsList);
}