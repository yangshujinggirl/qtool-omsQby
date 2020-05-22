const initialState={
    loading:false,
    tableLists:[],
    everyPage:15,
    currentPage:1,
    total:0,
    shopInfos:{
        shopLists:[],
        everyPage:15,
        total:0,
        currentPage:0
    }
}
const index=(state=initialState,action)=>{
    switch(action.type){
        case 'FETCH_START':
            return{
                ...state,
                loading:true
            }
        case 'SALE_TABLELIST':
            return{
                ...state,
                loading:false,
                ...action.payload
            }
        case 'SHOP_TABLELIST':
            return{
                ...state,
                loading:false,
                ...action.payload
            }
        case 'FETCH_FAIL':
            return{
                ...state,
                loading:false
            }
        default:
            return state
        
    }
}
export default index