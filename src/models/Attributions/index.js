import {call,put,takeEvery}  from 'redux-saga/effects'
import {GetListsApi} from 'api/home/Attributions'

function* getTabsList(action){
    const params = action.payload;
    const res = yield call(GetListsApi,params);
    const {result,everyPage,currentPage,total} = res.result;
    result && result.map(item=>{
        item.key = item.attributeId
    });
    yield put({
        type:'ATTRIBUTION_TABLELIST',
        payload:{
            atrLists:result,
            everyPage,
            currentPage,
            total
        }
    })
}
export default function* rootSaga(){
    yield takeEvery('attribution/fetchList',getTabsList)
}