import {Input} from 'antd'
const getColumns =(form,Form)=> {
    const Columns = [
        {
          title: "商品编号",
          dataIndex: "skuCode",
        },
        {
          title: "商品名称",
          dataIndex: "productName"
        },
        {
          title: "采购价",
          dataIndex: "stockingPrice",
          render:()=>{
              const {getFieldDecorator} = form;
              return(
                  <Form>
                    <Form.Item>
                      {
                        getFieldDecorator('stockingPrice')(
                            <Input style={{'width':'100px'}} />
                        )
                      }
                    </Form.Item>
                  </Form>
                  
              )
          }
        },
        {
          title: "申请备货数量",
          dataIndex: "amount",
          render:()=>{
            const {getFieldDecorator} = form;
            return(
                <Form>
                  <Form.Item>
                    {
                      getFieldDecorator('stockingPrice')(
                        <Input style={{'width':'100px'}}/>
                      )
                    }
                  </Form.Item>
                </Form>
                
            )
        }
        },
        {
          title: "申请总价",
          dataIndex: "totalCount",
          render:(text)=>{
              return <span>{text}</span>
          }
        },
        {
          title: "可用库存",
          dataIndex: "availableStock",
        },
        {
          title: "操作",
          render:(record,index,text)=>{
            return <span onClick={()=>record.onOperateClick()} className='theme-color'>删除</span>
          }
        }
      ];
    return Columns
}


export default getColumns;
