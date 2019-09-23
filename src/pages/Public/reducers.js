const index = (state={
  loading:false,
  totalData:{},
  menuList:[]//侧边栏
},action) => {
  switch(action.type) {
    case 'FETCH_SUCCESS':
      return { ...state, loading:false, ...action }
    case 'FETCH_START':
      return { ...state, loading:true }
    case 'FETCH_FAILED':
      return { ...state, loading:false }
    case 'SET_LOADING':
      return { ...state, loading:action.loading }
    default:
      return state
  }
}

  export default index;
