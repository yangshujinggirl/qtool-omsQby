import { Form } from '@ant-design/compatible';
import { QenlargeImg } from 'common';
import { Sessions } from 'utils';
import '@ant-design/compatible/assets/index.css';
import './index.less';
let FormItem = Form.Item;

function GraphicInformation({...props}) {

  let fileDomain = Sessions.get('fileDomain');
  let { picUrlObj } =props;
  let mainPicUrlList = picUrlObj&&picUrlObj.mainPicUrlList?picUrlObj.mainPicUrlList:[];
  let imageListCList = picUrlObj&&picUrlObj.imageListCList?picUrlObj.imageListCList:[];

  return  <div className="part-wrap graphic-information-components">
            <p className="title-wrap"><span className="title-name">图文信息</span></p>
            <FormItem label='商品主图' {...props.formItemLayout}>
            {
              mainPicUrlList.map((el,index) => (
                <span className="main-image" key={index}>
                  <QenlargeImg url={el}/>
                </span>
              ))
            }
            </FormItem>
            <FormItem label='图文描述' {...props.formItemLayout}>
            {
              imageListCList.map((el,index) => (
                <span className="main-desc" key={index}>
                  {
                    el.type == 2?
                    <img src={`${fileDomain}${el.content}`} />
                    :
                    <span>{el.content}</span>
                  }
                </span>
              ))
            }
            </FormItem>
          </div>
}

export default GraphicInformation;
