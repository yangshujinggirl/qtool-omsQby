import { Form, Input, Select, message, Radio } from "antd";
import { GetInfoApi, AddBrandApi, UpdataBrandApi } from "api/home/Brand";
import UploadLogo from "common/QupLoadImgLimt";
import UploadIsSq from "common/QupLoadImgLimt";
import { Qbtn } from "common";
const Option = Select.Option;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 }
  }
};
class BrandAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSq: "",
      infos: {},
      fileList: [],
      authList: []
    };
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      this.setState({ id });
      GetInfoApi({ brandId: id }).then(res => {
        const fileList = [
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: res.result.logo
          }
        ];
        let authList = [];
        if (res.result.isSq == 1) {
          authList = [];
        }
        this.setState({
          infos: res.result,
          fileList,
          authList
        });
      });
    }
  }
  handleSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { id } = this.state;
        values.logo = this.state.fileList[0].response.result;
        if (id) {
          //修改
          UpdataBrandApi({ id, ...values }).then(res => {
            message.success("保存成功");
            this.props.history.push("/account/brandManage");
          });
        } else {
          //新建
          AddBrandApi({ ...values }).then(res => {
            message.success("保存成功");
            this.props.history.push("/account/brandManage");
          });
        }
      }
    });
  };
  upDateList = fileList => {
    this.setState({ fileList });
  };
  upAuthList = fileList => {
    this.setState({ authList: fileList });
  };
  goBack = () => {
    this.props.history.push("/account/brandManage");
  };
  //更改品牌授权
  changeIsSq = e => {
    const { value } = e.target;
    this.setState({
      isSq: value
    });
  };
  render() {
    const { infos, fileList, isSq, authList } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="oms-common-addEdit-pages">
        <Form {...formItemLayout}>
          <Form.Item label="品牌中文名称">
            {getFieldDecorator("brandNameCn", {
              initialValue: infos.brandNameCn
            })(<Input placeholder="请输入品牌中文名称" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="品牌英文名称">
            {getFieldDecorator("brandNameEn", {
              initialValue: infos.brandNameEn
            })(<Input placeholder="请输入品牌英文名称" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="品牌归属地">
            {getFieldDecorator("brandCountry", {
              initialValue: infos.brandCountry,
              rules: [{ required: true, message: "请输入品牌归属地" }]
            })(<Input placeholder="请输入品牌归属地" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="品牌状态">
            {getFieldDecorator("status", {
              initialValue: infos.status ? infos.status : undefined,
              rules: [{ required: true, message: "请选择" }]
            })(
              <Select>
                <Option value={1}>启用</Option>
                <Option value={0}>不启用</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="品牌授权">
            {getFieldDecorator("isSq", {
              initialValue: infos.isSq ? infos.isSq : undefined,
              onChange: this.changeIsSq,
              rules: [{ required: true, message: "请选择" }]
            })(
              <Radio.Group>
                <Radio value={1}>有</Radio>
                <Radio value={0}>无</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label="品牌logo">
            <UploadLogo
              upDateList={this.upDateList}
              fileList={fileList}
              width={500}
              height={500}
            />
          </Form.Item>
          {isSq == 1 && (
            <React.Fragment>
              <Form.Item label="授权图片">
                <UploadIsSq
                  upDateList={this.upAuthList}
                  fileList={authList}
                  limit={3}
                />
              </Form.Item>
              <Form.Item label="授权有效期">
                
              </Form.Item>
            </React.Fragment>
          )}
          <Form.Item label="品牌介绍">
            {getFieldDecorator("brandIntroduce", {
              initialValue: infos.brandIntroduce
            })(
              <Input.TextArea
                rows={7}
                cols={6}
                maxLength="400"
                placeholder="请输入品牌介绍，400字符以内"
              />
            )}
          </Form.Item>
          <div className="handle-operate-save-action">
            <Qbtn onClick={this.goBack}>返回</Qbtn>
            <Qbtn onClick={this.handleSubmit}>保存</Qbtn>
          </div>
        </Form>
      </div>
    );
  }
}
const BrandAdds = Form.create({})(BrandAdd);
export default BrandAdds;
