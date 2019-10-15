import { Form, Input, Select, message } from "antd";
import { GetInfoApi, AddBrandApi,UpdataBrandApi } from "api/home/Brand";
import QupLoadImgLimt from 'common/QupLoadImgLimt'
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
      infos: {},
      fileList:[]
    };
  }
  componentDidMount() {
    const {id} = this.props.match.params;
    if(id){
      this.setState({id});
      GetInfoApi({brandId:id}).then(res => {
        this.setState({
          infos: res.result
        });
      });
    };
  }
  handleSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const {id} = this.state;
        values.logo = this.state.fileList[0].response.result;
        if(id){//修改
          UpdataBrandApi({id,...values}).then(res => {
            message.success("保存成功");
            this.props.history.push('/account/brandManage');
          });
        }else{//新建
          AddBrandApi({...values}).then(res => {
            message.success("保存成功");
            this.props.history.push('/account/brandManage');
          });
        };
      };
    });
  };
  upDateList=(fileList)=>{
    this.setState({fileList})
  }
  render() {
    const { infos,fileList } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="oms-common-addEdit-pages">
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="品牌中文名称">
            {getFieldDecorator("brandNameCn", {
              initialValue: infos.brandNameCn
            })(<Input placeholder="请输入品牌中文名称" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="品牌英文名称">
            {getFieldDecorator("brandNameEn", {
              initialValue: infos.length,
            })(<Input placeholder="请输入品牌英文名称" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="品牌状态">
            {getFieldDecorator("status", {
              initialValue: infos.status,
              rules: [{ required: true, message: "请选择" }]
            })(
              <Select>
                <Option value={1}>启用</Option>
                <Option value={0}>不启用</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="品牌归属地">
            {getFieldDecorator("brandCountry", {
              initialValue: infos.brandCountry,
              rules: [{ required: true, message: "请输入品牌归属地" }]
            })(<Input placeholder="请输入品牌归属地" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="品牌logo">
          <QupLoadImgLimt upDateList={this.upDateList} fileList={fileList}/>
          </Form.Item>
          <Form.Item label="品牌授权">
            {getFieldDecorator("isSq",{
              initialValue: infos.isSq,
              rules: [{ required: true, message: "请选择" }]
            })(
              <Select>
                <Option value={1}>有</Option>
                <Option value={0}>无</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="品牌介绍">
            {getFieldDecorator("brandIntroduce", {
              initialValue: infos.brandIntroduce
            })(<Input.TextArea rows={7} cols={6} maxLength='400' placeholder='请输入品牌介绍，400字符以内' />)}
          </Form.Item>
          <div className="handle-operate-save-action">
            <Qbtn>保存</Qbtn>
          </div>
        </Form>
      </div>
    );
  }
}
const BrandAdds = Form.create({})(BrandAdd);
export default BrandAdds;
