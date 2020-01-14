import FilterForm from "./FilterForm";
import { GetCountryListsApi } from "api/home/Country";
import "./index.less";

class Country extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countryList: [],
      currentPage: 0
    };
  }
  //初始化数据
  componentDidMount = () => {
    console.log(this.refs['container']);
    this.refs['container'].addEventListener("scroll", this.handleScroll);
    this.searchData({});
  };
  // componentWillUnmount() {
  //   document.removeEventListener("scroll", this.handleScroll);
  // }
  //搜索列表
  searchData = values => {
    GetCountryListsApi(values).then(res => {
      if (res.httpCode == 200) {
        const { resultList, currentPage } = res.result;
        const countryList = resultList.map(item => {
          item.key = item.id;
          return item;
        });
        this.setState({
          countryList: this.state.countryList.concat(countryList),
          currentPage
        });
      }
    });
  };
  //滚动事件
  handleScroll = () => {
    console.log(111)
    const scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    const countryListTop = this.refs["country"].offsetTop; //距离上面的高度
    const countryHeight = this.refs["country"].offsetHeight; //本身的高度
    const screenHeight = document.documentElement.clientHeight; //屏幕的高度
    console.log("scrollTop:" + scrollTop);
    console.log("countryListTop" + countryListTop);
    console.log("countryHeight" + countryHeight);
    console.log("screenHeight" + screenHeight);
    if (scrollTop >= countryListTop + countryHeight - screenHeight) {
      this.searchData({ currentPage: ++this.state.currentPage });
    }
  };
  //搜索查询
  onSubmit = params => {
    this.searchData(params);
  };
  render() {
    const { countryList } = this.state;
    return (
      <div className="oms-common-index-pages-wrap country" ref='container'>
        <FilterForm onSubmit={this.onSubmit} />
        <div onScrollCapture={this.handleScroll} ref="country">
          {countryList.map(item => (
            <div className="imgBox">
              <img src={item.countryImages} />
              <p>{item.countryName}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default Country;
