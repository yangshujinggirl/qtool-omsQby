import moment from "moment";
import { Input,Form,Select } from 'antd';
import { QupLoadImgLimt } from 'common';
import { RegExpUtil, Sessions } from 'utils';
import { oldStatusOptions } from '../components/options';

import { Link } from 'react-router-dom';
let FormItem = Form.Item;
let Option = Select.Option;
let fileDomain = Sessions.get('fileDomain');

let commonColumns = {
  renderAction:(text,record,index)=>{
    let isSingle=true;
    if(record.salesAttributeName) {
      let splitArr = record.salesAttributeName.split('/');
      isSingle = splitArr.length>1?false:true;
    }
    return <span>
          {
            record.skuCode?"-":
            (isSingle ?'-'
              :
              <span className="pointerSty" onClick={()=>record.onOperateClick('delete')}>删除</span>
            )
          }
    </span>
  },
  renderSkuCode:(text,record,index)=> {
    return <span>{record.skuCode?record.skuCode:'-'}</span>
  },
  renderBarCode:(text,record,index)=> {
    return  <Form.Item name={['list',index,'barCode']} rules={ [{ required: true, message: '请输入'}]}>
              <Input disabled={record.isExamine} className="goods-name" key={index} autoComplete="off"/>
            </Form.Item>
  },
  renderPurchasePrice:(text,record,index)=> {
    return  <Form.Item
              name={['list',index,'purchasePrice']}
              rules={ [{ required: true, message: '请输入'},{pattern:RegExpUtil.moneyFourFloat,message:'请输入数字'}]}>
              <Input  disabled={record.isExamine} className="goods-name" key={index} autoComplete="off"/>
            </Form.Item>
  },
  renderCustomerPrice:(text,record,index)=> {
    return  <Form.Item
              name={['list',index,'customerPrice']}
              rules={ [{ required: true, message: '请输入'},{pattern:RegExpUtil.moneyTwoFloat,message:'请输入数字'}]}>
              <Input  disabled={record.isExamine} className="goods-name" key={index} autoComplete="off"/>
            </Form.Item>

  }
}

const ColumnsGeneral = [
  {
    title: "商品主图",
    dataIndex: "centralImg",
    render: text => <img src={`${fileDomain}${text}`} style={{ width: "90px", height: "90px" }} />
  },
  {
    title: "商品名称",
    dataIndex: "productName",
    render:(text,record,index)=> {
      return <Link
              className="link-color action-left"
              to={`/account/baseGoodsInfo/1/${record.spuCode}`}>
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
          to={`/account/baseGoodsAdd/1/${record.spuCode}`}>
          编辑商品
        </Link>
        &nbsp;&nbsp;
        <Link
          className="link-color"
          to={`/account/baseGoodsEditImg/${record.spuCode}`}>
          编辑图文
        </Link>
      </div>
    )
  }
];
const ColumnsAddGeneral=[
  {
    title: "操作",
    width: 100,
    textWrap: 'word-break',
    fixed: 'left',
    render:(text,record,index)=>commonColumns.renderAction(text,record,index)
  },{
    title: "sku编码",
    dataIndex: "skuCode",
    width: 100,
    textWrap: 'word-break',
    render:(text,record,index)=>commonColumns.renderSkuCode(text,record,index)
  },{
    title: "规格",
    dataIndex: "salesAttributeName",
    width: 100,
    textWrap: 'word-break'
  },{
    title: "审核状态",
    dataIndex: "statusStr",
    width: 100,
    textWrap: 'word-break',
    render:(text,record,index)=> {
      return <span>{record.statusStr?record.statusStr:'-'}</span>
    }
  },{
    title: "*商品标签",
    dataIndex: "oldStatus",
    width: 120,
    textWrap: 'word-break',
    render:(text,record,index)=> {
      return  <Form.Item name={['list',index,'oldStatus']} rules={ [{ required: true, message: '请选择'}]}>
                <Select disabled={record.isExamine} autoComplete="off">
                {
                  oldStatusOptions.map((el) => (
                    <Option value={el.key} key={el.key}>{el.value}</Option>
                  ))
                }
                </Select>
              </Form.Item>
    }
  },{
    title: "*商品条码",
    dataIndex: "barCode",
    textWrap: 'word-break',
    width: 100,
    render:(text,record,index)=>commonColumns.renderBarCode(text,record,index)
  },{
    title: "*采购价",
    width: 100,
    textWrap: 'word-break',
    dataIndex: "purchasePrice",
    render:(text,record,index)=>commonColumns.renderPurchasePrice(text,record,index)
  },{
    title: "*B端售价",
    width: 100,
    textWrap: 'word-break',
    dataIndex: "businessPrice",
    render:(text,record,index)=> {
      return  <Form.Item
                name={['list',index,'businessPrice']}
                rules={ [{ required: true, message: '请输入'},{pattern:RegExpUtil.moneyTwoFloat,message:'请输入数字'}]}>
                <Input  disabled={record.isExamine} className="goods-name" key={index} autoComplete="off"/>
              </Form.Item>

    }
  },{
    title: "*C端售价",
    width: 100,
    textWrap: 'word-break',
    dataIndex: "customerPrice",
    render:(text,record,index)=>commonColumns.renderCustomerPrice(text,record,index)
  },{
    title: "*建议零售价",
    width: 100,
    textWrap: 'word-break',
    dataIndex: "proposalPrice",
    render:(text,record,index)=> {
      return  <Form.Item
                name={['list',index,'proposalPrice']}
                rules={ [{ required: true, message: '请输入'},{pattern:RegExpUtil.moneyTwoFloat,message:'请输入数字'}]}>
                <Input  disabled={record.isExamine} className="goods-name" key={index} autoComplete="off"/>
              </Form.Item>

     }
  },{
    title: "*直邮服务费（%）",
    width: 100,
    textWrap: 'word-break',
    dataIndex: "bonusRate",
    render:(text,record,index)=> {
      return  <Form.Item
                name={['list',index,'bonusRate']}
                rules={ [{ required: true, message: '请输入'},{pattern:RegExpUtil.moneyTwoFloat,message:'请输入数字'}]}>
                <Input  disabled={record.isExamine} className="goods-name" key={index} autoComplete="off"/>
              </Form.Item>

     }
  },{
    title: "*税率（%）",
    width: 100,
    textWrap: 'word-break',
    dataIndex: "taxRate",
    render:(text,record,index)=> {
      return  <Form.Item
                name={['list',index,'taxRate']}
                rules={ [{ required: true, message: '请输入'},{ pattern:RegExpUtil.taxRatePercent, message:'请输入数字'}]}>
                <Input  disabled={record.isExamine} className="goods-name" key={index} autoComplete="off"/>
              </Form.Item>

    }
  },{
    title: "*保质期（天）",
    width: 100,
    textWrap: 'word-break',
    dataIndex: "shelfLife",
    render:(text,record,index)=> {
      return  <Form.Item
                  name={['list',index,'shelfLife']}
                  rules={ [{ required: true, message: '请输入'},{pattern:RegExpUtil.qty,message:'请输入数字'}]}>
                <Input  disabled={record.isExamine} className="goods-name" key={index} autoComplete="off"/>
              </Form.Item>

    }
  },{
    title: "*毛重（g）",
    dataIndex: "weight",
    width: 100,
    textWrap: 'word-break',
    render:(text,record,index)=> {
      return  <Form.Item
                name={['list',index,'weight']}
                rules={ [{ required: true, message: '请输入'},{pattern:RegExpUtil.qty,message:'请输入数字'}]}>
                <Input  disabled={record.isExamine} className="goods-name" key={index} autoComplete="off"/>
              </Form.Item>

    }
  }]
const ColumnsEditImgGeneral=(upDateSkuList)=>{
  return [{
    title: "sku编码",
    dataIndex: "skuCode",
    width: 100,
    textWrap: 'word-break',
  },{
    title: "规格",
    dataIndex: "attribute",
    width: 100,
    textWrap: 'word-break'
  },{
    title: "商品标签",
    dataIndex: "label",
    width: 120,
    textWrap: 'word-break',
    render:(text,record,index)=> {
      return <span>
          {
            oldStatusOptions.map((el)=>(
              el.key == record.label&&el.value
            ))
          }
      </span>
    }
  },{
    title: "*SKU图片",
    dataIndex: "skuImg",
    textWrap: 'word-break',
    width: 100,
    render:(text,record,index)=> {
      return  <QupLoadImgLimt
                name={['skuImgList',index,'skuImg']}
                fileList={record.skuImg}
                limit="1"
                upDateList={(fileList)=>upDateSkuList(fileList,index)}/>
    }
  }]}
const ColumnsInfoGeneral=[
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
    }];

const ColumnsCross = [
  {
    title: "商品主图",
    dataIndex: "centralImg",
    render: text => <img src={`${fileDomain}${text}`} style={{ width: "90px", height: "90px" }} />
  },
  {
    title: "商品名称",
    dataIndex: "productName",
    render:(text,record,index)=> {
      return <Link
              className="link-color action-left"
              to={`/account/baseGoodsInfo/2/${record.spuCode}`}>
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
    dataIndex: "warehouseName",
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
const ColumnsAddCross=[
  {
    title: "操作",
    width: 100,
    textWrap: 'word-break',
    fixed: 'left',
    render:(text,record,index)=>commonColumns.renderAction(text,record,index)
  },{
    title: "sku编码",
    dataIndex: "skuCode",
    width: 100,
    textWrap: 'word-break',
    render:(text,record,index)=>commonColumns.renderSkuCode(text,record,index)
  },{
    title: "规格",
    dataIndex: "salesAttributeName",
    width: 100,
    textWrap: 'word-break'
  },{
    title: "*第三方商品编码",
    dataIndex: "outerProductCode",
    width: 100,
    textWrap: 'word-break',
    render:(text,record,index)=> {
      return  <Form.Item name={['list',index,'outerProductCode']} rules={ [{ required: true, message: '请输入'}]}>
                <Input className="goods-name" key={index} autoComplete="off"/>
              </Form.Item>
    }
  },{
    title: "*商品条码",
    dataIndex: "barCode",
    textWrap: 'word-break',
    width: 100,
    render:(text,record,index)=>commonColumns.renderBarCode(text,record,index)
  },{
    title: "*采购价",
    width: 100,
    textWrap: 'word-break',
    dataIndex: "purchasePrice",
    render:(text,record,index)=>commonColumns.renderPurchasePrice(text,record,index)
  },{
    title: "*到货价",
    width: 100,
    textWrap: 'word-break',
    dataIndex: "dhPrice",
    render:(text,record,index)=> {
      return  <Form.Item
                name={['list',index,'dhPrice']}
                rules={ [{ required: true, message: '请输入'},{pattern:RegExpUtil.moneyTwoFloat,message:'请输入数字'}]}>
                <Input  disabled={record.isExamine} className="goods-name" key={index} autoComplete="off"/>
              </Form.Item>

    }
  },{
    title: "*出库价",
    width: 100,
    textWrap: 'word-break',
    dataIndex: "ckPrice",
    render:(text,record,index)=> {
      return  <Form.Item
              name={['list',index,'ckPrice']}
              rules={ [{ required: true, message: '请输入'},{pattern:RegExpUtil.moneyTwoFloat,message:'请输入数字'}]}>
                <Input  disabled={record.isExamine} className="goods-name" key={index} autoComplete="off"/>
              </Form.Item>

    }
  },{
    title: "*C端售价",
    width: 100,
    textWrap: 'word-break',
    dataIndex: "customerPrice",
    render:(text,record,index)=>commonColumns.renderCustomerPrice(text,record,index)
  },{
    title: "*分成比例（%）",
    width: 100,
    textWrap: 'word-break',
    dataIndex: "bonusRate",
    render:(text,record,index)=> {
      return  <Form.Item
                name={['list',index,'bonusRate']}
                rules={ [{ required: true, message: '请输入'},{pattern:RegExpUtil.taxRatePercent,message:'请输入数字'}]}>
                <Input  disabled={record.isExamine} className="goods-name" key={index} autoComplete="off"/>
              </Form.Item>

     }
  },{
    title: "*跨境综合税（%）",
    width: 100,
    textWrap: 'word-break',
    dataIndex: "taxRate",
    render:(text,record,index)=> {
      return  <Form.Item
                name={['list',index,'taxRate']}
                rules={ [{ required: true, message: '请输入'},{pattern:RegExpUtil.taxRatePercent,message:'请输入数字'}]}>
                <Input  disabled={record.isExamine} className="goods-name" key={index} autoComplete="off"/>
              </Form.Item>

    }
  }];
const ColumnsInfoCross=[
  {
    title: "sku编码",
    dataIndex: "skuCode",
    width: 100,
    fixed: 'left',
  },{
    title: "规格",
    dataIndex: "salesAttributeName",
    width: 100,
  },{
    title: "*第三方商品编码",
    dataIndex: "outerProductCode",
    width: 120,
    textWrap: 'word-break',
  },{
    title: "*商品条码",
    dataIndex: "barCode",
    width: 120,
    textWrap: 'word-break',
  },{
    title: "*采购价",
    width: 100,
    dataIndex: "purchasePrice",
  },{
    title: "*到货价",
    width: 100,
    dataIndex: "dhPrice",
  },{
    title: "*出库价",
    width: 100,
    dataIndex: "ckPrice",
  },{
    title: "*C端售价",
    width: 100,
    dataIndex: "customerPrice",
  },{
    title: "*分成比例（%）",
    width: 100,
    dataIndex: "bonusRate",
  },{
    title: "*跨境综合税（%）",
    width: 100,
    dataIndex: "taxRate",
  }];

const BatchListGenreal=[
  {
    value:'采购价格',
    key:'purchasePrice'
  },{
    value:'B端售价',
    key:'businessPrice'
  },{
    value:'C端售价',
    key:'customerPrice'
  },{
    value:'建议零售价',
    key:'proposalPrice'
  },{
    value:'直邮服务费',
    key:'bonusRate'
  },{
    value:'税率',
    key:'taxRate'
  },{
    value:'保质期',
    key:'shelfLife'
  },{
    value:'毛重',
    key:'weight'
  }]
const BatchListCross=[
  {
    value:'采购价格',
    key:'purchasePrice'
  },{
    value:'到货价',
    key:'dhPrice'
  },{
    value:'出库价',
    key:'ckPrice'
  },{
    value:'C端售价',
    key:'customerPrice'
  },{
    value:'分成比例',
    key:'bonusRate'
  },{
    value:'跨境综合税',
    key:'taxRate'
  }]
export {
  BatchListGenreal,
  BatchListCross,
  ColumnsInfoCross,
  ColumnsCross,
  ColumnsAddCross,
  ColumnsGeneral,
  ColumnsAddGeneral,
  ColumnsEditImgGeneral,
  ColumnsInfoGeneral
 };
