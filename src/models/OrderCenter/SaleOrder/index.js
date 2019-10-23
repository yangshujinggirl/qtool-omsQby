import {call,put,takeEvery} from 'redux-saga/effects'
import {GetListsApi,ShopListsApi} from 'api/home/OrderCenter/SaleOrder'

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
function* getShopList(action){
    const params = action.payload;
    const res = yield call(ShopListsApi,params);
    const {resultList,everyPage,totalCount,currentPage} = res.result;
    resultList&&resultList.map(item=>{
        item.key = item.id
    });
    yield put({
        type:'SHOP_TABLELIST',
        payload:{
            shopInfos:{
                shopLists:resultList,
                everyPage,
                currentPage,
                totalCount
            }
        }
    })
}
export default function* rootSaga(){
    yield takeEvery('saleOrder/fetchList',getTableList);
    yield takeEvery('saleOrder/fetchShopList',getShopList);
}
