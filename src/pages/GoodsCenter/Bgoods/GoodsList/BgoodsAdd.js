// import { Form, Input, Radio, message, Checkbox } from "antd";
// import { GetGoodDetailApi, saveGoodApi } from "api/home/Bgoods";
// import QupLoadImgLimt from "common/QupLoadImgLimt";
// import { Qbtn } from "common";
// let FormItem = Form.Item;
// const formItemLayout = {
//   labelCol: {
//     xs: { span: 24 },
//     sm: { span: 4 }
//   },
//   wrapperCol: {
//     xs: { span: 24 },
//     sm: { span: 12 }
//   }
// };
// class BgoodsAdd extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       infos: {},
//       fileList: []
//     };
//   }
//   componentDidMount() {
//     const { id } = this.props.match.params;
//     GetGoodDetailApi({ sku_id: id, saleRange: "b" }).then(res => {
//       const fileList = [
//         {
//           uid: "-1",
//           name: "image.png",
//           status: "done",
//           url: res.result.image
//         }
//       ];
//       this.setState({
//         infos: res.result,
//         fileList
//       });
//     });
//   }
//   handleSubmit=async()=>{
//     console.log(await form.validateFields())
//   }
//   // handleSubmit = () => {
//   //   this.props.form.validateFieldsAndScroll((err, values) => {
//   //     console.log(values);
//   //     if (!err) {
//   //       values.image = this.state.fileList[0].response
//   //         ? this.state.fileList[0].response.result
//   //         : this.state.fileList[0].url;
//   //       saveGoodApi({
//   //         saleRange: "b",
//   //         id: this.props.match.params.id,
//   //         ...values
//   //       }).then(res => {
//   //         message.success("保存成功");
//   //         this.props.history.push("/account/Bsite");
//   //       });
//   //     }
//   //   });
//   // };
//   upDateList = fileList => {
//     this.setState({ fileList });
//   };
//   goBack = () => {
//     this.props.history.push("/account/Bsite");
//   };
//   render() {
//     const { infos, fileList } = this.state;
//     const { getFieldDecorator } = this.props.form;
//     const [form] = Form.useForm();
//     return (
//       <div className="oms-common-addEdit-pages">
//         <Form>
//           <div>
//             <h4 className="oms_edit_title">基础信息</h4>
//             <Form.Item label="spu编码">{infos.spuCode}</Form.Item>
//             <Form.Item label="品牌">{infos.supplierName}</Form.Item>
//             <Form.Item label="基础商品名称">{infos.skuCode}</Form.Item>
//             <Form.Item label="品牌归属地">{infos.productName}</Form.Item>
//             <Form.Item label="后台类目">{infos.salesAttributeName}</Form.Item>
//             <Form.Item label="产地">{infos.barCode}</Form.Item>
//             <Form.Item label="B端商品名称">
//               {getFieldDecorator("weight", {
//                 initialValue: infos.weight,
//                 rules: [{ required: true, message: "请输入重量" }]
//               })(<Input placeholder="请输入B端商品名称" autoComplete="off" />)}
//             </Form.Item>
//             <Form.Item name="name" label="B端商品名称">
//               <Input placeholder="请输入B端商品名称" autoComplete="off" />
//             </Form.Item>
//           </div>
//           <div>
//             <h4 className="oms_edit_title">销售信息</h4>
//             <Form.Item label="供货方式">代发（下单后7个工作日发货）</Form.Item>
//             <Form.Item label="是否预售">
//               {getFieldDecorator("isBeforeSales", {
//                 initialValue: infos.isBeforeSales,
//                 rules: [{ required: true, message: "请选择是否预售" }]
//               })(
//                 <Radio.Group>
//                   <Radio value={0}>非预售</Radio>
//                   <Radio value={1}>预售</Radio>
//                 </Radio.Group>
//               )}
//             </Form.Item>
//             <Form.Item label="商品标签">
//               {getFieldDecorator("high", {
//                 initialValue: infos.high,
//                 rules: [{ required: true, message: "请输入货主" }]
//               })(
//                 <Checkbox.Group style={{ width: "100%" }}>
//                   <Checkbox value="A">A</Checkbox>
//                   <Checkbox value="B">B</Checkbox>
//                 </Checkbox.Group>
//               )}
//             </Form.Item>
//           </div>
//           <div>
//             <h4 className="oms_edit_title">销售信息</h4>
//           </div>
//           <Form.Item label="B端参考价(元)">
//             {getFieldDecorator("bprice", {
//               initialValue: infos.bprice,
//               rules: [{ required: true, message: "请输入B端参考价" }]
//             })(<Input placeholder="请输入B端参考价" autoComplete="off" />)}
//           </Form.Item>
//           <Form.Item label="税率">
//             {getFieldDecorator("taxRate", {
//               initialValue: infos.taxRate,
//               rules: [{ required: true, message: "请输入税率" }]
//             })(<Input placeholder="请输入税率" autoComplete="off" />)}
//           </Form.Item>
//           <Form.Item label="采购价(元)">
//             {getFieldDecorator("purchasePrice", {
//               initialValue: infos.purchasePrice,
//               rules: [{ required: true, message: "请输入采购价" }]
//             })(<Input placeholder="请输入采购价" autoComplete="off" />)}
//           </Form.Item>
//           <Form.Item label="金卡价(元)">
//             {getFieldDecorator("goldCardPrice", {
//               initialValue: infos.goldCardPrice,
//               rules: [{ required: true, message: "请输入金卡价" }]
//             })(<Input placeholder="请输入金卡价" autoComplete="off" />)}
//           </Form.Item>
//           <Form.Item label="银卡价(元)">
//             {getFieldDecorator("silverCardPrice", {
//               initialValue: infos.silverCardPrice,
//               rules: [{ required: true, message: "请输入银卡价" }]
//             })(<Input placeholder="请输入银卡价" autoComplete="off" />)}
//           </Form.Item>
//           <Form.Item label="上下架状态">
//             {getFieldDecorator("upperStatus", {
//               initialValue: infos.upperStatus
//             })(
//               <Radio.Group>
//                 <Radio value={1}>上架</Radio>
//                 <Radio value={0}>下架</Radio>
//               </Radio.Group>
//             )}
//           </Form.Item>
//           <Form.Item label="商品图片">
//             <QupLoadImgLimt upDateList={this.upDateList} fileList={fileList} />
//           </Form.Item>
//           <Form.Item label="商品说明">
//             {getFieldDecorator("skuRemark", {
//               initialValue: infos.skuRemark
//             })(<Input.TextArea rowSpan={6} colSpan={5} />)}
//           </Form.Item>
//           <div className="handle-operate-save-action">
//             <Qbtn onClick={this.goBack}>返回</Qbtn>
//             <Qbtn onClick={this.handleSubmit}>保存</Qbtn>
//           </div>
//         </Form>
//       </div>
//     );
//   }
// }
// const BgoodsAdds = Form.create({})(BgoodsAdd);
// export default BgoodsAdds;
import React, { Component } from "react";
import { Form, Input, Button, Checkbox } from "antd";

class BgoodsAdd extends Component {
  onCheck=async()=>{
    console.log(await form.validateFields())
  }
  render() {
    const [form] = Form.useForm();
    return (
      <div>
        <Form form={form} name="dynamic_rule">
          <Form.Item
            name="username"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input your name"
              }
            ]}
          >
            <Input placeholder="Please input your name" />
          </Form.Item>
          <Form.Item {...formTailLayout}>
            <Button type="primary" onClick={onCheck}>
              Check
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default BgoodsAdd;
