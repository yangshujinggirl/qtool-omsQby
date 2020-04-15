import { Table, Input, Form, DatePicker, Select, Button } from 'antd';
import { useState } from 'react';
import moment from 'moment';
import { DisabledDateUtils } from 'utils';
import { QupLoadImgLimt, Qbtn } from 'common';
import { linkOption, linkOptionTwo, linkIconOption } from '../optionsMap';
import lodash from 'lodash';
import './index.less';


const FormItem = Form.Item;

//绑定方法
const processData=(props,data)=> {
  if(!props.onOperateClick) {
    return data;
  }
  data && data.map((item, i) => {
      item.onOperateClick = (type) => { props.onOperateClick(item, type) };
  })
  return data;
}

const BaseEditTable=({...props})=> {
  let { dataSource, columns, categorySource, activiKey, modType } =props;
  dataSource = processData(props,dataSource);
  let newDataSource = lodash.cloneDeep(dataSource);
  let [key,setKey] = useState(newDataSource.length);
  let optionSource,picWith,picHeight;
  switch(modType) {
    case "1"://banner
      optionSource = activiKey=="1"?linkOption:linkOptionTwo;
      picWith = 343;
      picHeight=178;
      break;
    case "2"://icon
      optionSource = linkIconOption;
      picWith = 1;
      picHeight=1;
      break;
    case "3"://多图
      optionSource = linkIconOption;
      if(activiKey=="1") {
        picWith = 313;
        picHeight= 400;
      } else {
        picWith = 357;
        picHeight= 192;
      }
      break;
  }
  const handleAdd=()=> {
    key++;
    setKey(key)
    newDataSource.push({ key });
    props.upDateList(newDataSource)
  }
  //删除
  const handleDelete=(index)=> {
    newDataSource.splice(index,1);
    props.upDateList(newDataSource)
  }

  const renderCode=(text, record, index)=> {
    index++;
    return <span>{index}</span>
  }
  const renderPicUrl=(text,record,index)=> {
    let fileList=record.picUrl?record.picUrl:[];
    return <QupLoadImgLimt
              rules={[{ required: true, message: '请上传图片' } ]}
              name={['goods',index,'picUrl']}
              fileList={fileList}
              limit="1"
              width={picWith}
              height={picHeight}/>
  }
  const renderTitle=(text,record,index)=> {
    return <FormItem name={['goods',index,'title']} rules={[{ required:true,message:'请输入名称'}]}>
            <Input
              maxLength='15'
              placeholder="请输入名称"
              autoComplete="off"/>
          </FormItem>
  }
  const renderPlatForm=(text,record,index)=> {
    return <FormItem name={['goods',index,'platform']} rules={[{ required:true,message:'请选择平台'}]}>
            <Select placeholder="请选择平台">
              <Select.Option value={1} key={1}>小程序</Select.Option>
              <Select.Option value={2} key={2}>App</Select.Option>
              <Select.Option value={0} key={0}>小程序+App</Select.Option>
            </Select>
          </FormItem>
  }
  const renderLinkType=(text,record,index)=> {
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
  const renderLinkInfo=(text,record,index)=> {
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
  const renderStartTime=(text,record,index)=> {
    return <FormItem name={['goods',index,'beginTime']} rules={[{ required:true,message:'请选择开始时间'}]}>
            <DatePicker
              disabledDate={DisabledDateUtils.disabledDate}
              disabledTime={DisabledDateUtils.disabledDateTime}
              format="YYYY-MM-DD HH:mm"
              allowClear={false}
              showTime={{
                hideDisabledOptions: true,
                defaultValue: moment('00:00', 'HH:mm'),
              }}/>
          </FormItem>
  }
  const renderEndTime=(text,record,index)=> {
    return <span>结束时间为下一张开始时间</span>
  }
  const renderHandle=(text,record,index)=> {
    let disabled;
    if(record.linkInfoType==1||record.linkInfoType==2||record.linkInfoType==3||record.linkInfoType==10) {
      disabled=!!record.picUrl&&!!record.title&&!!record.beginTime&&(record.platform!=undefined)&&!!record.linkInfoType&&!!record.linkInfo;
    } else {
      disabled=!!record.picUrl&&!!record.title&&!!record.beginTime&&(record.platform!=undefined)&&!!record.linkInfoType;
    }
    return <div className="handle-item-btn-list">
            {modType!="3"&&
              <Button type="primary" disabled={!disabled} onClick={()=>record.onOperateClick('frame')}>
                {modType=="2"?'变坑':'变帧'}
              </Button>
            }
            <Button type="primary" onClick={()=>handleDelete(index)}> 删除 </Button>
          </div>
  }

  return (
        <Table
          className="banner-set-tables"
          footer={()=><Qbtn onClick={()=>handleAdd()}>+新增</Qbtn>}
          bordered
          pagination={false}
          dataSource={newDataSource}>
          <Table.Column title="序号" key ='key' dataIndex="key" width="4%"  render={renderCode}/>
          <Table.Column title={`图片*`} key ='picUrl' width="6%"  dataIndex="picUrl" render={renderPicUrl}/>
          <Table.Column title="ID" key ='frameDetailId' dataIndex="frameDetailId" width="6%"/>
          <Table.Column title={`名称*`} key ='title' width="14%" dataIndex="title" render={renderTitle}/>
          {
            modType!="3"&&
            <Table.Column title="适用端*" key ='platform' width="10%" dataIndex="platform" render={renderPlatForm}/>
          }
          <Table.Column title="跳转链接*" key ='linkInfoType' width="14%" dataIndex="linkInfoType" render={renderLinkType}/>
          <Table.Column title="跳转内容*" key ='linkInfo' width="16%" dataIndex="linkInfo" render={renderLinkInfo}/>
          <Table.Column title="开始时间*" key ='beginTime' width="16%" dataIndex="beginTime" render={renderStartTime}/>
          <Table.Column title="结束时间" key ='etime' dataIndex="etime" width="6%" render={renderEndTime}/>
          <Table.Column title="操作" key ='action' width="8%" dataIndex="action" render={renderHandle}/>
        </Table>
  )
}

export default BaseEditTable;
