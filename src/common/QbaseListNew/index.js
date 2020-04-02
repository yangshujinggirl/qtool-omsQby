
import { useState, useEffect } from 'react';

function QbaseListNew(WrappedComponent,listApi){
  return ({...props})=> {
    const [dataList,setDataList] =useState([]);
    const [dataPagation,setDataPagation] =useState({everyPage:0, currentPage:1, total:0});
    const [fields,setFields]=useState({});
    //查询列表
    const searchList=(values)=> {
      let params={...fields,everyPage:dataPagation.everyPage,currentPage:dataPagation.currentPage};
      if(values) {
        params = {...params,...values};
      }
      listApi(params)
      .then((res)=> {
        let { result, everyPage, currentPage, total } =res.result;
        result = result?result:[];
        result.map((el,index)=>el.key = index);
        setDataList(result);
        setDataPagation({everyPage,currentPage,total});
      })
    }
    //分页
    const changePage = (currentPage, everyPage) => {
      searchList(currentPage, everyPage)
    };
    //分页
    const onShowSizeChange = (currentPage, everyPage) => {
      searchList(currentPage, everyPage)
    };
    //分页
    const onSubmit = params => {
      setFields(params)
    };
    useEffect(()=>{searchList()},[fields]);
    props = {
      ...props,
      searchList,
      changePage,
      onShowSizeChange,
      onSubmit,
      dataList,
      dataPagation,
      fields
    }

    return <WrappedComponent {...props}/>;
  }
}
export default QbaseListNew;
