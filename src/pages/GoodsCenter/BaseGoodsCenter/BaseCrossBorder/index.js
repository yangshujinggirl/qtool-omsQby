import { Table, Spin, Button } from "antd";
import { QsubTable, Qpagination, QbyConnect, Qbtn, Qtable} from "common";
import { Columns } from "./column";
import { GetGoodsApi } from "api/home/BaseGoods";
import FilterForm from "./components/FilterForm";
import GoodsListExtends from '../components/GoodsListExtends';
import moment from 'moment'

class BaseGoods extends GoodsListExtends {
  constructor(props) {
    super(props);
    this.state = {
      productNature:2,
      goodLists:[],
      everyPage:15,
      currentPage: 1,
      inputValues: {
        productName:null,
        spuCode:null,
        skuCode:null,
        brandId:null,
        categoryCode1:null,
        categoryCode2:null,
        productType:null,
        time:[],
        // time:[moment('2015/01/01', this.formatType), moment('2015/01/01', this.formatType)],
      }
    };
  }
  //初始化数据
  componentDidMount (){
    this.getList()
  };
  addTrade=()=> {
    this.props.history.push('/account/baseGoodsAdd/2')
  }
  render() {
    const { goodLists,everyPage, currentPage, totalCount } = this.state;

    return (
        <div className="oms-common-index-pages-wrap">
          <FilterForm
            onSubmit={this.onSubmit}
            inputValues={this.state.inputValues}/>
          <div className="handle-operate-btn-action">
            <Qbtn size="free" onClick={this.addTrade}>新建跨境商品</Qbtn>
            <Qbtn size="free" onClick={this.export}>商品导出</Qbtn>
          </div>
          <Qtable
            columns={Columns}
            dataSource={goodLists}
          />
          {
            goodLists.length>0&&
            <Qpagination
              data={{everyPage, currentPage, totalCount}}
              onChange={this.changePage}
              onShowSizeChange={this.onShowSizeChange}/>
          }
      </div>
    );
  }
}
export default BaseGoods;
