import moment from "moment";
import { Input,Form,Select } from 'antd';

import { Link } from 'react-router-dom';
let FormItem = Form.Item;
let Option = Select.Option;
const Columns = [
  {
    title: "商品主图",
    dataIndex: "productImg",
    render: text => <img src={text} style={{ width: "90px", height: "90px" }} />
  },
  {
    title: "商品名称",
    dataIndex: "productName",
    render:(text,record,index)=> {
      return <Link
              className="link-color action-left"
              to={`/account/baseGoodsInfo/${record.spuCode}`}>
              {record.productName}
            </Link>
    }
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
    title: "保税仓",
    dataIndex: "bondedWarehouseName",
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
        className="link-color"
        to={`/account/baseGoodsAdd/2/${record.spuCode}`}>
        编辑商品
      </Link>
      <Link
        className="link-color"
        to={`/account/baseGoodsEditImg/${record.spuCode}`}>
        编辑图文
      </Link>
      </div>
    )
  }
];
const columnsAdd=()=> {
  return [
    {
      title: "操作",
      width: 100,
      textWrap: 'word-break',
      fixed: 'left',
      render:(text,record,index)=> {
        return <span>
              {
                record.skuCode?"-":
                <span className="pointerSty" onClick={()=>record.onOperateClick('delete')}>删除</span>
              }
        </span>
      }
    },{
      title: "sku编码",
      dataIndex: "skuCode",
      width: 100,
      textWrap: 'word-break',
      render:(text,record,index)=> {
        return <span>{record.skuCode?record.skuCode:'-'}</span>
      }
    },{
      title: "规格",
      dataIndex: "salesAttributeName",
      width: 100,
      textWrap: 'word-break',
      render:(text,record,index)=> {
        return record.salesAttributeName
      }
    },{
      title: "第三方商品编码",
      dataIndex: "outerProductCode",
      width: 120,
      textWrap: 'word-break',
      render:(text,record,index)=> {
        return  <Form.Item name={['list',index,'outerProductCode']}>
                  <Input disabled={record.isExamine} className="goods-name" key={index}/>
                </Form.Item>
      }
    },{
      title: "*商品条码",
      dataIndex: "barCode",
      textWrap: 'word-break',
      width: 100,
      render:(text,record,index)=> {
        return  <Form.Item name={['list',index,'barCode']}>
                  <Input disabled={record.isExamine} className="goods-name" key={index}/>
                </Form.Item>
      }
    },{
      title: "*采购价",
      width: 100,
      textWrap: 'word-break',
      dataIndex: "purchasePrice",
      render:(text,record,index)=> {
        return  <Form.Item name={['list',index,'purchasePrice']}>
                  <Input  disabled={record.isExamine} className="goods-name" key={index} value={record.purchasePrice}/>
                </Form.Item>
      }
    },{
      title: "*到货价",
      width: 100,
      textWrap: 'word-break',
      dataIndex: "dhPrice",
      render:(text,record,index)=> {
        return  <Form.Item name={['list',index,'dhPrice']}>
                  <Input  disabled={record.isExamine} className="goods-name" key={index} value={record.businessPrice}/>
                </Form.Item>

      }
    },{
      title: "*出库价",
      width: 100,
      textWrap: 'word-break',
      dataIndex: "ckPrice",
      render:(text,record,index)=> {
        return  <Form.Item name={['list',index,'ckPrice']}>
                  <Input  disabled={record.isExamine} className="goods-name" key={index} value={record.customerPrice}/>
                </Form.Item>

      }
    },{
      title: "*C端售价",
      width: 100,
      textWrap: 'word-break',
      dataIndex: "customerPrice",
      render:(text,record,index)=> {
        return  <Form.Item name={['list',index,'customerPrice']}>
                  <Input  disabled={record.isExamine} className="goods-name" key={index} value={record.customerPrice}/>
                </Form.Item>

      }
    },{
      title: "*分成比例（%）",
      width: 100,
      textWrap: 'word-break',
      dataIndex: "bonusRate",
      render:(text,record,index)=> {
        return  <Form.Item name={['list',index,'bonusRate']}>
                  <Input  disabled={record.isExamine} className="goods-name" key={index} value={record.taxRate}/>
                </Form.Item>

      }
    },{
      title: "*跨境综合税（%）",
      dataIndex: "taxRate",
      width: 100,
      textWrap: 'word-break',
      render:(text,record,index)=> {
        return  <Form.Item name={['list',index,'taxRate']}>
                  <Input  disabled={record.isExamine} className="goods-name" key={index} value={record.weight}/>
                </Form.Item>

      }
    }]
}
export { Columns, columnsAdd };
