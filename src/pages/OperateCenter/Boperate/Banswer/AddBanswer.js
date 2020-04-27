import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button } from "antd";
import { QimageTextEdit } from "common";
import { CommonUtils } from 'utils';
import { saveApi, getInfosApi } from "api/home/OperateCenter/Boperate/Banswer";
import "./index.less";
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};
/**
 * 周虹烨
 * 新增B端问答
 *
 */
const Option = Select.Option;

const AddBanswer = props => {
  const [form] = Form.useForm();
  const { id } = props.match.params;
  let [detailImg, setDetailImg] = useState([]);
  let [totalData, setTotalData] = useState({});
  const [pdAnswerConfigId, setPdAnswerConfigId] = useState('');
  /**
   * 修改时初始化数据
   */
  useEffect(() => {
    const { id } = props.match.params;
    if (id) {
      getInfosApi(id).then(res => {
        if (res.httpCode == 200) {
          const { pdAnswerConfig, ...infos } = res.result;
          const list = JSON.parse(pdAnswerConfig.content);
          const fileDomin = sessionStorage.getItem("oms_fileDomain");
          list.map(item => {
            if (item.type == 2) {
              item.img = item.content;
              item.content = CommonUtils.formatToFilelist(item.content);
            }
          });
          setTotalData(infos);
          setDetailImg(list);
          setPdAnswerConfigId(pdAnswerConfig.pdAnswerConfigId);
        }
      });
    }
  }, []);
  /**
   *
   * 配置发生变化
   */
  const upDateDetailImg = list => {
    setDetailImg(list);
    form.setFieldsValue({ productDetailImgList: list })
  };
  /**
   *
   *提交保存
   */
  const handleSubmit = async e => {
    const values = await form.validateFields();
    const params = formatValue(values);
    saveApi(params).then(res => {
      if (res.httpCode == 200) {
        goBack();
      }
    });
  };
  /**
   * 请求数据格式化
   */
  const formatValue = values => {
    const { productDetailImgList, ..._values } = values;
    let content = [];
    detailImg.map(item => {
      const obj = {type:item.type};
      if (item.type == 2) {
        obj.content = CommonUtils.formatToUrlPath(item.content);
      } else {
        obj.content = item.content;
      }
      content.push(obj);
    });
    _values.pdAnswerConfig = {content:JSON.stringify(content),pdAnswerConfigId:id?pdAnswerConfigId:null};
    if (id) {
      _values.pdAnswerId = id;
    }
    return _values;
  };
  /**
   * 取消
   */
  const goBack = () => {
    props.history.push("/account/b_question");
  };
  //表单change事件
  const onValuesChange=(changedValues, allValues)=> {
    let currentKey = Object.keys(changedValues)[0];
    let { productDetailImgList } = changedValues;

    if(currentKey=='productDetailImgList') {
      detailImg = detailImg.map((el,index) => {
        productDetailImgList.map((item,idx) => {
          if(index == idx) {
            el = {...el, ...item }
          }
        })
        return el;
      })
      setDetailImg(detailImg)
    }
  }

  useEffect(()=>{ form.setFieldsValue({ productDetailImgList: detailImg }); },[detailImg])
  useEffect(()=>{ form.setFieldsValue(totalData) },[totalData])

  return (
    <div className="oms-common-addEdit-pages">
      <Form
        onValuesChange={onValuesChange}
        form={form} {...formItemLayout}
        className="common-addEdit-form">
        <Form.Item
          label="问题类型"
          name="type"
          rules={[{ required: true, message: "请选择问题类型" }]}
        >
          <Select allowClear={true} placeholder="请选择问题类型">
            <Option value={20} key={10}>
              运营问题
            </Option>
            <Option value={30} key={20}>
              商品问题
            </Option>
            <Option value={40} key={30}>
              设计问题
            </Option>
            <Option value={50} key={40}>
              招商问题
            </Option>
            <Option value={60} key={50}>
              系统问题
            </Option>
            <Option value={70} key={60}>
              其他
            </Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="问题状态"
          name="status"
          rules={[{ required: true, message: "请选择问题状态" }]}
        >
          <Select allowClear={true} placeholder="请选择问题状态">
            <Option value={1}>上线</Option>
            <Option value={0}>下线</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="标题"
          name="title"
          rules={[{ required: true, message: "请输入标题" }]}
        >
          <Input
            placeholder="请输入30字以内标题"
            maxLength="30"
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item label="配置">
          <QimageTextEdit detailImg={detailImg} upDateList={upDateDetailImg} />
        </Form.Item>
        <div className="handle-operate-save-action">
          <Button onClick={goBack} size="large">
            返回
          </Button>
          <Button type="primary" size="large" onClick={handleSubmit}>
            保存
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddBanswer;
