import { Button } from 'antd';
import React, { Component } from 'react';
import './index.less';

class Qbtn extends Component {
  static defaultProps={
    type:'primary',
    size:'fixed'//fixed固定宽度，free内容撑开
  }
  render() {
    let btnClass = `${this.props.size}-width-btn ${this.props.className}`;
    const { type, disabled, onClick } =this.props;
    return (
      <Button
        htmlType="submit"
        type={type}
        className={btnClass}
        disabled={disabled}
        onClick={onClick}>
          {this.props.children}
      </Button>
    )
  }
}

export default Qbtn;
