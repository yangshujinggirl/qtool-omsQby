import { Modal, Form } from "antd";
import { connect } from "react-redux";
import { Qtable, Qpagination, Qbtn } from "common";
import FilterForm from "./FilterForm";
import Columns from "./column";
class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValues: {},
      rowSelection: {
        onChange: this.onChange,
        selectedRowKeys: []
      }
    };
  }
  onChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      rowSelection: { ...this.state.rowSelection, selectedRowKeys }
    });
    console.log(selectedRowKeys);
    console.log(selectedRows);
  };
  componentDidMount = () => {
    this.props.dispatch({
      type: "saleOrder/fetchShopList",
      payload: {}
    });
  };
  handleSubmit = values => {
    const params = { ...this.state.inputValues, ...values };
    this.props.dispatch({
      type: "saleOrder/fetchShopList",
      payload: params
    });
    this.setState({
      inputValues: params
    });
  };
  changePage = (currentPage, everyPage) => {
    this.props.dispatch({
      type: "saleOrder/fetchShopList",
      payload: {
        ...this.state.inputValues,
        currentPage,
        everyPage
      }
    });
  };
  onOK = () => {
    this.props.onOk(this.state.rowSelection.selectedRowKeys);
  };
  render() {
    const { rowSelection } = this.state;
    const { visible, shopInfos, onCancel } = this.props;
    return (
      <div>
        <Modal
          width={630}
          visible={visible}
          onCancel={onCancel}
          onOk={this.onOK}
        >
          <FilterForm handleSubmit={this.handleSubmit} />
          <Qtable
            select
            rowSelection={rowSelection}
            columns={Columns}
            dataSource={shopInfos.shopLists}
          />
          <Qpagination data={this.props.shopInfos} onChange={this.changePage} />
        </Modal>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { SaleOrderReducers } = state;
  return SaleOrderReducers;
}
export default connect(mapStateToProps)(index);
