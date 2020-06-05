import { Modal } from 'antd';
import {Link} from "react-router-dom";
import { Qmessage, QbaseList, Qbtn, Qpagination, Qtable} from "common/index";
import FilterForm from "./components/FilterForm";
import CancelModal from "./components/CancelModal";
import {Columns} from "./column";
import { GetListApi,GetCancelApi } from "api/home/OrderCenter/Border/ShopOrder";
import {ErpExportApi} from "api/Export";

const ShopOrderList = QbaseList((_this) => {
    const { currentItem, visible, dataList, everyPage, currentPage, total, searchCriteriaList } = _this.state;
    const handleExport=()=> {
      return new ErpExportApi(searchCriteriaList, "/export/spOrders")
    }
    //取消订单
    const onOperateClick=(record,type)=> {
      _this.setState({ currentItem:record,visible:true })
    }
    const onOk=()=> {
      _this.searchDataList();
      _this.setState({ visible:false })
    }
    const onCancel=()=> {
      _this.setState({ visible:false, currentItem:{} })
    }
    return (
        <div className="oms-common-index-pages-wrap">
            <FilterForm onSubmit={_this.searchDataList}
                        selectTimeChange={(value,isDefaultInitFinish)=>_this.selectTimeChange(value,isDefaultInitFinish,false)}/>
            <div className="handle-operate-btn-action">
                <Qbtn size="free"><Link to='/account/shopOrder/add/1'>新建门店订单</Link></Qbtn>
                <Qbtn size="free"><Link to='/account/shopOrder/add/2'>新建赠品单</Link></Qbtn>
                <Qbtn size="free"><Link to='/account/shopReturn/add'>新建门店退单</Link></Qbtn>
                <Qbtn size="free" onClick={handleExport}>导出数据</Qbtn>
            </div>
            <Qtable
                columns={Columns}
                dataSource={dataList}
                onOperateClick={onOperateClick}
                locale={{emptyText:"暂无数据，请修改搜索条件"}}/>
            <Qpagination
                data={{everyPage, currentPage, total}}
                onChange={_this.changePage}/>
            <CancelModal
              currentItem={currentItem}
              visible={visible}
              onOk={onOk}
              onCancel={onCancel}/>
        </div>
    );
}, GetListApi, {visible:false,currentItem:{},isComponentDidMountRequestData:false});
export default ShopOrderList;
