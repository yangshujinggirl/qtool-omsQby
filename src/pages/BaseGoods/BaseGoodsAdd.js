import {
  Form,Input,Icon,
  Select,Row,Col,Checkbox,
  Button,Radio,AutoComplete,
} from 'antd';
import { Qtable } from 'common';
import { columnsAdd } from './column'

let FormItem = Form.Item;
const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };
const formItemLayoutBig = {
      labelCol: {
        xs: { span: 4 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 20 },
        sm: { span: 20 },
      },
    };
class BaseGoodsAdd extends React.Component {
  render() {
    console.log(this.props)
    const { getFieldDecorator } = this.props.form;
    return(
      <div className="oms-common-addEdit-pages">
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="spu编码">
            {getFieldDecorator('email')(
                <Input placeholder="请输入spu编码" autoComplete="off"/>
            )}
          </Form.Item>
          <Form.Item
            label="商品名称">
            {getFieldDecorator('nickname', {
              rules: [{ required: true, message: '请输入商品名称'}],
            })(<Input placeholder="请输入商品名称" autoComplete="off"/>)}
          </Form.Item>
          <Form.Item label="货主">
            {getFieldDecorator('phone', {
                rules: [{ required: true, message: '请输入货主' }],
              })(
                <Input placeholder="请输入货主" autoComplete="off"/>
            )}
          </Form.Item>
          <Form.Item label="商品类型">
            {getFieldDecorator('radio-group')(
              <Radio.Group>
                <Radio value="a">普通商品</Radio>
                <Radio value="b">赠品</Radio>
              </Radio.Group>,
            )}
          </Form.Item>
          <FormItem label='品牌' {...formItemLayout}>
             {
               getFieldDecorator('pdBrandId',{
                 rules: [{ required: true, message: '请选择商品品牌'}],
                 initialValue:''
               })(
                 <AutoComplete
                  dataSource={[]}
                  placeholder="请选择商品品牌"/>
               )
             }
          </FormItem>
          <Form.Item label="品牌归属地">
            {getFieldDecorator('website', {
              rules: [{ required: true, message: '请输入品牌归属地' }],
            })(
              <Input disabled autoComplete="off" placeholder="请输入品牌归属地"/>
            )}
          </Form.Item>
          <FormItem label='产地' {...formItemLayout}>
             {getFieldDecorator('pdCountryId',{
               rules: [{ required: true, message: '请选择产地'}],
             })(
               <Select placeholder="请选择产地">
                 <Option value="red">Red</Option>
                 <Option value="green">Green</Option>
                 <Option value="blue">Blue</Option>
               </Select>
             )}
           </FormItem>
          <Form.Item label="后台一级类目">
            {getFieldDecorator('select-multiple', {
              rules: [
                { required: true, message: '请选择后台一级类目'},
              ],
            })(
              <Select placeholder="请选择后台一级类目">
                <Option value="red">Red</Option>
                <Option value="green">Green</Option>
                <Option value="blue">Blue</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="后台二级类目">
            {getFieldDecorator('select-multiple', {
              rules: [
                { required: true, message: '请选择后台二级类目'},
              ],
            })(
              <Select placeholder="请选择后台二级类目">
                <Option value="red">Red</Option>
                <Option value="green">Green</Option>
                <Option value="blue">Blue</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="后台三级类目">
            {getFieldDecorator('select-multiple', {
              rules: [
                { required: true, message: '请选择后台三级类目'},
              ],
            })(
              <Select placeholder="请选择后台三级类目">
                <Option value="red">Red</Option>
                <Option value="green">Green</Option>
                <Option value="blue">Blue</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="后台四级类目">
            {getFieldDecorator('select-multiple', {
              rules: [
                { required: true, message: '请选择后台四级类目'},
              ],
            })(
              <Select mode="multiple" placeholder="请选择后台四级类目">
                <Option value="red">Red</Option>
                <Option value="green">Green</Option>
                <Option value="blue">Blue</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="分润服务扣点">
            {getFieldDecorator('website', {
              rules: [{ required: true, message: '请输入分润服务扣点' }],
            })(
              <Input placeholder="请输入分润服务扣点"/>
            )}
          </Form.Item>
          <Form.Item label="联营分成类别">
            {getFieldDecorator('radio-group')(
              <Radio.Group>
                <Radio value="a">食品类</Radio>
                <Radio value="b">非食品类</Radio>
              </Radio.Group>,
            )}
          </Form.Item>
          <Form.Item label="销售端">
            {getFieldDecorator('radio-group')(
              <Checkbox.Group>
                <Checkbox value="A">B端</Checkbox>
                <Checkbox value="B">C端</Checkbox>
              </Checkbox.Group>
            )}
          </Form.Item>
          <Form.Item label="是否预售">
            {getFieldDecorator('radio-group')(
              <Radio.Group>
                <Radio value="a">是</Radio>
                <Radio value="b">否</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label="发货类型">
            {getFieldDecorator('radio-group')(
              <Radio.Group>
                <Radio value="a">系统发货</Radio>
                <Radio value="b">非食品类</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label="商品描述">
            {getFieldDecorator('radio-group')(
              <Input placeholder="请输入商品描述"/>
            )}
          </Form.Item>
          <Form.Item label="商品SKU规格1">
            {getFieldDecorator('radio-group')(
              <Select mode="multiple" placeholder="Please select favourite colors">
                <Option value="red">Red</Option>
                <Option value="green">Green</Option>
                <Option value="blue">Blue</Option>
                <Option value="blue">yellow</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="商品SKU规格2">
            {getFieldDecorator('radio-group')(
              <Select mode="multiple" placeholder="Please select favourite colors">
                <Option value="red">Red</Option>
                <Option value="green">Green</Option>
                <Option value="blue">Blue</Option>
                <Option value="blue">yellow</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="商品信息" {...formItemLayoutBig}>
            <Qtable dataSource={[]} columns={columnsAdd}/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
const BaseGoodsAddF = Form.create()(BaseGoodsAdd);
export default BaseGoodsAddF;
