
import {
  Input,Spin,Form,Select,Table,Card,
  Row,Col,Checkbox,Button,DatePicker
} from 'antd';
import { BaseEditTable, QupLoadImgLimt, Qbtn } from 'common';

const { RangePicker } = DatePicker;
let FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };

const NewUserGift=({...props})=> {
  const [form] = Form.useForm();
  const submit=()=> {

  }
  const onValuesChange=()=> {

  }
  return (
    <Spin tip="加载中..." spinning={false}>
      <div className="oms-common-addEdit-pages baseGoods-addEdit-pages">
        <Form
          onValuesChange={onValuesChange}
          className="common-addEdit-form"
          form={form}
          {...formItemLayout}>
          <Card title="新人礼设置">
            <QupLoadImgLimt
              label="新人礼图片"
              rules={[{ required: true, message: '请上传图片' } ]}
              name="newComerPicUrl"
              fileList={[]}
              width={343}
              height={71}
              limit="1">
              <span>图片宽高比为343:71，支持png格式，大小在2m以内</span>
            </QupLoadImgLimt>
            <QupLoadImgLimt
              label="优惠券弹窗背景图"
              rules={[{ required: true, message: '请上传图片' } ]}
              name="couponPopUpPicUrl"
              fileList={[]}
              width={69}
              height={70}
              limit="1">
              <span>图片宽高比为69:70，支持png格式，大小在2m以内</span>
            </QupLoadImgLimt>
            <FormItem label="模块展示时间" name="time">
              <RangePicker format="YYYY-MM-DD HH:mm"/>
            </FormItem>
            <FormItem label="选择优惠券">
              <BaseEditTable
                btnText="新增"
                dataSource={[]}
                columns={[]}/>
            </FormItem>
          </Card>
          <Card title="SKU信息">
            <FormItem label="设置模块背景色号" name="moduleBackColor">
              SKU信息
            </FormItem>
          </Card>
          <div className="handle-operate-save-action">
            <Qbtn onClick={()=>submit(0)}>保存</Qbtn>
            <Qbtn size="free" onClick={()=>submit(1)}>保存并提交审核</Qbtn>
          </div>
        </Form>
      </div>
    </Spin>
  )
}

export default NewUserGift;
