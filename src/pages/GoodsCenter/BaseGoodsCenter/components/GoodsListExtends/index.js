
import { Table, Spin, Button } from "antd";
import moment from 'moment';
import { Qpagination, Qbtn, Qtable} from "common";
import { ColumnsGeneral, ColumnsCross } from "../../columns";
import { GetGoodsApi } from "api/home/BaseGoods";
// import GoodsListExtends from '../GoodsListExtends';
import ExportModal from '../ExportModal';
import { OmsExportApi } from "api/Export";

function withSubscription(FilterFormMod,productNature){
  return class BaseGoods extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        goodLists:[],
        everyPage:15,
        total:0,
        currentPage: 1,
        inputValues: {},
        loading:false,
        visible:false
      };
    }
    //搜索列表
    componentDidMount (){
      this.getList()
    };
    getList = () => {
      const { currentPage,everyPage,inputValues } = this.state;
      const params = { productNature, everyPage, currentPage,...inputValues};
      let { time, ..._values } =params;
      if(time&&time.length>0){
        _values.stime = moment(time[0]).format('YYYY-MM-DD H:mm:ss');
        _values.etime = moment(time[1]).format('YYYY-MM-DD H:mm:ss');
      };
      this.setState({loading:true})
      GetGoodsApi(_values)
      .then((res)=> {
        let { result, everyPage, currentPage, total } =res.result;
        result && result.map(item =>item.key = item.spuId)
        this.setState({goodLists:result,everyPage, currentPage, total, loading:false})
      })
    };
    changePage = (currentPage, everyPage) => {
      this.setState({ currentPage, everyPage },()=> {
        this.getList()
      })
    };
    onShowSizeChange = (currentPage, everyPage) => {
      this.setState({ currentPage, everyPage },()=> {
        this.getList()
      })
    };
    onSubmit = params => {
      this.setState({inputValues:params},()=>{
        this.getList()
      })
    };
    handExport=()=> { this.setState({ visible:true }) }
    onOkExport =(values)=> {
      this.setState({ visible:false });
      OmsExportApi({
        exportType:1,
        skuExport:{...this.state.inputValues,productNature},
        exportColumnJson:values
      })
    }
    onCancel =(values)=> { this.setState({ visible:false }) }
    addTrade=()=> {
       this.props.history.push(`/account/baseGoodsAdd/${productNature}`);
    }
    render() {
      const { goodLists,loading, everyPage, currentPage, total, visible } = this.state;
      let columnIndex = productNature==1?ColumnsGeneral:ColumnsCross;
      return (
          <Spin tip="加载中..." spinning={loading}>
            <div className="oms-common-index-pages-wrap">
              <FilterFormMod
                onSubmit={this.onSubmit}
                inputValues={this.state.inputValues}/>
              <div className="handle-operate-btn-action">
                <Qbtn size="free" onClick={this.addTrade}>新增商品</Qbtn>
                <Qbtn size="free" onClick={this.handExport}>导出商品</Qbtn>
              </div>
              <Qtable
                columns={columnIndex}
                dataSource={goodLists}
              />
              {
                goodLists.length>0&&
                <Qpagination
                  data={{everyPage, currentPage, total}}
                  onChange={this.changePage}
                  onShowSizeChange={this.onShowSizeChange}/>
              }
              <ExportModal
                productNature={productNature}
                visible={visible}
                onCancel={this.onCancel}
                onOk={this.onOkExport}/>
          </div>
        </Spin>
      );
    }
  }
}
export  {withSubscription};
