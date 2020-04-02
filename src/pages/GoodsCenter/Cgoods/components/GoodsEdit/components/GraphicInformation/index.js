import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import './index.less';
let FormItem = Form.Item;

function GraphicInformation({...props}) {
  let fileDomain = "https://qtltestfiles.oss-cn-shanghai.aliyuncs.com/";
  let { picUrlObj } =props;
  let mainPicUrlList = picUrlObj&&picUrlObj.mainPicUrlList?picUrlObj.mainPicUrlList:[];
  let imageListCList = picUrlObj&&picUrlObj.imageListCList?picUrlObj.imageListCList:[];
  console.log(picUrlObj)
  return  <div className="part-wrap graphic-information-components">
            <p className="title-wrap"><span className="title-name">图文信息</span></p>
            <FormItem label='商品主图' {...props.formItemLayout}>
            {
              mainPicUrlList.map((el,index) => (
                <span className="main-image" key={index}>
                  <img src={`${fileDomain}${el}`}></img>
                </span>
              ))
            }
            </FormItem>
            <FormItem label='图文描述' {...props.formItemLayout}>
            {
              imageListCList.map((el,index) => (
                <span className="main-desc" key={index}>
                  <img src={`${fileDomain}${el}`}></img>
                </span>
              ))
            }
            </FormItem>
          </div>
}

export default GraphicInformation;
