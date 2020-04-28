import { Modal } from 'antd';
import React, { Component } from 'react';
import { Sessions } from 'utils'
import noUrlImg from '../../imgs/nogoods.png';
import './index.less';

class QenlargeImg extends Component {
  static defaultProps={
    placement:'block',//block,inline-并排
  }
  constructor(props) {
    super(props);
    this.state = {
      visible:false
    }
  }
  onCancel=()=> {
    this.setState({
      visible:false
    })
  }
  onShow=()=> {
    this.setState({
      visible:true
    })
  }
  render() {
    const { visible } =this.state;
    const { url, placement } =this.props;
    let diySty = `${placement}-arrange enlarge-img-components`;
    let fileDomain = Sessions.get('fileDomain');

    return (
      <div  className={diySty}>
        {
          url?
          <div className="wrap">
            <img src={`${fileDomain}${url}`} onClick={this.onShow}/>
            <Modal
              onOk={this.onCancel}
              onCancel={this.onCancel}
              visible={visible}
              footer={null}>
              <div>
                <img src={`${fileDomain}${url}`}/>
              </div>
            </Modal>
          </div>
          :
          <img src={noUrlImg} />
        }
      </div>
    )
  }
}

export default QenlargeImg;
