
import { Table, Form, Spin, Button } from "antd";
import { useState, useEffect } from 'react';
import moment from 'moment';
import { Columns } from './columns';
import { Qmessage, Qpagination, Qbtn, Qtable} from "common";
import FilterForm from './components/FilterForm'
import { GetCouponListApi } from "api/marketCenter/CouponCenter";

const CouponRecord=({...props})=> {
  let couponCode=props.match.params.id;
  let [dataSource,setDataSource] =useState([]);
  const [fields,setFields]=useState({couponCode});
  const [loading,setLoading] =useState([]);
  const [dataPagation,setDataPagation] =useState({everyPage:15, currentPage:1, total:0});
  //查询列表
  const searchList=(values)=> {
    setLoading(true)
    let params={...fields,everyPage:dataPagation.everyPage,currentPage:dataPagation.currentPage};
    if(values) {
      params = {...params,...values};
    }
    let { time,..._vals} = params;
    if(time&&time.length>0){
      _vals.voucherTimeStart =  moment(time[0]).format('YYYY-MM-DD HH:mm:ss');;
      _vals.voucherTimeEnd = moment(time[1]).format('YYYY-MM-DD HH:mm:ss');
    }
    GetCouponListApi(_vals)
    .then((res)=> {
      let { result, everyPage, currentPage, total } =res.result;
      result = result?result:[];
      result.map((el,index)=>el.key = index);
      setDataSource(result);
      setDataPagation({everyPage,currentPage,total});
      setLoading(false)
    })
  }
  const changePage = (currentPage, everyPage) => {
    searchList(currentPage, everyPage)
  };
  const onShowSizeChange = (currentPage, everyPage) => {
    searchList(currentPage, everyPage)
  };
  const onSubmit = params => {
    setFields(params)
  };
  useEffect(()=>{searchList()},[fields]);

  return(
    <Spin tip="加载中..." spinning={loading}>
      <div className="oms-common-index-pages-wrap">
        <FilterForm onSubmit={onSubmit} initialValues={{...fields}}/>
        <Qtable
          columns={Columns}
          dataSource={dataSource}
        />
        {
          dataSource.length>0&&
          <Qpagination
            data={dataPagation}
            onChange={changePage}
            onShowSizeChange={onShowSizeChange}/>
        }
    </div>
  </Spin>
  )
}
export default CouponRecord;
