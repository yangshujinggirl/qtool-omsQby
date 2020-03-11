import moment from "moment";
import { Input,Form,Select } from 'antd';
// import { QupLoadImgLimt } from 'common';
import QupLoadImgLimt from '../components/QupLoadImgLimt';

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
          to={`/account/baseGoodsAdd/${record.spuCode}`}>
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
      width: 120,
      textWrap: 'word-break',
      render:(text,record,index)=> {
        return  <Form.Item name={['list',index,'oldStatus']}>
                  <Select disabled={record.isExamine}>
                    <Option value={3}>正常商品</Option>
                    <Option value={5}>淘汰商品</Option>
                  </Select>
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
      title: "*B端售价",
      width: 100,
      textWrap: 'word-break',
      dataIndex: "businessPrice",
      render:(text,record,index)=> {
        return  <Form.Item name={['list',index,'businessPrice']}>
                  <Input  disabled={record.isExamine} className="goods-name" key={index} value={record.businessPrice}/>
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
      title: "*建议零售价",
      width: 100,
      textWrap: 'word-break',
      dataIndex: "proposalPrice",
      render:(text,record,index)=> {
        return  <Form.Item name={['list',index,'proposalPrice']}>
                  <Input  disabled={record.isExamine} className="goods-name" key={index} value={record.proposalPrice}/>
                </Form.Item>

       }
    },{
      title: "*直邮服务费（%）",
      width: 100,
      textWrap: 'word-break',
      dataIndex: "bonusRate",
      render:(text,record,index)=> {
        return  <Form.Item name={['list',index,'bonusRate']}>
                  <Input  disabled={record.isExamine} className="goods-name" key={index} value={record.bonusRate}/>
                </Form.Item>

       }
    },{
      title: "*税率（%）",
      width: 100,
      textWrap: 'word-break',
      dataIndex: "taxRate",
      render:(text,record,index)=> {
        return  <Form.Item name={['list',index,'taxRate']}>
                  <Input  disabled={record.isExamine} className="goods-name" key={index} value={record.taxRate}/>
                </Form.Item>

      }
    },{
      title: "*保质期（天）",
      width: 100,
      textWrap: 'word-break',
      dataIndex: "shelfLife",
      render:(text,record,index)=> {
        return  <Form.Item name={['list',index,'shelfLife']}>
                  <Input  disabled={record.isExamine} className="goods-name" key={index} value={record.shelfLife}/>
                </Form.Item>

      }
    },{
      title: "*毛重（g）",
      dataIndex: "weight",
      width: 100,
      textWrap: 'word-break',
      render:(text,record,index)=> {
        return  <Form.Item name={['list',index,'weight']}>
                  <Input  disabled={record.isExamine} className="goods-name" key={index} value={record.weight}/>
                </Form.Item>

      }
    }]
}
const columnsEditImg=(upDateSkuList)=>{
  return [{
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
    title: "商品标签",
    dataIndex: "label",
    width: 120,
    textWrap: 'word-break',
  },{
    title: "*SKU图片",
    dataIndex: "skuImg",
    textWrap: 'word-break',
    width: 100,
    render:(text,record,index)=> {
      // return  <Form.Item name={['list',index,'skuImg']}>
      // return <QupLoadImgUrl
      //         upDateFile={(fileList)=>upDateSkuList(fileList,index)}
      //         imageUrl={record.skuImg}/>
              // </Form.Item>
              let fileList = record.skuImg?record.skuImg:[];
      return  <QupLoadImgLimt
                rules={[{ required: true, message: '请上传图片' } ]}
                name={['skuImgList',index,'skuImg']}
                fileList={fileList}
                limit="1"
                upDateList={(fileList)=>upDateSkuList(fileList,index)}/>
    }
  }]}
const columnsinfo=[
  {
      title: "sku编码",
      dataIndex: "skuCode",
      width: 100,
      textWrap: 'word-break',
    },{
      title: "规格",
      dataIndex: "salesAttributeName",
      width: 100,
      textWrap: 'word-break',
    },{
      title: "审核状态",
      dataIndex: "status",
      width: 100,
      textWrap: 'word-break',
    },{
      title: "商品标签",
      dataIndex: "oldStatus",
      width: 120,
      textWrap: 'word-break',
    },{
      title: "*商品条码",
      dataIndex: "barCode",
      textWrap: 'word-break',
      width: 100,
    },{
      title: "*采购价",
      width: 100,
      textWrap: 'word-break',
      dataIndex: "purchasePrice",
    },{
      title: "*B端售价",
      width: 100,
      textWrap: 'word-break',
      dataIndex: "businessPrice",
    },{
      title: "*C端售价",
      width: 100,
      textWrap: 'word-break',
      dataIndex: "customerPrice",
    },{
      title: "*建议零售价",
      width: 100,
      textWrap: 'word-break',
      dataIndex: "proposalPrice",
    },{
      title: "*直邮服务费（%）",
      width: 100,
      textWrap: 'word-break',
      dataIndex: "bonusRate",
    },{
      title: "*税率（%）",
      width: 100,
      textWrap: 'word-break',
      dataIndex: "taxRate",
    },{
      title: "*保质期（天）",
      width: 100,
      textWrap: 'word-break',
      dataIndex: "shelfLife",
    },{
      title: "*毛重（g）",
      dataIndex: "weight",
      width: 100,
      textWrap: 'word-break'
    }]
export { Columns, columnsAdd, columnsinfo, columnsEditImg };
