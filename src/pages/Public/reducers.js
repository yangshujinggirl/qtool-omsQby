const index = (state={
  loading:false,
  totalData:{},
  menuList:[]//侧边栏
},action) => {
  switch(action.type) {
    case 'P.FETCH_SUCCESS':
      return { ...state, loading:false, ...action.payload }
    case 'P.FETCH_INFO':
      return { ...state, loading:true, ...action.payload }
    case 'FETCH_FAILED':
      return { ...state, loading:false }
    case 'SET_LOADING':
      return { ...state, loading:action.loading }
    default:
      return state
  }
}

  export default index;
