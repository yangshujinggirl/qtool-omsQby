import React, { Component } from "react";
import { Upload, Button, Modal } from "antd";
import { Qmessage, Qbtn } from 'common'
import "./index.less";

class index extends Component {
  downLoadTemp = () => {
    window.open('../../../../static/MultilLine_In.xlsx');
  };
  handleChange = info => {
    let file = info.file;
    const { response } = file;
    if (file.status == "done") {
      if (response) {
        let { result, httpCode } =response;
        if (httpCode == "200") {
          this.props.upDateList(result.pdSpuList);
        } else {
          Qmessage.error(file.response.message, 0.8);
        }
        return file.response.status === "success";
      }
    }
  };
  beforeUpload = () => {};
  render() {
    const props = {
      action:`/qtoolsApp/pdListDisplay/multilineSpuImport`,
      accept: ".xlsx,.xls",
      onChange: this.handleChange,
      beforeUpload: this.beforeUpload,
      name: "mfile",
      showUploadList: false
    };
    return (
      <div className="c_act_import">
        <div>
          <Upload {...props}>
            <Qbtn>上传附件</Qbtn>
          </Upload>&nbsp;
          <Qbtn size="free" onClick={this.downLoadTemp}> 下载附件模板</Qbtn>
        </div>
        <div className="tips">
          注：首页2行3列商品模块固定展示6件商品，按照以下顺序展示，B端在售库存为0或下架商品不展示，由后位商品按照顺序补充
        </div>
      </div>
    );
  }
}

export default index;
