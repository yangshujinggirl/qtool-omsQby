import { Button } from 'antd';
import React, { Component } from 'react';
import './index.less';

class Qbtn extends Component {
  static defaultProps={
    type:'primary',
    size:'fixed',//fixed固定宽度，free内容撑开
    loading:false
  }
  render() {
    let btnClass = `${this.props.size}-width-btn ${this.props.className}`;
    const { type, disabled, onClick, loading } =this.props;
    return (
      <Button
        type={type}
        className={btnClass}
        disabled={disabled}
        loading={loading}
        onClick={onClick}>
          {this.props.children}
      </Button>
    )
  }
}

export default Qbtn;
