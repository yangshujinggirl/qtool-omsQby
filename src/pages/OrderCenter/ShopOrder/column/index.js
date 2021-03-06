import moment from "moment";
import { Input,Form } from 'antd';

import { Link } from 'react-router-dom';
// let FormItem = Form.Item;

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
const columnsAdd=(FormItem)=> {
  // console.log(FormItem)
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
        return  <FormItem name={['skuList',index,'barCode']} noStyle>
                  <Input className="goods-name" key={index}/>
                </FormItem>
      }
    },{
      title: "*采购价",
      width: 100,
      textWrap: 'word-break',
      dataIndex: "purchasePrice",
      render:(text,record,index)=> {
        return  <FormItem name={['skuList',index,'purchasePrice']} noStyle>
                  <Input  disabled={record.isExamine} className="goods-name" key={index} value={record.purchasePrice}/>
                </FormItem>
      }
    },{
      title: "*B端售价",
      width: 100,
      textWrap: 'word-break',
      dataIndex: "businessPrice",
      render:(text,record,index)=> {
        return  <FormItem name={['skuList',index,'businessPrice']} noStyle>
                  <Input  disabled={record.isExamine} className="goods-name" key={index} value={record.businessPrice}/>
                </FormItem>

      }
    },{
      title: "*C端售价",
      width: 100,
      textWrap: 'word-break',
      dataIndex: "customerPrice",
      render:(text,record,index)=> {
        return  <FormItem name={['skuList',index,'customerPrice']} noStyle>
                  <Input  disabled={record.isExamine} className="goods-name" key={index} value={record.customerPrice}/>
                </FormItem>

      }
    },{
      title: "*建议零售价",
      width: 100,
      textWrap: 'word-break',
      dataIndex: "proposalPrice",
      render:(text,record,index)=> {
        return  <FormItem name={['skuList',index,'proposalPrice']} noStyle>
                  <Input  disabled={record.isExamine} className="goods-name" key={index} value={record.proposalPrice}/>
                </FormItem>

       }
    },{
      title: "*直邮服务费（%）",
      width: 100,
      textWrap: 'word-break',
      dataIndex: "bonusRate",
      render:(text,record,index)=> {
        return  <FormItem name={['skuList',index,'bonusRate']} noStyle>
                  <Input  disabled={record.isExamine} className="goods-name" key={index} value={record.bonusRate}/>
                </FormItem>

       }
    },{
      title: "*税率（%）",
      width: 100,
      textWrap: 'word-break',
      dataIndex: "taxRate",
      render:(text,record,index)=> {
        return  <FormItem name={['skuList',index,'taxRate']} noStyle>
                  <Input  disabled={record.isExamine} className="goods-name" key={index} value={record.taxRate}/>
                </FormItem>

      }
    },{
      title: "*保质期（天）",
      width: 100,
      textWrap: 'word-break',
      dataIndex: "shelfLife",
      render:(text,record,index)=> {
        return  <FormItem name={['skuList',index,'shelfLife']} noStyle>
                  <Input  disabled={record.isExamine} className="goods-name" key={index} value={record.shelfLife}/>
                </FormItem>

      }
    },{
      title: "*毛重（g）",
      dataIndex: "weight",
      width: 100,
      textWrap: 'word-break',
      render:(text,record,index)=> {
        return  <FormItem name={['skuList',index,'weight']} noStyle>
                  <Input  disabled={record.isExamine} className="goods-name" key={index} value={record.weight}/>
                </FormItem>

      }
    }]
}
export { Columns, columnsAdd };
