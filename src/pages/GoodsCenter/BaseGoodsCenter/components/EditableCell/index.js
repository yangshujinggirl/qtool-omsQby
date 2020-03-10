import React , { Component } from 'react';
import { Table, Input, Button, Popconfirm } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import './index.less';

class EditableCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      editable: false
    }
  }
  handleChange = (e) => {
    this.setState({value:e.target.value});
  }
  setValues = () => {
    this.setState({
      editable: false
    },()=>{
        this.setPdSkusData()
    });
  }
  setPdSkusData() {
    let { goodsList }=this.props.BaseGoodsAddReducers;
    for(var i=0;i<goodsList.length;i++){
        goodsList[i][this.props.title]=this.state.value
    }
    this.props.dispatch({
      type:'baseGoodsAdd/getListState',
      payload:goodsList
    })
    this.setState({value:''})
  }
  edit = () => {
    this.setState({ editable: true });
  }
  render() {
    const { editable } = this.state;
    return (
        <div className="editable-cell-components">
            {
              editable ?
              <div className="editable-cell-input-wrapper">
                  <Input
                      value={this.state.value}
                      onChange={this.handleChange.bind(this)}
                      onPressEnter={this.check}
                      onBlur={this.onChangeBlur}
                  />
                  <CheckOutlined
                      className="editable-cell-icon-check"
                      onClick={this.setValues}
                  />
              </div>
              :
              <span
                className="editable-cell-text-wrapper"
                onClick={this.edit.bind(this)}>
                {this.props.text}
              </span>
            }
        </div>
    );
  }
}

function mapStateToProps(state) {
	const { BaseGoodsAddReducers } = state;
	return {BaseGoodsAddReducers};
}
export default connect(mapStateToProps)(EditableCell);
