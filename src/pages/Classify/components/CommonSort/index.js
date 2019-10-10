import { Qtable, Qpagination, QbyConnect, Qbtn } from "common";
import * as Actions from "../../actions/actionsIndex";
import FilterForm from "../FilterForm";
import { Columns1, Columns2, Columns3, Columns4 } from "../../column";
import AddModal from "../AddModal";

class CommonSort extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      Columns: [],
      inputValues: {
        level: this.props.level
      }
    };
  }
  //初始化数据
  componentDidMount = () => {
    this.initColumnss();
    this.props.actions.getCategoryList({ ...this.state.inputValues });
  };
  initColumnss = () => {
    console.log(111);
    console.log(this.props.level);
    let Columns;
    switch (this.props.level) {
      case 1:
        Columns = Columns1;
        break;
      case 2:
        Columns = Columns2;
        break;
      case 3:
        Columns = Columns3;
        break;
      case 4:
        Columns = Columns4;
        break;
    }
    this.setState({
      Columns
    });
    console.log(Columns);
  };
  //搜索列表
  searchData = values => {
    const params = { ...this.state.inputValues, ...values };
    this.props.actions.getCategoryList(params);
    this.setState({ inputValues: params });
  };
  //更改分页
  changePage = (currentPage, everyPage) => {
    this.props.actions.getCategoryList({
      ...this.state.inputValues,
      currentPage,
      everyPage
    });
  };
  //搜索查询
  onSubmit = params => {
    this.searchData(params);
  };
  handleOperateClick = record => {
    this.setState({
      visible: true
    });
  };
  addSort = () => {
    this.setState({
      visible: true
    });
  };
  onCancel = () => {
    this.setState({
      visible: false
    });
  };
  render() {
    const { Columns, visible } = this.state;
    const { categoryLists, level, text } = this.props;
    return (
      <div>
        <FilterForm onSubmit={this.onSubmit} level={level} />
        <div className="handle-operate-btn-action">
          <Qbtn size="free" onClick={this.addSort}>
            新增{text}类目
          </Qbtn>
        </div>
        <Qtable
          columns={Columns}
          dataSource={categoryLists}
          onOperateClick={this.handleOperateClick}
        />
        <Qpagination data={this.props} onChange={this.changePage} />
        {visible && (
          <AddModal visible={visible} level={level} onCancel={this.onCancel} />
        )}
      </div>
    );
  }
}

export default QbyConnect(CommonSort, Actions, "ClassifyReducers");
