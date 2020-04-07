import {
  Input,
  Select,
  message,
  Radio,
  AutoComplete,
  DatePicker,
  Form
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
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};

class BrandAdd extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      isSq: "",
      logo: [],
      introduceImg: [],
      addressList: []
    };
  }
  componentDidMount() {
    this.getInfos();
  }
  /**
   * 获取详情
   */
  getInfos = () => {
    const { id } = this.props.match.params;
    if (id) {
      GetInfoApi({ brandId: id }).then(res => {
        if (res.httpCode == 200) {
          this.getValueFormat(res);
        }
      });
    }
  };
  /**
   * 数据格式化
   */
  getValueFormat = res => {
    let {
      logo,
      introduceImgList,
      validityStart,
      validityEnd,
      ...infos
    } = res.result;
    let introduceImg=[];
    logo = [
      {
        uid: "-1",
        name: "image.png",
        status: "done",
        url: sessionStorage.getItem("oms_fileDomain") + logo,
        img:logo
      }
    ];
    if (introduceImgList && introduceImgList.length) {
      introduceImgList.map((item, index) => {
        const obj = {
          uid: index,
          name: "image.png",
          status: "done",
          url: sessionStorage.getItem("oms_fileDomain") + item,
          img:item
        };
        introduceImg.push(obj);
      });
    }
    infos.logo = logo;
    infos.introduceImg = introduceImg;
    infos.time = [moment(validityStart), moment(validityEnd)];
    this.formRef.current.setFieldsValue(infos);
    this.setState({
      logo,
      introduceImg,
      isSq:infos.isSq
    });
  };
  /**
   * 提交
   */
  handleSubmit = deBounce(async () => {
    const brandNameEn = this.formRef.current.getFieldValue("brandNameEn");
    const brandNameCn = this.formRef.current.getFieldValue("brandNameCn");
    if (!brandNameEn && !brandNameCn) {
      this.formRef.current.setFields([
        { name: ["brandNameCn"], errors: ["中文名称和英文名称至少必填一个"] }
      ]);
    }
    const values = await this.formRef.current.validateFields();
    const { id } = this.props.match.params;
    const _values = this.formatValue(values);
    if (id) {
      //修改
      UpdataBrandApi({ id, ..._values }).then(res => {
        if (res.httpCode == 200) {
          message.success("保存成功",.8);
          this.props.history.push("/account/brand");
        }
      });
    } else {
      //新建
      AddBrandApi({ ..._values }).then(res => {
        if (res.httpCode == 200) {
          message.success("保存成功",.8);
          this.props.history.push("/account/brand");
        }
      });
    }
  }, 500);
  /**
   * 数据格式化
   */
  formatValue = values => {
    const { logo } = this.state;
    const imgs = [];
    const { time, introduceImg, ..._values } = values;
    if (time && time[0]) {
      _values.validityStart = moment(time[0]).format("YYYY-MM-DD");
      _values.validityEnd = moment(time[1]).format("YYYY-MM-DD");
    }
    if (introduceImg&&introduceImg[0]) {
      introduceImg.map(item => {
        imgs.push(item.response ? item.response.result : item.img);
      });
    }
    if (logo&&logo[0]) {
      _values.logo = logo[0].response ? logo[0].response.result : logo[0].img;
    }
    _values.introduceImgList = imgs;
    return _values;
  };
  /**
   * 品牌图片
   */
  upDateList = fileList => {
    this.setState({ logo: fileList });
  };
  /**
   * 授权图片
   */
  upAuthList = fileList => {
    this.setState({ introduceImg: fileList });
  };
  /**
   * 更改品牌授权
   */
  changeIsSq = e => {
    const { value } = e.target;
    this.setState({
      isSq: value
    });
  };
  /**
   * 搜索品牌归属地
   */
  onSearch = deBounce(value => {
    if (/^[\u2E80-\u9FFF]+$/.test(value)) {
      BrandAddressApi({ brandCountry: value }).then(res => {
        if (res.httpCode == 200) {
          this.setState({
            addressList: res.result
          });
        }
      });
    }
  }, 500);
  onChange = () => {
    const errors = this.formRef.current.getFieldError("brandNameCn");
    if (errors) {
      this.formRef.current.setFields([{ name: ["brandNameCn"], errors: [] }]);
    }
  };
  render() {
    const { logo, isSq, introduceImg, addressList } = this.state;
    return (
      <div className="oms-common-addEdit-pages add_brand">
        <Form
          ref={this.formRef}
          className="common-addEdit-form"
          {...formItemLayout}
        >
          <Form.Item className='item_required' style={{ marginBottom: 0 }} label="品牌中文名称">
            <Form.Item
              name="brandNameCn"
              style={{ display: "inline-block", marginRight: "10px" }}
            >
              <Input
                maxLength={10}
                placeholder="品牌中文名称，10字以内"
                autoComplete="off"
                onChange={this.onChange}
              />
            </Form.Item>
            <Form.Item name="brandNameEn" style={{ display: "inline-block" }}>
              <Input
                maxLength={50}
                placeholder="品牌英文名称，50字以内"
                autoComplete="off"
              />
            </Form.Item>
            <span className="tips suffix_tips">
              　注：中文名称和英文名称至少必填一个
            </span>
          </Form.Item>
          <Form.Item
            label="品牌归属地"
            name="brandCountry"
            rules={[{ required: true, message: "请输入品牌归属地" }]}
          >
            <AutoComplete
              dataSource={addressList}
              onSelect={this.onSelect}
              onSearch={this.onSearch}
              placeholder="请选择"
            />
          </Form.Item>
          <Form.Item
            name="status"
            label="品牌状态"
            rules={[{ required: true, message: "请选择" }]}
          >
            <Select placeholder="请选择" allowClear={true}>
              <Option value={1}>启用</Option>
              <Option value={0}>禁用</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="isSq"
            label="品牌授权"
            rules={[{ required: true, message: "请选择" }]}
          >
            <Radio.Group onChange={this.changeIsSq}>
              <Radio value={true}>有</Radio>
              <Radio value={false}>无</Radio>
            </Radio.Group>
          </Form.Item>
          {isSq && (
            <React.Fragment>
              <Form.Item labelCol={{ span: 4 }} label="授权图片" className='sq_img'>
                <UploadIsSq
                  name="introduceImg"
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
                name="time"
                rules={[{ required: true, message: "请选择授权有效期" }]}
              >
                <RangePicker format="YYYY-MM-DD" />
              </Form.Item>
              <Form.Item name="isTransfer" label="是否转授权">
                <Radio.Group>
                  <Radio value={true}>是</Radio>
                  <Radio value={false}>否</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 6 }}
                label="授权级别"
                name="transLevel"
              >
                <Select placeholder="请选择" allowClear={true}>
                  <Option key={1} value={1}>
                    1级授权
                  </Option>
                  <Option key={2} value={2}>
                    2级授权
                  </Option>
                  <Option key={3} value={3}>
                    3级授权
                  </Option>
                </Select>
              </Form.Item>
            </React.Fragment>
          )}
          <Form.Item label="品牌logo" className="sq_img">
            <UploadLogo
              name="logo"
              width={500}
              height={500}
              upDateList={this.upDateList}
              fileList={logo}
              limit={1}
            />
            <div className="brand_desc">
              <p>　1、可传1张，图片大小不得超过 3MB；</p>
              <p>　2、上传图片尺寸需为500*500；</p>
            </div>
          </Form.Item>
          <Form.Item label="品牌介绍" name="brandIntroduce">
            <Input.TextArea
              rows={7}
              cols={6}
              maxLength="400"
              placeholder="请输入品牌介绍，400字符以内"
            />
          </Form.Item>
          <div className="handle-operate-save-action">
            <Qbtn onClick={this.handleSubmit}>保存</Qbtn>
          </div>
        </Form>
      </div>
    );
  }
}
export default BrandAdd;
