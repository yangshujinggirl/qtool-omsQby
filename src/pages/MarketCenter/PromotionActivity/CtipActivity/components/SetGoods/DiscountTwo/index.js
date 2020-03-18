import React, { Component } from "react";
import { Form, Input, Button, message } from "antd";
import { connect } from "dva";
const FormItem = Form.Item;
import "./index.less";
class DiscountTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  delete = index => {
    this.props.form.resetFields();
    const dataSource = [...this.props.dataSource];
    const goodLists = [...this.props.goodLists]
    dataSource.splice(index, 1);
    this.props.dispatch({
      type: "ctipActivityAddTwo/refreshdataSource",
      payload: { dataSource }
    });
    this.props.dispatch({
      type: "ctipActivityAddTwo/refreshLists",
      payload: { goodLists }
    });
  };
  add = () => {
    const dataSource = [...this.props.dataSource];
    const goodLists = [...this.props.goodLists]
    dataSource.push({ param: { leastAmount: "", reduceAmount: "" } });
    this.props.dispatch({
      type: "ctipActivityAddTwo/refreshdataSource",
      payload: { dataSource }
    });
    this.props.dispatch({
      type: "ctipActivityAddTwo/refreshLists",
      payload: { goodLists }
    });
  };
  onChange = (e, index, key) => {
    this.props.form.resetFields();
    const dataSource = [...this.props.dataSource];
    const goodLists = [...this.props.goodLists]
    dataSource[index]["param"][key] = e.target.value.replace(/\D/g,'').replace(/^[0]+/,'');
    this.props.dispatch({
      type: "ctipActivityAddTwo/refreshdataSource",
      payload: { dataSource }
    });
    this.props.dispatch({
      type: "ctipActivityAddTwo/refreshLists",
      payload: { goodLists }
    });
  };
  render() {
    let { dataSource,promotionType } = this.props;
    if(dataSource && dataSource.length == 0){
      switch(promotionType){
        case 22: dataSource=[{param:{"leastAmount":'',"reduceAmount":''}}]; break;
        case 23: dataSource=[{param:{"leastQty":'', "reduceQty":''}}];break;
      }
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="discountTwo">
        {promotionType == 22 &&
          <div className='discountTwo-tips'> 每阶梯的优惠力度需大于等于上一阶梯的优惠力度。例：满X送Y，每阶梯的Y/X需大于等于上一阶梯的Y/X</div>
        }
        {promotionType == 23 &&
          <div className='discountTwo-tips'> 每阶梯的优惠力度需大于上一阶梯的优惠力度。例：买X免Y，每阶梯X和Y均需大于上一阶梯的X和Y</div>
        }
        <Form>
          {dataSource && dataSource.length>0 && dataSource.map((item, index) => (
            <div className="step" key={index}>
              <div>
                {promotionType == 22 &&
                  <FormItem className="satified_price">
                    <span>
                      阶梯{index + 1}：<span style={{ color: "red" }}>*</span>单笔订单满　
                    </span>
                    {getFieldDecorator(`fieldValues[${index}].leastAmount`, {
                      initialValue: item.param.leastAmount,
                      getValueFromEvent:(event)=>{
                        return event.target.value.replace(/\D/g,'').replace(/^[0]+/,'')
                      },
                      onChange: e => {
                        this.onChange(e, index, "leastAmount");
                      },
                      rules: [
                        { required: true, message: "请填写优惠内容" },
                        {
                          validator: (rule, value, callback) => {
                            if (+value) {
                              if(+value>99999){ callback('需小于等于99999') };
                              const currentreduceAmount = +dataSource[index].param.reduceAmount||'';//当前减额
                              if(currentreduceAmount){
                                if(currentreduceAmount >= +value){
                                  callback('提示优惠金额需小于优惠门槛')
                                };
                              };
                              if(dataSource[index - 1]){
                                const prevleastAmount = +dataSource[index - 1].param.leastAmount //上一条门槛
                                const prevreduceAmount = +dataSource[index - 1].param.reduceAmount //上一条减额
                                if(prevleastAmount){
                                  if(+value <= prevleastAmount){
                                    callback('此阶梯优惠门槛需大于上一阶梯')
                                  };
                                  if(prevreduceAmount){
                                    const prevDiscount = prevreduceAmount/prevleastAmount //上一条折扣
                                    if(currentreduceAmount){
                                      const currentDiscount = currentreduceAmount/+value//当前折扣
                                      if(currentDiscount < prevDiscount){
                                        callback('此阶梯优惠力度需大于等于上一阶梯')
                                      };
                                    };
                                  };
                                };
                              }
                              if(dataSource[index+1]){
                                const nextleastAmount = +dataSource[index + 1].param.leastAmount;//下一条门槛
                                const nextreduceAmount = +dataSource[index + 1].param.reduceAmount;//下一条减额
                                if(nextleastAmount){
                                  if(+value >= nextleastAmount){
                                    callback('此阶梯优惠门槛需小于下一阶梯')
                                  };
                                  if(nextreduceAmount){
                                    const nextDiscount = nextreduceAmount/nextleastAmount//下一条折扣
                                    if(currentreduceAmount){
                                      const currentDiscount = currentreduceAmount/+value//当前折扣
                                      if(currentDiscount > nextDiscount){
                                        callback('此阶梯优惠力度需小于等于下一阶梯')
                                      };
                                    };
                                  };
                                };
                              };
                            };
                            callback()
                          }
                        }
                      ]
                    })(
                      <Input
                        autoComplete="off"
                        style={{ width: "150px" }}
                      />
                    )}　元, 减　
                </FormItem>
                }
                {promotionType == 23 &&
                  <FormItem className="satified_price">
                    阶梯{index + 1}：<span style={{ color: "red" }}>*</span> 单笔买满　
                    {getFieldDecorator(`fieldValues[${index}].leastQty`, {
                      initialValue: item.param.leastQty,
                      onChange: e => {
                        this.onChange(e, index, "leastQty");
                      },
                      getValueFromEvent:(event)=>{
                        return event.target.value.replace(/\D/g,'').replace(/^[0]+/,'')
                      },
                      rules: [
                        { required: true, message: "请填写优惠内容" },
                        {
                          validator: (rule, value, callback) => {
                            if (+value) {
                              if(+value>99){
                                callback('需小于等于99')
                              };
                              const currentReduceQty = dataSource[index].param.reduceQty;
                              if(currentReduceQty){
                                if(+value <= +currentReduceQty){
                                  callback('不得小于等于减额')
                                };
                              };
                              if(dataSource[index - 1] && dataSource[index - 1].param.leastQty){
                                const prevLeastQty = +dataSource[index - 1].param.leastQty;//上一条门槛
                                if(+value <= prevLeastQty){
                                  callback('此阶梯优惠门槛需大于上一阶梯')
                                };
                              };
                              if(dataSource[index+1] && dataSource[index + 1].param.leastQty){
                                const nextLeastQty = +dataSource[index + 1].param.leastQty;//下一条门槛
                                if(+value >= nextLeastQty){
                                  callback('此阶梯优惠门槛需小于下一阶梯')
                                };
                              };
                            };
                            callback();
                          }
                        }
                      ]
                    })(
                      <Input
                        autoComplete="off"
                        style={{ width: "150px" }}
                      />
                    )}　件, 减免　
                  </FormItem>
                }
                {promotionType == 22 &&
                  <FormItem className="reduce_price">
                  {getFieldDecorator(`fieldValues[${index}].reduceAmount`, {
                    initialValue: item.param.reduceAmount,
                    onChange: e => {
                      this.onChange(e, index, "reduceAmount");
                    },
                    getValueFromEvent:(event)=>{
                      return event.target.value.replace(/\D/g,'').replace(/^[0]+/,'')
                    },
                    rules: [
                      { required: true, message: "请填写优惠内容" },
                      {
                        validator: (rule, value, callback) => {
                          if (+value) {
                            if(+value>9999){
                              callback('需小于等于9999')
                            };
                            const currentLeastAmount = +dataSource[index].param.leastAmount;//当前减额
                            if(currentLeastAmount){
                              if(+value >= currentLeastAmount){
                                callback('提示优惠金额需小于优惠门槛')
                              };
                              const currentDiscount = +value/currentLeastAmount//当前折扣
                              if(dataSource[index - 1]){
                                const prevLeastAmount = +dataSource[index - 1].param.leastAmount;//上一条门槛
                                const prevReduceAmount = +dataSource[index - 1].param.reduceAmount;//上一条减额
                                if(prevLeastAmount && prevReduceAmount){
                                  const prevDiscount = prevReduceAmount/prevLeastAmount //上一条折扣
                                  if(currentDiscount < prevDiscount){
                                    callback('此阶梯优惠力度需大于等于上一阶梯')
                                  };
                                }
                              };
                              if(dataSource[index+1]){
                                const nextLeastAmount = +dataSource[index + 1].param.leastAmount;//下一条门槛
                                const nextReduceAmount = +dataSource[index + 1].param.reduceAmount;//下一条减额
                                if(nextLeastAmount && nextReduceAmount){
                                  const nextDiscount = nextReduceAmount/nextLeastAmount //下一条折扣
                                  if(currentDiscount > nextDiscount){
                                    callback('此阶梯优惠力度需小于等于下一阶梯')
                                  };
                                };
                              };
                            };
                          };
                          callback()
                        }
                      }
                    ]
                  })(<Input autoComplete="off" style={{ width: "150px" }} />)}　元
                </FormItem>
                }
                {promotionType == 23 &&
                  <FormItem className="reduce_price">
                    {getFieldDecorator(`fieldValues[${index}].reduceQty`, {
                      initialValue: item.param.reduceQty,
                      onChange: e => {
                        this.onChange(e, index, "reduceQty");1
                      },
                      getValueFromEvent:(event)=>{
                        return event.target.value.replace(/\D/g,'').replace(/^[0]+/,'')
                      },
                      rules: [
                        { required: true, message: "请填写优惠内容" },
                        {
                          validator: (rule, value, callback) => {
                            if (+value) {
                              if(+value>99){
                                callback('需小于等于99')
                              };
                              const currentLeastQty = dataSource[index].param.leastQty;
                              if(currentLeastQty){
                                if(+value >= currentLeastQty){
                                  callback('不得大于等于优惠门槛')
                                };
                              };
                              if(dataSource[index - 1] && +dataSource[index - 1].param.reduceQty){
                                const prevReduceQty = +dataSource[index - 1].param.reduceQty;//上一条减额
                                if( +value <= prevReduceQty){
                                  callback('此阶梯减额需大于上一阶梯')
                                };
                              };
                              if(dataSource[index+1] && +dataSource[index + 1].param.reduceQty){
                                const nextReduceQty = +dataSource[index + 1].param.reduceQty;//下一条减额
                                if(+value >= nextReduceQty){
                                  callback('此阶梯减额需小于下一阶梯')
                                };
                              };
                            };
                            callback()
                          }
                        }
                      ]
                    })(<Input autoComplete="off" style={{ width: "150px" }} />)}　件
                  </FormItem>
                }
              </div>
              {dataSource && dataSource.length > 1 && (
                <a className="theme-color" onClick={() => this.delete(index)}>
                  删除等级
                </a>
              )}
            </div>
          ))}
        </Form>
        <div className="discountTwo_add">
          <Button
            disabled={dataSource && dataSource.length == 8}
            type="primary"
            onClick={this.add}
          >
            继续新增等级优惠
          </Button>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { ctipActivityAddTwo } = state;
  return ctipActivityAddTwo;
}
const DiscountTwos = Form.create({})(DiscountTwo);
export default connect(mapStateToProps)(DiscountTwos);
