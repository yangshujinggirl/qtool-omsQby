import moment from "moment";
import { Input } from 'antd';

import { Link } from 'react-router-dom';
const Columns = [
  {
    title: "商品主图",
    dataIndex: "productImg",
    render: text => <img src={text} style={{ width: "90px", height: "90px" }} />
  },
  {
    title: "商品名称",
    dataIndex: "productName",
  },
  {
    title: "商品品牌",
    dataIndex: "brandName"
  },
  {
    title: "总SKU数 /审核通过数",
    dataIndex: "skuExamineNum"
  },
  {
    title: "商品类目",
    dataIndex: "categoryInfo",
  },
  {
    title: "商品类型",
    dataIndex: "productType",
    render: text => (text == 1 ? "普通商品" : "赠品")
  },
  {
    title: "创建人",
    dataIndex: "createBy",
  },
  {
    title: "最后操作人",
    dataIndex: "modifyBy",
  },
  {
    title: "操作",
    render: (text,record,index) => (
      <div>
        <Link
          className="link-color action-left"
          to={`/account/baseGoodsInfo/${record.spuCode}`}>
          查看
        </Link>
        <Link
          className="link-color"
          to={`/account/baseGoodsAdd/${record.spuCode}`}>
          编辑
        </Link>
      </div>
    )
  }
];
const columnsAdd=(form)=> {
  return [
    {
      title: "操作",
      width: 100,
      textWrap: 'word-break',
      fixed: 'left',
      render:(text,record,index)=> {
        return <span>删除</span>
      }
    },{
      title: "sku编码",
      dataIndex: "skuCode",
      width: 100,
      textWrap: 'word-break',
    },{
      title: "规格",
      dataIndex: "salesAttributeName",
      width: 100,
      textWrap: 'word-break',
      render:(text,record,index)=> {
        return record.salesAttributeName
      }
    },{
      title: "审核状态",
      dataIndex: "status",
      width: 100,
      textWrap: 'word-break',
      render:(text,record,index)=> {
        return <span>{record.skuCode?record.status:'-'}</span>
      }
    },{
      title: "商品标签",
      dataIndex: "oldStatus",
      width: 100,
      textWrap: 'word-break',
      render:(text,record,index)=> {
        return record.oldStatus
      }
    },{
      title: "*商品条码",
      dataIndex: "barCode",
      textWrap: 'word-break',
      width: 100,
      render:(text,record,index)=> {
        return  <div>
                {
                  form.getFieldDecorator(`skuList[${index}].barCode`,{
                    initialValue:record.barCode
                  })(
                    <Input className="goods-name" key={index}/>
                  )
                }
              </div>
      }
    },{
      title: "*采购价",
      width: 100,
      textWrap: 'word-break',
      dataIndex: "purchasePrice",
      render:(text,record,index)=> {
        return  <div>
                {
                  form.getFieldDecorator(`skuList[${index}].purchasePrice`,{
                    initialValue:record.purchasePrice
                  })(
                    <Input  disabled={record.isExamine} className="goods-name" key={index}/>
                  )
                }
              </div>
      }
    },{
      title: "*B端售价",
      width: 100,
      textWrap: 'word-break',
      dataIndex: "businessPrice",
      render:(text,record,index)=> {
        return  <div>
                {
                  form.getFieldDecorator(`skuList[${index}].businessPrice`,{
                    initialValue:record.businessPrice
                  })(
                    <Input  disabled={record.isExamine} className="goods-name" key={index}/>
                  )
                }
              </div>
      }
    },{
      title: "*C端售价",
      width: 100,
      textWrap: 'word-break',
      dataIndex: "customerPrice",
      render:(text,record,index)=> {
        return  <div>
                {
                  form.getFieldDecorator(`skuList[${index}].customerPrice`,{
                    initialValue:record.customerPrice
                  })(
                    <Input  disabled={record.isExamine} className="goods-name" key={index}/>
                  )
                }
              </div>
      }
    },{
      title: "*建议零售价",
      width: 100,
      textWrap: 'word-break',
      dataIndex: "proposalPrice",
      render:(text,record,index)=> {
        return  <div>
                {
                  form.getFieldDecorator(`skuList[${index}].proposalPrice`,{
                    initialValue:record.proposalPrice
                  })(
                    <Input  disabled={record.isExamine} className="goods-name" key={index}/>
                  )
                }
              </div>
       }
    },{
      title: "*直邮服务费（%）",
      width: 100,
      textWrap: 'word-break',
      dataIndex: "bonusRate",
      render:(text,record,index)=> {
        return  <div>
                {
                  form.getFieldDecorator(`skuList[${index}].bonusRate`,{
                    initialValue:record.bonusRate
                  })(
                    <Input  disabled={record.isExamine} className="goods-name" key={index}/>
                  )
                }
              </div>
       }
    },{
      title: "*税率（%）",
      width: 100,
      textWrap: 'word-break',
      dataIndex: "taxRate",
      render:(text,record,index)=> {
        return  <div>
                {
                  form.getFieldDecorator(`skuList[${index}].taxRate`,{
                    initialValue:record.taxRate
                  })(
                    <Input  disabled={record.isExamine} className="goods-name" key={index}/>
                  )
                }
              </div>
      }
    },{
      title: "*保质期（天）",
      width: 100,
      textWrap: 'word-break',
      dataIndex: "shelfLife",
      render:(text,record,index)=> {
        return  <div>
                {
                  form.getFieldDecorator(`skuList[${index}].shelfLife`,{
                    initialValue:record.shelfLife
                  })(
                    <Input  disabled={record.isExamine} className="goods-name" key={index}/>
                  )
                }
              </div>
      }
    },{
      title: "*毛重（g）",
      dataIndex: "weight",
      width: 100,
      textWrap: 'word-break',
      render:(text,record,index)=> {
        return  <div>
                {
                  form.getFieldDecorator(`skuList[${index}].weight`,{
                    initialValue:record.weight
                  })(
                    <Input  disabled={record.isExamine} className="goods-name" key={index}/>
                  )
                }
              </div>
      }
    }]
}
export { Columns, columnsAdd };
