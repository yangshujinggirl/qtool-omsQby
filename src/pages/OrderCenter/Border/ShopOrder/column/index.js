import { Form,Input } from 'antd';

const columnsAdd=(onBlur)=>{
  return [{
            title: "sku编码",
            dataIndex: "skuCode",
            textWrap: 'word-break',
            render:(text,record,index)=> {
              return  <Form.Item name={['list',index,'barCode']}>
                        <Input
                          className="goods-name"
                          key={index}
                          onBlur={(e)=>onBlur(e,index)}/>
                      </Form.Item>
            }
          },{
            title: "订购数量",
            dataIndex: "salesAttributeName",
            textWrap: 'word-break',
            render:(text,record,index)=> {
              return  <Form.Item name={['list',index,'barCode']}>
                        <Input disabled={record.isExamine} className="goods-name" key={index}/>
                      </Form.Item>
            }
          },{
            title: "商品名称",
            dataIndex: "salesAttributeName",
            textWrap: 'word-break',
          },{
            title: "商品规格",
            dataIndex: "salesAttributeName",
            textWrap: 'word-break',
          },{
            title: "B端售价",
            dataIndex: "outerProductCode",
            textWrap: 'word-break',
          },{
            title: "金额小计",
            textWrap: 'word-break',
            dataIndex: "dhPrice",
          }]
}


export {
   columnsAdd
}
