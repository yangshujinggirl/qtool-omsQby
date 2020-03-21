import {
  Input,Spin,Form,Upload,Select,Table,Card,Tag,
  Row,Col,Checkbox,Button,Radio,AutoComplete,DatePicker
} from 'antd';
import { Qbtn, Qmessage, BaseEditTable } from 'common';
import { useState, useEffect } from 'react';
import Proration from '../components/Proration';
import { GetBrandApi, GetAddApi } from 'api/marketCenter/CouponCenter';
import { GetEditInfoApi } from 'api/home/BaseGoods';
import { ColumnsAdd } from './columns';

let { RangePicker } =DatePicker;
let TextArea = Input.TextArea;
let FormItem = Form.Item;
let Option = Select.Option;
let RadioGroup = Radio.Group;

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
const CouponAdd=({...props})=> {
  const [form] = Form.useForm();
  let [totalData, setTotalData]=useState({});
  let [goodsList, setGoodsList] =useState([]);
  let [tagsList, setTagsList] =useState([]);
  let [ratioList, setRatioList] =useState([]);
  let [brandList, setBrandList] =useState([]);
  let [selectBdList, setSelectBdList] =useState([]);
  let [limitDisabled, setLimitDisabled] =useState(false);


  const upDateGoodsList=(array)=> {
    setGoodsList(array)
  }
  const upDateRatioList=(array)=> {
    setRatioList(array)
  }
  const upDateTagList=(array)=> {
    setTagsList(array)
  }
  const handleChangeType=(e)=> {
    let value = e.target.value;
    switch(value) {
      case 1:
      case 2:
        setLimitDisabled(true);
        break;
      case 3:
      case 4:
        setLimitDisabled(false);
        break;
    }
  }
  // 品牌搜索
  const handleBrandSearch = e => {
    let value = e.target.value;
    GetBrandApi({ brandName: value })
    .then(res => {
      let { result }=res;
      result = result?result:[];
      result = result.map((el)=> {
        let item={};
        item.key = el.id;
        item.value = el.brandNameCn;
        return item;
      })
      setBrandList(result);
    });
  };
  //品牌选中
  const handleBrandSelect = (value, option) => {
    selectBdList = [...selectBdList,...[{key:option.key,value:value}]];
    setSelectBdList(selectBdList);
  };
  const handleBlur=(e)=> {
    let value = e.target.value;
    GetEditInfoApi({spuCode:value})
    .then((res)=> {
      let { result } =res;

      console.log(res)
    })
  }
  const submit = async () => {
    try {
      let values = await form.validateFields();
      let { bearers, costApportion, ..._val} =values;
      let proportionList = ratioList.map((el)=> {
        return {
          bearer:el.bearer,
          proportion:el.proportion,
          bearerName:el.bearerStr,
        }
      })
      _val = {..._val,proportionList}
      console.log(_val);
      GetAddApi(_val)
      .then((res)=> {
        Qmessage.success('保存成功')
        goReturn()
      })
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }
  const goReturn=()=> {
    props.history.push('/account/coupon_centre')
  }
  const sendCouponCountChange=()=> {

  }
  //表单change事件
  const onValuesChange=(changedValues, allValues)=> {
    let currentKey = Object.keys(changedValues)[0];
    let { bearers=[], pdDetailBannerPic, logoPic, websiteBanner, shareWechatCfPic, shareWechatPic, ...valFileds } = allValues;
    if(currentKey == 'bearers') {
      let newArray = [...allValues['bearers']];
      setRatioList(newArray);
    }
    if(currentKey=='list') {
      return;
    }
    totalData = {...totalData,...allValues};
    setTotalData(totalData)
  }
  useEffect(()=>{ form.setFieldsValue({bearers:ratioList}) },[ratioList]);

  return(
    <Spin tip="加载中..." spinning={false}>
      <div className="oms-common-addEdit-pages ctipActivity-addEdit-pages">
        <Form
          onValuesChange={onValuesChange}
          className="common-addEdit-form"
          form={form}
          {...formItemLayout}>
          <Card title="优惠券信息">
            <FormItem
              label="优惠券名称">
              <FormItem
                name="couponName"
                rules={[{ required: true, message: "请输入优惠券名称" }]} noStyle>
                <Input
                  placeholder="请输入12字以内优惠券名称"
                  maxLength="12"
                  autoComplete="off"/>
              </FormItem>
                该名称将在前端给用户展示，请谨慎填写
            </FormItem>
            <FormItem label="优惠券说明">
              <FormItem
                name="couponExplain"
                rules={[{ required: true, message: "请输入优惠券说明" }]} noStyle>
                <TextArea
                  placeholder="请输入优惠券说明，50字以内"
                  maxLength="50"
                  rows={6}/>
              </FormItem>
              该说明将在前端给用户展示，请谨慎填写
            </FormItem>
            <FormItem
              label="优惠券使用端"
              name="platform"
              rules={[{ required: true, message: "请选择优惠券使用端" }]}>
              <RadioGroup>
                <Radio value="1">仅线上使用</Radio>
                <Radio value="2">线上线下通用</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem
              label="优惠券金额">
              <FormItem
                noStyle
                name="couponMoney"
                rules={[ { required: true, message: "请输入优惠券金额" },{ pattern: /^(?:[0-9]{0,4}|10000)$/, message: "0-10000之间的正整数"}]}>
                <Input
                  placeholder="请输入优惠券金额"
                  autoComplete="off"/>
              </FormItem>
                　元
            </FormItem>
            <FormItem label="使用门槛">
              <FormItem
                noStyle
                name="couponFullAmount"
                rules={[{ required: true, message: "请输入优惠券金额" },{ pattern: /^([1-9]\d*|[0]{1,1})$/, message: "请输入正整数" }]}>
                <Input autoComplete="off" />
              </FormItem>
              元可用,只可输入0，正整数
            </FormItem>
            <Proration
              upDateRatioList={upDateRatioList}
              upDateTagList={upDateTagList}
              tagsList={tagsList}
              ratioList={ratioList}
              form={form}
              activityInfo={totalData}/>
            <FormItem label="优惠券有效期">
              <FormItem
                name="couponValid"
                rules={[{ required: true, message: "请选择券有效期" }]}>
                <RadioGroup>
                  <Radio  value={1}> 用户领取当日起</Radio>
                  <Radio  value={2}> 特定时间到 </Radio>
                </RadioGroup>
              </FormItem>
              <FormItem
                noStyle
                shouldUpdate={(prevValues, currentValues) => prevValues.couponValid !== currentValues.couponValid}>
                {({ getFieldValue }) => {
                  return getFieldValue('couponValid')&&(getFieldValue('couponValid') === 1 ?
                    <FormItem noStyle>
                      <FormItem
                        noStyle
                        name="couponValidDay"
                        rules={[{ required: true, message: "请填写用户领取时间"}]}>
                        <Input autoComplete="off"/>
                      </FormItem>
                      天可用，0代表领取当天
                    </FormItem>
                    :
                    <FormItem name="couponValidDate" rules={[{ required: true, message: "请填写特定时间" }]}>
                      <RangePicker
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"/>
                    </FormItem>)
                }}
              </FormItem>
            </FormItem>
            <FormItem label="发放方式">
              <FormItem
                name="couponUseScene"
                rules={[{ required: true, message: "请选择使用商品范围" }]}>
                <RadioGroup onChange={handleChangeType}>
                  <Radio value={1}>注册领取</Radio>
                  <Radio value={3}>手动领取</Radio>
                  <Radio value={2}>注券</Radio>
                  <Radio value={4}>系统自动发放到账</Radio>
                </RadioGroup>
              </FormItem>
              <div className="suffix_tips coupon_tips">
                <p>注册领取意为当新用户注册成功后，即发放优惠券到账，无需用户手动领取。</p>
                <p>手动领取意为优惠券在App需要用户手动领取使用。会员权益礼包券请创建此类型。</p>
                <p>注券意为将优惠券发放给相应用户，创建完成后在优惠券列表的操作处点击注券即可开始注券流程。</p>
                <p>系统自动发放到账意为发放优惠券到用户账户，此类型仅限会员生日礼包券使用。</p>
              </div>
            </FormItem>
            <FormItem label="预计发放张数">
              <FormItem
                name="isSend"
                rules={[{ required: true, message: "请选择预计发放张数" }]}>
                <RadioGroup>
                  <Radio  value={-1} disabled={limitDisabled}> 不限制 </Radio>
                  <Radio value={1}> 限制张数</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem
                noStyle
                shouldUpdate={(prevValues, currentValues) => prevValues.isSend !== currentValues.isSend}>
                {({ getFieldValue }) => {
                  return getFieldValue('isSend')&&getFieldValue('isSend')==1&&
                    <FormItem noStyle>
                      <FormItem
                        name="couponCount"
                        rules={[
                          { required: true, message: "请填写预计发放张数" },
                          { pattern: /^(?:[0-9]{0,4}|10000)$/, message: "0-10000之间的正整数"}
                        ]}>
                        <Input
                          placeholder="请输入0-10000的正整数"
                          autoComplete="off"/>
                      </FormItem>
                      张
                      <FormItem noStyle>
                        如创建此张优惠券用于会员权益，预计发放张数需选择不限制
                      </FormItem>
                    </FormItem>
                }}
              </FormItem>
            </FormItem>
            <FormItem label="优惠券备注">
              <FormItem
                name="couponRemark">
                <TextArea
                  placeholder="请输入255字以下优惠券备注"
                  maxLength="255"
                  rows={6}/>
              </FormItem>
              <span className='suffix_tips'>优惠券备注将会出现在优惠券详情页，请谨慎填写，可不填</span>
            </FormItem>
          </Card>
          <Card title="适用商品范围">
            <FormItem
              label="适用商品类型"
              name="couponUseScope"
              rules={[{ required: true, message: "请选择适用商品类型" }]}>
              <RadioGroup>
                <Radio value="4">全部商品</Radio>
                <Radio value="1">一般贸易商品</Radio>
                <Radio value="2">保税商品</Radio>
                <Radio value="5">指定品牌</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem
              noStyle
              shouldUpdate={(prevValues, currentValues) => prevValues.couponUseScope !== currentValues.couponUseScope}>
              {({ getFieldValue }) => {
                return getFieldValue('couponUseScope') == "5"&&
                  <FormItem label="品牌">
                    <FormItem
                      name="brand"
                      rules={[{ required: true, message: "请选择品牌"}]}>
                      <AutoComplete
                        onSelect={handleBrandSelect}
                        onSearch={handleBrandSearch}
                        onFocus={handleBrandSearch}
                        options={brandList}/>
                    </FormItem>
                    {selectBdList.map((el)=> (
                      <Tag
                        closable
                        key={el.key}
                        onClose={()=>handleClose(el)}>
                        {el.value}
                      </Tag>
                    ))}
                  </FormItem>
              }}
            </FormItem>
            <FormItem
              label="选择商品"
              name="spuScope"
              rules={[{ required: true, message: "请选择选择商品" }]}>
              <RadioGroup>
                <Radio value={0}>全部可用</Radio>
                <Radio value={1}>指定商品可用</Radio>
                <Radio value={2}>指定商品不可用</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem
              noStyle
              shouldUpdate={(prevValues, currentValues) => prevValues.spuScope !== currentValues.spuScope}>
              {({ getFieldValue }) => {
                return getFieldValue('spuScope') == 1&&
                <FormItem label="商品信息">
                  <div>
                    <Qbtn onClick={goReturn}> 导入商品 </Qbtn>
                    <Qbtn size="free" onClick={()=>submit(1)}>下载导入模板</Qbtn>
                  </div>
                  <div>
                    <BaseEditTable
                      btnText="添加商品"
                      upDateList={upDateGoodsList}
                      dataSource={goodsList}
                      columns={ColumnsAdd(handleBlur)}/>
                  </div>
                </FormItem>
              }}
            </FormItem>
          </Card>
          <div className="handle-operate-save-action">
            <Qbtn onClick={goReturn}> 返回 </Qbtn>
            <Qbtn size="free" onClick={()=>submit(1)}>保存并继续</Qbtn>
          </div>
        </Form>
      </div>
  </Spin>
  )
}

export default CouponAdd;
