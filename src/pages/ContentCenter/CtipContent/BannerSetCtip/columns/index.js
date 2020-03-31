
import { Input, Form, DatePicker, Select, Button } from 'antd';
import { QupLoadImgLimt } from 'common';
import { linkOption, linkOptionTwo } from '../optionsMap';
import moment from 'moment';
const FormItem = Form.Item;

const ColumnsAdd=(optionSource, categorySource)=>{
  return [
    {
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      align:'center',
      width:'4%',
      render:(text,record,index)=> {
        index++;
        return <span>{index}</span>
      }
    }, {
      title: 'banner图片',
      dataIndex: 'picUrl',
      key: 'picUrl',
      align:'center',
      width:'10%',
      render:(text,record,index)=> {
        let fileList = record.picUrl?record.picUrl:[];
        return <QupLoadImgLimt
                  rules={[{ required: true, message: '请上传图片' } ]}
                  name={['goods',index,'picUrl']}
                  fileList={fileList}
                  limit="1"
                  width={343}
                  height={178}/>
      }
    },{
      title: 'banner名称',
      dataIndex: 'title',
      key: 'title',
      align:'center',
      width:'15%',
      render:(text,record,index)=> {
        return <FormItem name={['goods',index,'title']} rules={[{ required:true,message:'请输入名称'}]}>
                <Input
                  maxLength='15'
                  placeholder="请输入名称"
                  autoComplete="off"/>
              </FormItem>
      }
    }, {
      title: '适用端*',
      dataIndex: 'platform',
      key: 'platform',
      align:'center',
      width:'10%',
      render:(text,record,index)=> {
        return <FormItem name={['goods',index,'platform']} rules={[{ required:true,message:'请选择平台'}]}>
                <Select placeholder="请选择平台">
                  <Select.Option value={1} key={1}>小程序</Select.Option>
                  <Select.Option value={2} key={2}>App</Select.Option>
                  <Select.Option value={0} key={0}>小程序+App</Select.Option>
                </Select>
              </FormItem>
      }
    }, {
      title: '跳转链接',
      dataIndex: 'linkInfoType',
      key: 'linkInfoType',
      align:'center',
      width:'12%',
      render:(text,record,index)=> {
        return <FormItem name={['goods',index,'linkInfoType']} rules={[{ required:true,message:'请选择跳转链接'}]}>
                <Select placeholder="请选择跳转链接">
                  {
                    optionSource.map((el,index) => (
                      <Select.Option
                        value={el.key}
                        key={el.key}>{el.value}</Select.Option>
                    ))
                  }
                </Select>
           </FormItem>
      }
    },  {
      title: '跳转内容',
      dataIndex: 'linkInfo',
      key: 'linkInfo',
      align:'center',
      width:'15%',
      render:(text,record,index)=> {
        const contactLinkInfo=()=> {
          let placeholder='',disabled, rules=[];
          switch(record.linkInfoType) {
            case 1:
              disabled=false;
              placeholder = '请输入页面编码';
              rules=[{ required:true, message:'请输入页面编码'},{ pattern:/^\S+$/g, message:'不可输入空格' }]
              break;
            case 2:
              disabled=false;
              placeholder = '请输入URL链接';
              rules=[{ required:true, message:'请输入URL链接'},{pattern:/^\S+$/g,message:'不可输入空格'}]
              break;
            case 3:
              disabled=false;
              placeholder = '请输入商品SPUID';
              rules=[{ required:true, message:'请输入商品SPUID'},{pattern:/^\S+$/g,message:'不可输入空格'}]
              break;
            case 4:
            case 5:
            case 6:
            case 7:
              disabled=true;
              break;
            case 8:
              disabled=false;
              rules=[{ required:true, message:'请选择分类'}]
              placeholder = '请选择分类'
              break;
            case 10:
            disabled=false;
            rules=[{ required:true, message:'请填写活动ID'}]
            placeholder = '请填写活动ID'
            break;
            default:
              disabled=true;
              break;
          }
          return { placeholder, disabled, rules };
        }
        let linkAgeObj= contactLinkInfo();
        switch(record.linkInfoType) {
          case 8:
            return <FormItem name={['goods',index,'linkInfo']} rules={[{ required:true,message:'请选择分类'}]}>
                    <Select placeholder={linkAgeObj.placeholder}>
                      {
                        categorySource.map((el) => (
                          <Select.Option value={el.categoryId} key={el.categoryId}>{el.categoryName}</Select.Option>
                        ))
                      }
                    </Select>
                  </FormItem>
            break;
          case 1:
          case 2:
          case 3:
          case 10:
            return <FormItem name={['goods',index,'linkInfo']} rules={linkAgeObj.rules}>
                    <Input
                      disabled={linkAgeObj.disabled}
                      placeholder={linkAgeObj.placeholder}
                      autoComplete="off"/>
              </FormItem>
            break;
          default:
            return <span></span>
        }
      }
    }, {
      title: '开始时间',
      dataIndex: 'beginTime',
      key: 'beginTime',
      align:'center',
      width:'14%',
      render:(text,record,index)=> {
        return <FormItem name={['goods',index,'beginTime']} rules={[{ required:true,message:'请选择开始时间'}]}>
                <DatePicker
                  format="YYYY-MM-DD HH:mm"
                  allowClear={false}
                  showTime={{
                    hideDisabledOptions: true,
                    defaultValue: moment('00:00', 'HH:mm'),
                  }}/>
              </FormItem>
      }
    },{
      title: '结束时间',
      dataIndex: 'etime',
      key: 'etime',
      align:'center',
      width:'6%',
      render:(text,record,index)=> {
        return <span>结束时间为下一张开始时间</span>
      }
    },{
      title:'操作',
      key:'operation',
      width:'12%',
      align:'center',
    }];
}
export default ColumnsAdd;
