import { Modal, Radio, Form, Input, } from 'antd';
import { QupLoadImgLimt } from 'common';

const AddModal=({...props})=> {
  const { visible,type, Form  } =props;
  const onSubmit=async()=> {
    try{
      const values = await props.form.validateFields(['text','template','pdCode','rowcode']);
      let { text, pdCode } =values;
      let items;
      switch (funcType) {
        case 1:
          items = { type:funcType, text, pdCode }
          break;
        case 2:
          GetSearchApi({codes:[pdCode,rowcode]})
          .then((res)=> {
            items = { type:funcType, pdCode, rowcode }
          })
          break;
        case 3:
        case 4:
          items = { type:funcType, text }
          break;
        default:
      }
      console.log(items)
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }
  const handleCancel=()=> {

  }
  const funcEdit=()=> {
    let mod;
    switch(funcType) {
      case 1:
        mod = <div>
                <QupLoadImgLimt
                  label="图片"
                  name="text"
                  fileList={fileList}
                  limit="1"
                  upDateList={(fileList)=>handleChangeFile(fileList)}
                  rules={[{ required: true, message: '请上传图片' } ]}/>
                <Form.Item label="链接商品1" name="pdCode">
                  <Input autoComplete="off" placeholder='请输入商品编码'/>
                </Form.Item>
              </div>
        break;
      case 2:
        mod = <div>
                <Form.Item label="商品模板" name="template" rules={[{ required: true, message: '请输入分享标题，30字以内'}]}>
                  <Radio.Group>
                    <Radio value={1}>单列展示</Radio>
                    <Radio value={2}>双列展示</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="链接商品1" name="pdCode" rules={[{ required: true, message: '请输入商品编码'}]}>
                  <Input autoComplete="off" placeholder='请输入商品编码'/>
                </Form.Item>
                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, currentValues) => prevValues.template !== currentValues.template}>
                  {({ getFieldValue }) => {
                    return getFieldValue('template') == 2 ? (
                      <Form.Item label="链接商品2" name="rowcode" rules={[{ required: true, message: '请输入商品编码'}]}>
                        <Input autoComplete="off" placeholder='请输入商品编码'/>
                      </Form.Item>
                    ) : null;
                  }}
                </Form.Item>
              </div>
        break;
      case 3:
      case 4:
        mod = <Form.Item label="文本" name="text" rules={[{ required: true, message: '请输入商品编码'}]}>
                <Input autoComplete="off" placeholder='请输入商品编码'/>
              </Form.Item>
        break;
    }
    return mod;
  }
  return <Modal
          title="Basic Modal"
          visible={visible}
          onOk={onSubmit}
          onCancel={handleCancel}>
          {funcEdit()}
        </Modal>
}

export default AddModal;
