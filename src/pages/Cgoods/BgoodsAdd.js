import { Form, Input, Radio } from "antd";
import { Qbtn } from 'common';
let FormItem = Form.Item;
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
class BgoodsAdd extends React.Component {
  handleSubmit = () => {};
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="oms-common-addEdit-pages">
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="spu编码">spu编码</Form.Item>
          <Form.Item label="货主">spu编码</Form.Item>
          <Form.Item label="sku编码">spu编码</Form.Item>
          <Form.Item label="sku商品名">spu编码</Form.Item>
          <Form.Item label="sku规格">spu编码</Form.Item>
          <Form.Item label="sku条码">spu编码</Form.Item>
          <Form.Item label="保质期">spu编码</Form.Item>
          <Form.Item label="税务号">spu编码</Form.Item>
          <Form.Item label="重量">
            {getFieldDecorator("nickname", {
              rules: [{ required: true, message: "请输入重量" }]
            })(<Input placeholder="请输入重量" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="长">
            {getFieldDecorator("phone", {
              rules: [{ required: true, message: "请输入货主" }]
            })(<Input placeholder="请输入货主" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="宽">
            {getFieldDecorator("phone", {
              rules: [{ required: true, message: "请输入货主" }]
            })(<Input placeholder="请输入货主" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="高">
            {getFieldDecorator("phone", {
              rules: [{ required: true, message: "请输入货主" }]
            })(<Input placeholder="请输入货主" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="B端参考价(元)">
            {getFieldDecorator("phone", {
              rules: [{ required: true, message: "请输入货主" }]
            })(<Input placeholder="请输入货主" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="税率">
            {getFieldDecorator("phone", {
              rules: [{ required: true, message: "请输入货主" }]
            })(<Input placeholder="请输入货主" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="采购价(元)">
            {getFieldDecorator("phone", {
              rules: [{ required: true, message: "请输入货主" }]
            })(<Input placeholder="请输入货主" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="金卡价(元)">
            {getFieldDecorator("phone", {
              rules: [{ required: true, message: "请输入货主" }]
            })(<Input placeholder="请输入货主" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="银卡价(元)">
            {getFieldDecorator("phone", {
              rules: [{ required: true, message: "请输入货主" }]
            })(<Input placeholder="请输入货主" autoComplete="off" />)}
          </Form.Item>

          <Form.Item label="上下架状态">
            {getFieldDecorator("radio-group")(
              <Radio.Group>
                <Radio value="a">上架</Radio>
                <Radio value="b">下架</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label="商品图片"></Form.Item>
          <Form.Item label="商品说明">
            {getFieldDecorator("radio-group")(
                <Input.TextArea rowSpan={6} colSpan={5}/>
            )}
          </Form.Item>
          <div className="handle-operate-save-action">
            <Qbtn>
              返回
            </Qbtn>
            <Qbtn>
              保存
            </Qbtn>
          </div>
        </Form>
      </div>
    );
  }
}
const BgoodsAdds = Form.create({})(BgoodsAdd);
export default BgoodsAdds;
