import { Input, Form, Select, Button, Tooltip } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import { Sessions } from 'utils'
const FormItem = Form.Item;

const fileDomain = Sessions.get('fileDomain');

let tagsTit =(
    <span>
      选填项，如填写则前端将会展示标签。效果如下：
      <img src="" style={{'width':'80px'}}/>
    </span>
);

const sellingPoints =(<Tooltip placement="top" title='选填项，如填写则前端将会展示卖点，而不是商品名称'>
                商品卖点&nbsp;<ExclamationCircleOutlined />
              </Tooltip>);
const pdSpuInv =(<Tooltip placement="top" title='即为仓库库存。若库存不为0，则所有用户都可以买这个商品。'>
                B端在售库存&nbsp;<ExclamationCircleOutlined />
              </Tooltip>);
const outOfStockShopNum =(<Tooltip placement="top" title='即为该门店没有此商品，若B端在售库存为0，则选择此门店的用户会看到补货中'>
              缺货门店&nbsp;<ExclamationCircleOutlined />
              </Tooltip>);
const tags =(<Tooltip placement="top" title={tagsTit}>
              商品标签&nbsp;<ExclamationCircleOutlined />
              </Tooltip>);
export function columnsFun(handleBlur){
  return [
    {
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      align:'center',
      width:'3%',
      render:(text,record,index)=> {
        index++;
        return <span>{index}</span>
      }
    },
    {
      title: 'Spuid',
      dataIndex: 'pdSpuId',
      key: 'pdSpuId',
      width:'8%',
      render:(text,record,index)=> {
        return <FormItem
                name={['fieldsOne',index,'pdSpuId']}
                rules={[
                  { required:true,message:'请输入Spuid' },
                  { pattern:/^\S+$/g,message:'不可输入空格' }
                ]}>
                  <Input onBlur={(e)=>handleBlur(e,record)} maxLength='15' placeholder="请输入Spuid" autoComplete="off"/>
              </FormItem>
      }
    },
    {
     title: '商品图片',
     dataIndex: 'picUrl',
     key: 'picUrl',
     align:'center',
     width:'8%',
     render:(text,record,index)=> {

       return <div className="img-wrap">
                {
                  record.pdSpuPic&&
                  <img src={`${fileDomain}/${record.pdSpuPic}`}/>
                }
             </div>
     }
   },
   {
      title: '商品名称',
      dataIndex: 'pdSpuName',
      key: 'pdSpuName',
      width:'8%',
    },
    {
      title: '商品分类',
      dataIndex: 'pdCategory',
      key: 'pdCategory',
      width:'8%',
    },
    {
      title:sellingPoints,
      dataIndex: 'sellingPoints',
      key: 'sellingPoints',
      align:'center',
      width:'8%',
      render:(text,record,index)=> {
        return <FormItem name={['fieldsOne',index, 'sellingPoints']} rules={[{pattern:/^\S+$/g,message:'不可输入空格'}]}>
                <Input maxLength='8' placeholder="8个字符以内" autoComplete="off"/>
              </FormItem>
      }
    },{
      title:tags,
      dataIndex: 'tags',
      key: 'tags',
      align:'center',
      width:'8%',
      render:(text,record,index)=> {
        return <FormItem name={['fieldsOne',index,'tags']} rules={[{pattern:/^\S+$/g,message:'不可输入空格'}]}>
                <Input maxLength='8' placeholder="8个字符以内" autoComplete="off"/>
              </FormItem>
      }
    },
    {
      title:pdSpuInv,
      dataIndex: 'pdSpuInv',
      key: 'pdSpuInv',
      width:'10%',
    },
    {
      title:outOfStockShopNum,
      dataIndex: 'outOfStockShopNum',
      key: 'outOfStockShopNum',
      width:'8%',
    },
    {
      title: '上架状态',
      dataIndex: 'isLine',
      key: 'isLine',
      width:'8%',
      render:(text,record,index) => {
        return  <span>
            {
              !record.isLine?''
            :
              <span>{record.isLine==20?'下架':'上架'}</span>
            }
            </span>
      }
    },{
      title: '是否预售',
      dataIndex: 'isPresellStr',
      key: 'isPresellStr',
      width:'10%',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width:'4%',
      render:(text,record,index) => {
        return <span onClick={()=>record.onOperateClick('delete')} className="cr">删除</span>
      }
    },
  ];
}
export function columnsTwoFun( handleBlur){
  return [
    {
      title: '以下为替补商品',
      dataIndex: 'key',
      key: 'key',
      align:'center',
      width:'3%',
      colSpan:12,
      render:(text,record,index)=> {
        index++;
        return <span>{index}</span>
      }
    },
    {
      colSpan:0,
      title: 'Spuid',
      dataIndex: 'pdSpuId',
      key: 'pdSpuId',
      width:'8%',
      render:(text,record,index)=> {
        return <FormItem
                name={['fieldsTwo',index,'pdSpuId']}
                rules={[
                  { required:true,message:'请输入Spuid' },
                  { pattern:/^\S+$/g,message:'不可输入空格' }
                ]}>
                  <Input onBlur={(e)=>handleBlur(e,record)} maxLength='15' placeholder="请输入Spuid" autoComplete="off"/>
              </FormItem>
      }
    },
    {
      colSpan:0,
      title: '商品图片',
      dataIndex: 'pdSpuPic',
      key: 'pdSpuPic',
      align:'center',
      width:'8%',
      render:(text,record,index)=> {
        return <div className="img-wrap">
                 {
                   record.pdSpuPic&&
                   <img src={`${fileDomain}${record.pdSpuPic}`}/>
                 }
              </div>
      }
    },{
      title: '商品名称',
      dataIndex: 'pdSpuName',
      key: 'pdSpuName',
      colSpan:0,
      width:'8%',
    },
    {
      title: '商品分类',
      dataIndex: 'pdCategory',
      key: 'pdCategory',
      colSpan:0,
      width:'8%',
    },
    {
      title: '商品卖点',
      dataIndex: 'sellingPoints',
      key: 'sellingPoints',
      align:'center',
      width:'8%',
      colSpan:0,
      render:(text,record,index)=> {
        return <FormItem name={['fieldsTwo',index, 'sellingPoints']} rules={[{pattern:/^\S+$/g,message:'不可输入空格'}]}>
                <Input maxLength='8' placeholder="8个字符以内" autoComplete="off"/>
              </FormItem>
      }
    },{
      title: '商品标签',
      dataIndex: 'tags',
      key: 'tags',
      align:'center',
      width:'8%',
      colSpan:0,
      render:(text,record,index)=> {
        return <FormItem name={['fieldsTwo',index,'tags']} rules={[{pattern:/^\S+$/g,message:'不可输入空格'}]}>
                <Input maxLength='8' placeholder="8个字符以内" autoComplete="off"/>
              </FormItem>
      }
    },{
      title: 'B端在售库存',
      dataIndex: 'pdSpuInv',
      key: 'pdSpuInv',
      colSpan:0,
      width:'10%',
    },{
      title: '缺货门店',
      dataIndex: 'outOfStockShopNum',
      key: 'outOfStockShopNum',
      colSpan:0,
      width:'8%',
    },{
      title: '上架状态',
      dataIndex: 'isLine',
      key: 'isLine',
      width:'8%',
      colSpan:0,
      render:(text,record,index) => {
        return  <span>
            {
              !record.isLine?''
            :
              <span>{record.isLine==20?'下架':'上架'}</span>
            }
            </span>
      }
    },{
      title: '是否预售',
      dataIndex: 'isPresellStr',
      key: 'isPresellStr',
      colSpan:0,
      width:'10%',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      colSpan:0,
      width:'4%',
      render:(text,record,index) => {
        return <span onClick={()=>record.onOperateClick('delete')} className="cr">删除</span>
      }
    },
  ];
}
