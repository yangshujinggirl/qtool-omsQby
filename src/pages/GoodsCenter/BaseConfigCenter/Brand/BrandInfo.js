import { Form } from "antd";
import {QenlargeImg} from 'common'
import { GetInfoApi } from "api/home/Brand";

import moment from "moment";
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 },
};
class BrandInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      infos: {},
    };
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    GetInfoApi({ brandId: id }).then((res) => {
      this.setState({
        infos: res.result,
      });
    });
  }
  render() {
    const { infos } = this.state;
    const fileDomain = sessionStorage.getItem("oms_fileDomain");
    return (
      <div className="oms-common-addEdit-pages">
        <Form {...formItemLayout}>
          <Form.Item label="品牌名称">
            {infos.brandNameCn} {infos.brandNameEn}
          </Form.Item>
          <Form.Item label="品牌归属地">{infos.brandCountry}</Form.Item>
          <Form.Item label="状态">
            {infos.status == 1 ? "启用" : "不启用"}
          </Form.Item>
          <Form.Item label="品牌授权">{infos.isSq ? "有" : "无"}</Form.Item>
          <Form.Item label="授权书">
            {infos.introduceImgList &&
              infos.introduceImgList.map((item, index) => (
                <QenlargeImg key={index} url={fileDomain + item}/>
              ))}
          </Form.Item>
          <Form.Item label="授权有效期">
            {infos.isSq && infos.validityStart && (
              <span>
                {moment(infos.validityStart).format("YYYY-MM-DD")} —
                {moment(infos.validityEnd).format("YYYY-MM-DD")}
              </span>
            )}
          </Form.Item>
          <Form.Item label="是否转授权">
            {infos.isTransfer ? "是" : "否"}
          </Form.Item>
          <Form.Item label="授权级别">
            <span>{infos.transLevel}级授权</span>
          </Form.Item>
          <Form.Item label="品牌logo">
            {infos.logo && (
              <QenlargeImg url={fileDomain + infos.logo}/>
            )}
          </Form.Item>
          <Form.Item label="品牌简介">{infos.brandIntroduce}</Form.Item>
        </Form>
      </div>
    );
  }
}
export default BrandInfo;
