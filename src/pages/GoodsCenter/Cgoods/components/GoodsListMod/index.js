import { Table, Spin, Button } from "antd";
import { connect } from 'react-redux';
import FilterForm from "./components/FilterForm";
import { Qpagination, Qmessage, Qbtn, Qtable, QsubTable} from "common";
import { ColumnsPar, ColumnsSub } from "../column";
import { Link } from 'react-router-dom';
import { GetListApi, GetUpDownApi } from "api/cTip/GeneralTradeGoods";
import moment from 'moment';


const MainComponent=({...props})=> {
  return (
    <div className="oms-common-index-pages-wrap">
      <FilterForm onSubmit={props.onSubmit} />
      <QsubTable
        parColumns={ColumnsPar}
        subColumns={ColumnsSub}
        dataSource={props.goodLists}
        onOperateClick={props.handleOperateClick}
      />
      {
      props.goodLists.length>0&&
      <Qpagination
        data={props.data}
        onChange={props.changePage}
        onShowSizeChange={props.onShowSizeChange}/>
      }
    </div>
  );
}
function withSubscription(WrappedComponent,productNature) {
  return class List extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        goodLists:[],
        currentPage:1,
        everyPage:15,
        total:0,
        inputValues: {
          productName: null,
          spuCode: null,
          skuCode: null,
          cstatus: null,
          brandName: null,
          isNew: null,
          categoryCode1: null,
          categoryCode2: null,
          categoryCode3: null,
          categoryCode4: null,
        }
      };
    }
    //初始化数据
    componentDidMount(){
      this.getList()
    };
    //搜索列表
    getList = () => {
      let params = {
        productNature,
        currentPage:this.state.currentPage,
        everyPage:this.state.everyPage,
        ...this.state.inputValues
      };
      GetListApi(params)
      .then((res)=> {
        let { result, total, currentPage, everyPage } =res.result;
        result.map((el)=>{
          el.key=el.spuCode;
          el.productNature=productNature;
          el.subList&&el.subList.map((item,idx)=>item.key = idx);
          return el;
        });
        this.setState({ goodLists:result,total, currentPage, everyPage })
      })
    };
    changePage = (currentPage, everyPage) => {
      this.setState({
        currentPage, everyPage
      },()=> {
        this.getList(currentPage, everyPage)
      })
    };
    onShowSizeChange = (currentPage, everyPage) => {
      this.setState({
        currentPage, everyPage
      },()=> {
        this.getList()
      })
    };
    onSubmit = params => {
      this.setState({
        inputValues:params
      },()=> {
        this.getList()
      })
    };
    handleOperateClick = (record,type) => {
      switch(type) {
        case 'sale':
        let opType = (record.upperStatusStr=='下架'||record.upperStatusStr=='待引用')?1:2;
        let message = (record.upperStatusStr=='下架'||record.upperStatusStr=='待引用')?"上架":"下架"
          let params = { opType }
          GetUpDownApi(params,record.skuCode)
          .then((res) => {
            Qmessage.success(`${message}成功`)
          },err=> {
            console.log(err)
          })
          break;
      }
    };

    render() {
      let { goodLists, total, currentPage, everyPage } = this.state;
      let params = {
        goodLists,
        data:{total,currentPage,everyPage},
        handleOperateClick:this.handleOperateClick,
        onShowSizeChange:this.onShowSizeChange,
        changePage:this.changePage,
        onSubmit:this.onSubmit
      }
      return (
        <WrappedComponent
        {...this.props}
        {...params}
        />
      );
    }
  }
}

export  { MainComponent, withSubscription };
