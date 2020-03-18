import { Component } from "react";
import { Modal, Form, Input, Radio } from "antd";
import { connect } from "dva";
import "../index.less";
const FormItem = Form.Item;

class BatchModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radioValue: 2
    };
  }
  onOk = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const goodLists= [...this.props.goodLists];
        if(goodLists.length>0){
          if(this.props.type==1){//活动最大可售卖数量
            goodLists.map(item=>{
              item.maxQty = values.maxQty;
            });
          };
          if(this.props.type==2){//每账号每单限购
            goodLists.map(item=>{
              item.perOrderLimit = values.maxQty;
            });
            
          };
          if(this.props.type==3){//每账号每天限购
            goodLists.map(item=>{
              item.perDayLimit = values.maxQty;
            });
          };
          if(this.props.type==4){//每账号总限购
            goodLists.map(item=>{
              item.perUserLimit = values.maxQty;
            });
          };
          this.props.dispatch({
            type:'ctipActivityAddTwo/refreshLists',
            payload:{goodLists}
          });
          this.onCancel();
        };
      }
    });
  };
  onChange = e => {
    const { value } = e.target;
    this.setState({
      radioValue: value
    });
  };
  onCancel = () => {
    this.props.setBatchVisible();
    this.props.form.resetFields();
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { radioValue } = this.state;
    const { visible, type } = this.props;
    return (
      <div>
        <Modal
          width="400"
          title={
            type == 1
              ? "批量设置最多可参与的活动商品数"
              : type == 2
              ? "批量设置每账号每单限购"
              : type == 3
              ? "批量设置每账号每天限购"
              : "批量设置每账号总限购"
          }
          visible={visible}
          onOk={this.onOk}
          onCancel={this.onCancel}
        >
          <Form>
            <FormItem label="">
              {getFieldDecorator("pdCode", {
                initialValue: radioValue
              })(
                <Radio.Group onChange={this.onChange}>
                  <Radio value={1}>不设置</Radio>
                  <Radio value={2}>
                    设置　
                    {radioValue == 2 && (
                      <FormItem className="setMax">
                        {getFieldDecorator("maxQty", {
                          rules: [{ required: true, message: "请填写设置数量" }]
                        })(<Input style={{ width: "100px" }} />)}
                      </FormItem>
                    )}
                  </Radio>
                </Radio.Group>
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { ctipActivityAddTwo } = state;
  return ctipActivityAddTwo;
}
const BatchModals = Form.create()(BatchModal);
export default connect(mapStateToProps)(BatchModals);
