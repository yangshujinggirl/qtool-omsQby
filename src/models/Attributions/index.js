import {call,put,takeEvery}  from 'redux-saga/effects'
import {GetListsApi} from 'api/home/Attributions'

function* getTabsList(action){
    const params = action.payload;
    const res = yield call(GetListsApi,params);
    const {resultList,everyPage,currentPage,totalCount} = res.result;
    resultList && resultList.map(item=>{
        item.key = item.attributeId
    });
    yield put({
        type:'ATTRIBUTION_TABLELIST',
        payload:{
            atrLists:resultList,
            everyPage,
            currentPage,
            totalCount
        }
    })
}
export default function* rootSaga(){
    yield takeEvery('attribution/fetchList',getTabsList)
}