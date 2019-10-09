import React, { Component } from "react";
import { Columns1, Columns2, Columns3, Columns4 } from "../../Columns";
import FilterForm from "./FilterForm";
import AddModal from "../AddModal";

class CommonSort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      Columns: {},
      inputValues: {
        currentPage: 1
      }
    };
  }
  //初始化数据
  componentDidMount = () => {
    this.initColumnss();
    this.props.actions.getCategoryList({ ...this.state.inputValues });
  };
  initColumnss = () => {
    let Columns;
    switch (this.props.level) {
      case 1:
        Columns = Columns1;
      case 2:
        Columns = Columns2;
      case 3:
        Columns = Columns3;
      case 4:
        Columns = Columns4;
    }
    this.setState({
      Columns
    });
  };
  //搜索列表
  searchData = values => {
    const params = { ...this.state.inputValues, ..._values };
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
  render() {
    const { Columns, visible, text } = this.state;
    const { categoryLists, level } = this.props;
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
        {visible && <AddModal visible={visible} level={level} />}
      </div>
    );
  }
}

export default QbyConnect(CommonSort, Actions, "ClassifyReducers");
