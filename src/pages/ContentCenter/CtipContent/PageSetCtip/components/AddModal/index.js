import { Modal, Radio, Form, Input, } from 'antd';
import { useState } from 'react';
import { Sessions,  CommonUtils } from 'utils';
import { GetSearchApi } from 'api/contentCenter/PageSetCtip';
import { QupLoadImgLimt } from 'common';

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

const AddModal=({...props})=> {
  let { visible, type, text, template, pdCode, rowcode,fileList } =props.currentItem;
  fileList = fileList?fileList:[];
  let [newFileList,setFileList]=useState(fileList);

  const onSubmit=async()=> {
    try{
      const values = await props.form.validateFields(['text','template','pdCode','rowcode']);
      let { text, pdCode, rowcode, template } =values;
      let items;
      switch (type) {
        case 1:
          text = CommonUtils.formatToUrlPath(text);
          items = { type, text };
          props.onOk(items);
          props.form.resetFields(['text','template','pdCode','rowcode']);
          break;
        case 2:
          getPdSpu(pdCode, rowcode, type, template)
          break;
        case 3:
        case 4:
          items = { type, text }
          props.onOk(items);
          props.form.resetFields(['text','template','pdCode','rowcode']);
          break;
        default:
      }
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }
  const getPdSpu=(pdCode, rowcode, type, template)=> {
    let item, pdSpu,rowPdSpu;
    GetSearchApi({code:pdCode})
    .then((res)=> {
      let { result } =res;
      item = {...res.result, template, type, pdCode, pdSpu:result };
      if(template == 2) {
        let { result } =res;
        GetSearchApi({code:rowcode})
        .then((res)=> {
          item = {...item, rowcode, rowPdSpu:result };
          props.onOk(item);
          props.form.resetFields(['text','template','pdCode','rowcode']);
        })
      } else {
        props.onOk(item);
        props.form.resetFields(['text','template','pdCode','rowcode']);
      }

    })

  }
  const handleChangeFile=(arr)=> {
    setFileList(arr)
  }
  const handleCancel=()=> {
    props.onCancel();
    props.form.resetFields(['text','template','pdCode','rowcode']);
  }
  const funcEdit=()=> {
    let mod;
    switch(type) {
      case 1:
        mod = <div>
                <QupLoadImgLimt
                  formItemLayout={formItemLayout}
                  label="图片"
                  name="text"
                  fileList={newFileList}
                  limit="1"
                  upDateList={(fileList)=>handleChangeFile(fileList)}
                  rules={[{ required: true, message: '请上传图片' } ]}/>
                <Form.Item {...formItemLayout} label="链接商品1" name="pdCode">
                  <Input autoComplete="off" placeholder='请输入商品编码'/>
                </Form.Item>
              </div>
        break;
      case 2:
        mod = <div>
                <Form.Item
                  {...formItemLayout}
                  label="商品模板"
                  name="template"
                  rules={[{ required: true, message: '请输入分享标题，30字以内'}]}>
                  <Radio.Group>
                    <Radio value={1}>单列展示</Radio>
                    <Radio value={2}>双列展示</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="链接商品1"
                  name="pdCode"
                  rules={[{ required: true, message: '请输入商品编码'}]}>
                  <Input autoComplete="off" placeholder='请输入商品编码'/>
                </Form.Item>
                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, currentValues) => prevValues.template !== currentValues.template}>
                  {({ getFieldValue }) => {
                    return getFieldValue('template') == 2 ? (
                      <Form.Item
                        {...formItemLayout}
                        label="链接商品2"
                        name="rowcode"
                        rules={[{ required: true, message: '请输入商品编码'}]}>
                        <Input autoComplete="off" placeholder='请输入商品编码'/>
                      </Form.Item>
                    ) : null;
                  }}
                </Form.Item>
              </div>
        break;
      case 3:
      case 4:
        mod = <Form.Item {...formItemLayout} label="文本" name="text" rules={[{ required: true, message: '请输入商品编码'}]}>
                <Input autoComplete="off" placeholder='请输入商品编码'/>
              </Form.Item>
        break;
    }
    return mod;
  }
  return <Modal
          destroyOnClose={true}
          title="新增"
          visible={visible}
          onOk={onSubmit}
          onCancel={handleCancel}>
            {funcEdit()}
        </Modal>
}

export default AddModal;
