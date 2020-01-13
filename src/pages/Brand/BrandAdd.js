import {
  Form,
  Input,
  Select,
  message,
  Radio,
  AutoComplete,
  DatePicker
} from "antd";
const { RangePicker } = DatePicker;
import {
  GetInfoApi,
  AddBrandApi,
  UpdataBrandApi,
  BrandAddressApi
} from "api/home/Brand";
import UploadLogo from "common/QupLoadImgLimt";
import UploadIsSq from "common/QupLoadImgLimt";
import { Qbtn } from "common";
import moment from "moment";
import "./index.less";
const Option = Select.Option;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};

class BrandAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSq: "",
      infos: {},
      logo: [],
      introduceImg: [],
      addressList: []
    };
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      this.setState({ id });
      GetInfoApi({ brandId: id }).then(res => {
        // const fileList = [
        //   {
        //     uid: "-1",
        //     name: "image.png",
        //     status: "done",
        //     url: res.result.logo
        //   }
        // ];
        // let authList = [];
        // if (res.result.isSq == 1) {
        //   authList = [];
        // }
        // this.setState({
        //   infos: res.result,
        //   fileList,
        //   authList
        // });
      });
    }
    this.getBrandAdress();
  }
  getBrandAdress = () => {};
  handleSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (values.brandNameCn || values.brandNameEn) {//二者有一必填
          const { id, introduceImg } = this.state;
          const _values = this.formatValue(values)
          if (id) {//修改
            UpdataBrandApi({ id, ..._values }).then(res => {
              message.success("保存成功");
              this.props.history.push("/account/brandManage");
            });
          } else {//新建
            AddBrandApi({ ..._values }).then(res => {
              message.success("保存成功");
              this.props.history.push("/account/brandManage");
            });
          }
        } else {
          this.props.form.setFields({
            brandNameCn: {
              value: "",
              errors: [new Error("中文名称和英文名称至少必填一个")]
            },
            brandNameEn: { value: "", errors: [] }
          });
        };
      }
    });
  };
  formatValue = (values) => {
    const { introduceImg,logo } = this.state;
    const { time, ..._values } = values;
    if (time && time[0]) {
      _values.validityStart = moment(time[0]).format("YYYY-MM-DD");
      _values.validityEnd = moment(time[1]).format("YYYY-MM-DD");
    };
    const imgs = [];
    if(introduceImg[0]){
      introduceImg.map(item=>{
        imgs.push(item.response.result)
      });
    };
    _values.introduceImg = imgs;
    if(logo[0]){
      _values.logo = logo[0].response.result;
    };
    return _values;
  };
  upDateList = fileList => {
    this.setState({ logo: fileList });
  };
  upAuthList = fileList => {
    this.setState({ introduceImg: fileList });
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
  onSearch = value => {
    BrandAddressApi({ brandCountry: value }).then(res => {
      if (res.httpCode == 200) {
        this.setState({
          addressList: res.result
        });
      }
    });
  };
  render() {
    const { infos, logo, isSq, introduceImg, addressList } = this.state;
    console.log(introduceImg);
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="oms-common-addEdit-pages">
        <Form>
          <Form.Item
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            style={{ marginBottom: 0 }}
            label="品牌中文名称"
          >
            <Form.Item style={{ display: "inline-block" }}>
              {getFieldDecorator("brandNameCn", {
                initialValue: infos.brandNameCn
              })(
                <Input
                  style={{ width: "180px" }}
                  maxLength={10}
                  placeholder="品牌中文名称，10字以内"
                  autoComplete="off"
                />
              )}
            </Form.Item>
            　
            <Form.Item style={{ display: "inline-block" }}>
              {getFieldDecorator("brandNameEn", {
                initialValue: infos.brandNameEn
              })(
                <Input
                  style={{ width: "180px" }}
                  maxLength={50}
                  placeholder="品牌英文名称，50字以内"
                  autoComplete="off"
                />
              )}
            </Form.Item>
            <span className="tips suffix_tips">
              　注：中文名称和英文名称至少必填一个
            </span>
          </Form.Item>
          <Form.Item
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            label="品牌归属地"
          >
            {getFieldDecorator("brandCountry", {
              initialValue: infos.brandCountry,
              rules: [{ required: true, message: "请输入品牌归属地" }]
            })(
              <AutoComplete
                dataSource={addressList}
                style={{ width: 200 }}
                onSelect={this.onSelect}
                onSearch={this.onSearch}
                placeholder="请选择归属地"
              />
            )}
          </Form.Item>
          <Form.Item
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 6 }}
            label="品牌状态"
          >
            {getFieldDecorator("status", {
              initialValue: infos.status ? infos.status : undefined,
              rules: [{ required: true, message: "请选择" }]
            })(
              <Select placeholder="请选择">
                <Option value={1}>启用</Option>
                <Option value={0}>不启用</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 6 }}
            label="品牌授权"
          >
            {getFieldDecorator("isSq", {
              initialValue: infos.isSq,
              onChange: this.changeIsSq,
              rules: [{ required: true, message: "请选择" }]
            })(
              <Radio.Group>
                <Radio value={1}>有</Radio>
                <Radio value={0}>无</Radio>
              </Radio.Group>
            )}
          </Form.Item>

          {isSq == 1 && (
            <React.Fragment>
              <Form.Item
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                label="授权图片"
                className="brand_img"
              >
                <UploadIsSq
                  upDateList={this.upAuthList}
                  fileList={introduceImg}
                  limit={3}
                />
                <div className="brand_desc">
                  <p>　1、该图片可能展示在前端，请尽量保证图片美观；</p>
                  <p>　2、最多可传3张，单图片大小不得超过 3MB；</p>
                </div>
              </Form.Item>
              <Form.Item
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 6 }}
                label="授权有效期"
              >
                {getFieldDecorator("time", {
                  initialValue: infos.validityStart
                    ? [moment(infos.validityStart), moment(infos.validityEnd)]
                    : null,
                  rules: [{ required: true, message: "请选择授权有效期" }]
                })(<RangePicker format="YYYY-MM-DD" />)}
              </Form.Item>
            </React.Fragment>
          )}
          <Form.Item
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            label="品牌logo"
            className="brand_img"
          >
            <UploadLogo
              upDateList={this.upDateList}
              fileList={logo}
              width={500}
              height={500}
            />
            <div className="brand_desc">
              <p>　1、可传1张，图片大小不得超过 3MB；</p>
              <p>　2、上传图片尺寸需为500*500；</p>
            </div>
          </Form.Item>
          <Form.Item
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 6 }}
            label="品牌介绍"
          >
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
