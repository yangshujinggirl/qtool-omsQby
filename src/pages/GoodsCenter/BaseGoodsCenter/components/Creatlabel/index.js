import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import { Tag, Input, Tooltip, message } from 'antd';

class Creatlabel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputVisible: false,
      inputValue: '',
    }
  }
  saveInputRef = input => this.input = input
  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }
  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }
  //关闭
  handleClose = (removedTag) => {
    this.props.deleteGoodsLabel&&this.props.deleteGoodsLabel(removedTag,this.props.level);
  }
  //新建
  handleInputConfirm = (e) => {
    const { inputValue } = this.state;
    if(inputValue == '') {
      this.setState({ inputVisible:false })
      return
    }
    if (inputValue) {
      this.isHasTag(inputValue)
    } else {
      message.error('此属性已存在',3);
      return
    }
    this.setState({ inputVisible: false, inputValue: '' });
  }
  isHasTag=(values)=> {
    let tags;
    const { level, BaseGoodsAddReducers } =this.props;
    if(level=='one') {
      tags = BaseGoodsAddReducers.specData.specOne;
    } else {
      tags = BaseGoodsAddReducers.specData.specTwo;
    }
    let index = tags.findIndex((value,index,arr) => {
      return value.name == values;
    })
    if (index != -1) {
      message.error('此属性已存在',3);
      return false;
    } else {
      this.props.addGoodsLabel(values,level);
    }
  }

  render() {
    const { inputVisible, inputValue } = this.state;
    const { totalData, specData }= this.props.BaseGoodsAddReducers;
    let tags;
    if(this.props.level=='one') {
      tags = specData.specOne
    } else {
      tags = specData.specTwo
    }
    return (
      <div>
        {
          tags.map((tag, index) => (
            <Tag
              key={tag.key}
              closable={!tag.disabled}
              onClose={() => this.handleClose(tag)}>
              {tag.name}
            </Tag>
          ))
        }
        {
          inputVisible && (
            <Input
              ref={this.saveInputRef}
              type="text"
              size="small"
              style={{ width: 78 }}
              value={inputValue}
              onChange={this.handleInputChange}
              onBlur={this.handleInputConfirm}
              onPressEnter={this.handleInputConfirm}
            />
          )
        }
        {
          !inputVisible && (
            this.props.disabled?
            <Tag
              style={{ background: '#fff', borderStyle: 'dashed','cursor':'not-allowed' }}>
              <PlusOutlined/>新建属性
            </Tag>
            :
            <Tag
              onClick={this.showInput}
              style={{ background: '#fff', borderStyle: 'dashed',}}>
              <PlusOutlined/>新建属性
            </Tag>
          )
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { BaseGoodsAddReducers } = state;
  return { BaseGoodsAddReducers};
}
export default connect(mapStateToProps)(Creatlabel);
