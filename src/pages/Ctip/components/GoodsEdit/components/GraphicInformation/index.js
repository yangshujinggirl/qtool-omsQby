import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import './index.less';
let FormItem = Form.Item;

function GraphicInformation({...props}) {
  return  <div className="part-wrap graphic-information-components">
            <p className="title-wrap"><span className="title-name">图文信息</span></p>
            <FormItem label='商品主图' {...props.formItemLayout}>
              <span className="main-image"><img src=""></img></span>
              <span className="main-image"><img src=""></img></span>
            </FormItem>
            <FormItem label='图文描述' {...props.formItemLayout}>
              <span className="main-desc"><img src=""></img></span>
              <span className="main-desc"><img src=""></img></span>
            </FormItem>
          </div>
}

export default GraphicInformation;
