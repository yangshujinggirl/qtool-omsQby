import FilterForm from "./FilterForm";
import { GetCountryListsApi } from "api/home/Country";
import "./index.less";

class Country extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countryList: []
    };
  }
  //初始化数据
  componentDidMount = () => {
    this.searchData({})
  };
  //搜索列表
  searchData = values => {
    GetCountryListsApi(values).then(res => {
      if (res.httpCode == 200) {
        this.setState({
          countryList: res.result
        });
      };
    });
  };
  //搜索查询
  onSubmit = params => {
    this.searchData(params);
  };
  render() {
    const { countryList } = this.state;
    return (
      <div className="oms-common-index-pages-wrap">
        <FilterForm onSubmit={this.onSubmit} />
        <div>
          {countryList.map(item => (
            <div className="imgBox">
              <img src={item.countryImages}/>
              <p>{item.countryName}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default Country;
