import { Component } from "react";
import { Modal, Form, Input, message } from "antd";
import Discount from "./Discount";
import { connect } from "dva";
import "../index.less";
const FormItem = Form.Item;

class setModal extends Component {
  constructor(props) {
    super(props);
  }
  onOk = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (
          +values.perOrderLimit > +values.perDayLimit ||
          +values.perDayLimit > +values.perUserLimit
        ) {
          return message.error(
            "每单限购小于每天限购小于每账号限购，请重新填写"
          );
        }
        let goodLists = [...this.props.goodLists];
        let obj = goodLists[this.props.currentIndex];
        obj = { ...obj, ...values };
        obj.promotionRules = [...this.props.promotionRules];
        goodLists[this.props.currentIndex] = obj;
        this.props.dispatch({
          type: "ctipActivityAddTwo/refreshLists",
          payload: { goodLists }
        });
        this.onCancel();
      }
    });
  };
  onCancel = () => {
    this.props.onVisible();
    this.props.form.resetFields();
  };
  validateActPrice = (rule, value, callback) => {
    if (value && value >= this.props.currentRecord.sellPrice) {
      callback("活动价需小于C端售价");
    }
    callback();
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible, currentRecord, promotionType } = this.props;
    return (
      <div>
        <Modal
          width={promotionType == "11" ? 1100 : 700}
          title="编辑商品"
          visible={visible}
          onOk={this.onOk}
          onCancel={this.onCancel}
          wrapClassName="reset_goods"
        >
          <div>
            <Form>
              <FormItem
                label="商品编码"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                <span>{currentRecord.pdCode}</span>
              </FormItem>
              {promotionType == 11 && (
                <FormItem
                  className="must-pic"
                  label="优惠内容"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                >
                  {promotionType == 11 && <Discount form={this.props.form} />}
                </FormItem>
              )}
              {promotionType == 10 && (
                <FormItem
                  label="活动价"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                >
                  {getFieldDecorator("activityPrice", {
                    initialValue: currentRecord.activityPrice,
                    rules: [
                      { required: true, message: "请输入活动价" },
                      { validator: this.validateActPrice }
                    ]
                  })(<Input style={{ width: "100px" }} autoComplete="off" />)}
                </FormItem>
              )}
              <FormItem
                label="最多可参与活动的商品数"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                {getFieldDecorator("maxQty", {
                  initialValue: currentRecord.maxQty
                })(<Input style={{ width: "100px" }} autoComplete="off" />)}
                <span className="suffix_tips">
                  如不填写视为商品的所有库存均参与活动
                </span>
              </FormItem>
              {(promotionType == 10 || promotionType == 11) && (
                <div>
                  <div className="limit_tips">
                    限购设置规则：每单限购小于每天限购小于每账号限购
                  </div>
                  <FormItem
                    label="活动期间每人每单限购"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                  >
                    {getFieldDecorator("perOrderLimit", {
                      initialValue: currentRecord.perOrderLimit
                    })(<Input style={{ width: "100px" }} autoComplete="off" />)}
                    <span className="suffix_tips">如不填写则不限制购买数量</span>
                  </FormItem>
                  <FormItem
                    label="活动期间每人每天限购"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                  >
                    {getFieldDecorator("perDayLimit", {
                      initialValue: currentRecord.perDayLimit
                    })(<Input style={{ width: "100px" }} autoComplete="off" />)}
                    <span className="suffix_tips">如不填写则不限制购买数量</span>
                  </FormItem>
                  <FormItem
                    label="活动期间每人每账号限购"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                  >
                    {getFieldDecorator("perUserLimit", {
                      initialValue: currentRecord.perUserLimit
                    })(<Input style={{ width: "100px" }} autoComplete="off" />)}
                    <span className="suffix_tips">如不填写则不限制购买数量</span>
                  </FormItem>
                </div>
              )}
            </Form>
          </div>
        </Modal>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { ctipActivityAddTwo } = state;
  return ctipActivityAddTwo;
}
const setModals = Form.create({})(setModal);
export default connect(mapStateToProps)(setModals);
