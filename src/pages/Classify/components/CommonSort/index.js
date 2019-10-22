import { connect } from "react-redux";
import { Qtable, Qpagination, Qbtn } from "common";
import FilterForm from "../FilterForm";
import { Columns1, Columns2, Columns3, Columns4 } from "../../column";
import AddModal from "../AddModal";
import EditModal from "../EditModal";

class CommonSort extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      editVisible: false,
      Columns: [],
      inputValues: {
        level: this.props.level
      }
    };
  }
  //初始化数据
  componentDidMount = () => {
    this.initColumnss();
    this.props.dispatch({
      type: "classify/fetchList",
      payload: { ...this.state.inputValues }
    });
  };
  initColumnss = () => {
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
  };
  //搜索列表
  searchData = values => {
    const params = { ...this.state.inputValues, ...values };
    this.props.dispatch({
      type: "classify/fetchList",
      payload: params
    });
    this.setState({ inputValues: params });
  };
  //更改分页
  changePage = (currentPage, everyPage) => {
    this.props.dispatch({
      type: "classify/fetchList",
      payload: {
        ...this.state.inputValues,
        currentPage,
        everyPage
      }
    });
  };
  //搜索查询
  onSubmit = params => {
    this.searchData(params);
  };
  handleOperateClick = record => {
    const num = this.props.level==1?'':this.props.level;
    this.setState({
      editVisible: true,
      id: record.id,
      ['categoryName'+num]:record['categoryName'+num]
    });
  };
  addSort = () => {
    this.setState({
      visible: true
    });
  };
  //新增onCancel
  onCancel = () => {
    this.setState({
      visible: false
    });
  };
  //新增onCancel
  onOk = () => {
    this.setState({
      visible: false
    });
    this.props.dispatch({
      type: "classify/fetchList",
      payload: { ...this.state.inputValues }
    });
  };
  onEditCancel=()=>{
    this.setState({
      editVisible: false
    });
  }
  onEditOk = () => {
    this.setState({
      editVisible: false
    });
    this.props.dispatch({
      type: "classify/fetchList",
      payload: { ...this.state.inputValues }
    });
  };
  render() {
    const num = this.props.level==1?'':this.props.level;
    const categoryName = this.state['categoryName'+num];
    const { Columns, visible, editVisible,id} = this.state;
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
          <AddModal
            text={text}
            visible={visible}
            level={level}
            onCancel={this.onCancel}
            onOk={this.onOk}
          />
        )}
        {editVisible && (
          <EditModal
            id={id}
            categoryName={categoryName}
            visible={editVisible}
            onCancel={this.onEditCancel}
            onOk={this.onEditOk}
          />
        )}
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { ClassifyReducers } = state;
  return ClassifyReducers;
}
export default connect(mapStateToProps)(CommonSort);
