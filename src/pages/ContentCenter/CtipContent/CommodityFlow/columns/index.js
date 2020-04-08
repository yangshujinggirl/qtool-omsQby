import { Input, Form, Select, Button } from 'antd';
import moment from 'moment';
const FormItem = Form.Item;

export function columnsFun(handleBlur,handleChange){
  let linkage=(record)=> {
    let placeholder='',disabled=true, rules=[];
    if(record.fixPosition) {
      disabled=false;
      rules=[{ required:true, message:'请输入'},{
          pattern:/^\d{1,3}$/,message:'请输入数字'
        }]
    }
    return { placeholder, disabled, rules };
  }
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
      width:'6%',
      render:(text,record,index)=> {
        return <Form.Item
                name={['spuList',index,'pdSpuId']}
                rules={[{ required:true,message:'请输入Spuid'}]}>
                <Input
                  onChange={(e)=>{ e.stopPropagation()}}
                  onBlur={(e)=>handleBlur(e,record)}
                  maxLength='15'
                  placeholder="请输入Spuid"
                  autoComplete="off"/>
              </Form.Item>
      }
    },
    {
      title: '商品名称',
      dataIndex: 'cname',
      key: 'cname',
      width:'10%',
    },
    {
      title: '商品分类',
      dataIndex: 'classifyName',
      key: 'classifyName',
      width:'8%',
    },
    {
      title: 'B端在售库存',
      dataIndex: 'pdInvQty',
      key: 'pdInvQty',
      width:'6%',
    },
    {
      title: '商品状态',
      dataIndex: 'shelfStatus',
      key: 'shelfStatus',
      width:'6%',
      render:(text,record,index) => {
        return <span>
          {record.shelfStatus!=undefined&&
            <span>
            {!!record.shelfStatus?'上架':'下架'}
            </span>
          }
        </span>
      }
    },{
      title: '是否预售',
      dataIndex: 'isPresell',
      key: 'isPresell',
      width:'6%',
      render:(text,record,index)=> {
        return <span>
        {
          record.isPresell!=undefined&&
          <span>
          {!!record.isPresell?'预售':'非预售'}
          </span>
        }
        </span>
      }
    },
    {
      title: '缺货门店',
      dataIndex: 'outOfStackQty',
      key: 'outOfStackQty',
      width:'6%',
    },
    {
      title: '固定位置',
      dataIndex: 'fixed',
      key: 'fixed',
      width:'18%',
      render:(text,record,index)=> {
        let mod;
        let linkageObj = linkage(record);
        if(record.isFixed) {
          mod = <span onClick={()=>record.onOperateClick('toggle')} className="cr">解除固定</span>
        } else {
          mod = <div>该商品固定在
                    <Form.Item className="row-input-item"
                      name={['spuList',index,'fixPosition']}
                      rules={[{ pattern:/^([1-9]$)|(^[1-3][0-9]$)|(^[4][0-5]$)/,message:'请输入1-40'}]}>
                        <Input
                          onChange={(e)=>handleChange('fixPosition',e,index)}
                          maxLength='2'
                          placeholder="请输入"
                          autoComplete="off"/>
                    </Form.Item>
                    位置
                    <Form.Item
                      className="row-input-item"
                      name={['spuList',index,'fixDay']}
                      rules={linkageObj.rules}>
                      <Input
                        onChange={(e)=>handleChange('fixDay',e,index)}
                        maxLength='3'
                        disabled={linkageObj.disabled}
                        placeholder="请输入"
                        autoComplete="off"/>
                    </Form.Item>
                    天
                  </div>
        }
        return  mod;
      }
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
