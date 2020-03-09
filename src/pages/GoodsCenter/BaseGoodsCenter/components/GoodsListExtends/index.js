import { GetGoodsApi } from "api/home/BaseGoods";
import { ExportApi } from "api/Export";
import moment from 'moment'

class BaseGoods extends React.Component {
  constructor(props) {
    super(props);
    //搜索列表
    this.getList = () => {
      const { productNature,currentPage,everyPage,inputValues } = this.state;
      const params = { productNature, everyPage, currentPage,...inputValues};
      let { time, ..._values } =params;
      if(time&&time.length>0){
        _values.stime = moment(time[0]).format('YYYY-MM-DD H:mm:ss');
        _values.etime = moment(time[1]).format('YYYY-MM-DD H:mm:ss');
      };
      GetGoodsApi(_values)
      .then((res)=> {
        let { resultList, everyPage, currentPage, totalCount } =res.result;
        resultList && resultList.map(item =>item.key = item.spuId)
        this.setState({goodLists:resultList,everyPage, currentPage, totalCount})
      })
    };
    this.changePage = (currentPage, everyPage) => {
      this.setState({ currentPage, everyPage },()=> {
        this.getList()
      })
    };
    this.onShowSizeChange = (currentPage, everyPage) => {
      this.setState({ currentPage, everyPage },()=> {
        this.getList()
      })
    };
    this.onSubmit = params => {
      this.setState({inputValues:params},()=>{
        this.getList()
      })
    };
    this.export =()=> {
      ExportApi({...this.state.inputValues,type:1})
    }
  }
}
export default BaseGoods;
