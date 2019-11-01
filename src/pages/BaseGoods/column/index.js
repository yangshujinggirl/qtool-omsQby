import moment from "moment";
import { Input } from 'antd';

import { Link } from 'react-router-dom';
const Columns = [
  { title: "商品名称", dataIndex: "productName", key: "1" },
  {
    title: "商品图片",
    dataIndex: "imageListB",
    key: "2",
    render: text => <img src={text} style={{ width: "90px", height: "90px" }} />
  },
  {
    title: "商品种类",
    dataIndex: "productType",
    key: "3",
    render: text => (text == 1 ? "普通类型" : "跨境商品")
  },
  { title: "货主", dataIndex: "supplierName", key: "4" },
  { title: "品牌名", dataIndex: "brandName", key: "5" },
  { title: "销售端", dataIndex: "saleRange", key: "6" },
  {
    title: "发货类型",
    dataIndex: "sendType",
    key: "7",
    render: text => (text == 1 ? "系统发货" : "供应商发货")
  },
  { title: "创建时间", dataIndex: "createTime", key: "8",render:(text,record,index)=>(
    <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>
  ) },
  {
    title: "操作",
    key: "action",
    dataIndex: "",
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
const Columns1 = [
  { title: "sku编码", dataIndex: "skuCode", key: "1" },
  { title: "规格", dataIndex: "imageListB", key: "2" },
  {
    title: "审核状态",
    dataIndex: "status",
    key: "3",
    render: text => {
      switch (text) {
        case 0:
          return "待提交";
        case 1:
          return "待审核";
        case 3:
          return "审核不通过";
        case 4:
          return "审核通过";
      }
    }
  },
  {
    title: "操作",
    dataIndex: "action",
    key: "5",
    render: (text, record, index) =>
      record.status == 1 && (
        <div>
          <a
            className="link-color action-left"
            onClick={() => record.onOperateClick(4)}
          >
            通过
          </a>
          <a
            className="link-color"
            onClick={() => record.onOperateClick(3)}
          >
            不通过
          </a>
        </div>
      )
  }
];
const columnsAdd=(form)=> {
  return [
    {
      title: "sku编码",
      dataIndex: "skuCode"
    },{
      title: "规格",
      dataIndex: "salesAttributeName",
      render:(text,record,index)=> {
        return record.attributeName
      }
    },{
      title: "*商品条码",
      dataIndex: "barCode",
      render:(text,record,index)=> {
        return  <div>
                {
                  form.getFieldDecorator(`skuList[${index}].barCode`,{
                    initialValue:record.name
                  })(
                    <Input className="goods-name" key={index}/>
                  )
                }
              </div>
      }
    },{
      title: "税务码",
      dataIndex: "taxNo",
      render:(text,record,index)=> {
        return  <div>
                {
                  form.getFieldDecorator(`skuList[${index}].taxNo`,{
                    initialValue:record.name
                  })(
                    <Input  disabled className="goods-name" key={index}/>
                  )
                }
              </div>
      }
    },{
      title: "*采购价",
      dataIndex: "purchasePrice",
      render:(text,record,index)=> {
        return  <div>
                {
                  form.getFieldDecorator(`skuList[${index}].purchasePrice`,{
                    initialValue:record.name
                  })(
                    <Input  disabled className="goods-name" key={index}/>
                  )
                }
              </div>
      }
    },{
      title: "*到货价",
      dataIndex: "dhPrice",
      render:(text,record,index)=> {
        return  <div>
                {
                  form.getFieldDecorator(`skuList[${index}].dhPrice`,{
                    initialValue:record.name
                  })(
                    <Input  disabled className="goods-name" key={index}/>
                  )
                }
              </div>
       }
    },{
      title: "*C端参考价",
      dataIndex: "cPrice",
      render:(text,record,index)=> {
        return  <div>
                {
                  form.getFieldDecorator(`skuList[${index}].cPrice`,{
                    initialValue:record.name
                  })(
                    <Input  disabled className="goods-name" key={index}/>
                  )
                }
              </div>
      }
    },{
      title: "*出库价",
      dataIndex: "ckPrice",
      render:(text,record,index)=> {
        return  <div>
                {
                  form.getFieldDecorator(`skuList[${index}].ckPrice`,{
                    initialValue:record.name
                  })(
                    <Input  disabled className="goods-name" key={index}/>
                  )
                }
              </div>
      }
    },{
      title: "*税率",
      dataIndex: "taxRate",
      render:(text,record,index)=> {
        return  <div>
                {
                  form.getFieldDecorator(`skuList[${index}].taxRate`,{
                    initialValue:record.name
                  })(
                    <Input  disabled className="goods-name" key={index}/>
                  )
                }
              </div>
      }
    },{
      title: "保质期/天",
      dataIndex: "shelfLife",
      render:(text,record,index)=> {
        return  <div>
                {
                  form.getFieldDecorator(`skuList[${index}].shelfLife`,{
                    initialValue:record.name
                  })(
                    <Input  disabled className="goods-name" key={index}/>
                  )
                }
              </div>
      }
    },{
      title: "*毛重/g",
      dataIndex: "weight",
      render:(text,record,index)=> {
        return  <div>
                {
                  form.getFieldDecorator(`skuList[${index}].weight`,{
                    initialValue:record.name
                  })(
                    <Input  disabled className="goods-name" key={index}/>
                  )
                }
              </div>
      }
    },{
      title: "长/cm",
      dataIndex: "length",
      render:(text,record,index)=> {
        return  <div>
                {
                  form.getFieldDecorator(`skuList[${index}].length`,{
                    initialValue:record.name
                  })(
                    <Input  disabled className="goods-name" key={index}/>
                  )
                }
              </div>
      }
    },{
      title: "宽/cm",
      dataIndex: "wide",
      render:(text,record,index)=> {
        return  <div>
                {
                  form.getFieldDecorator(`skuList[${index}].wide`,{
                    initialValue:record.name
                  })(
                    <Input  disabled className="goods-name" key={index}/>
                  )
                }
              </div>
      }
    },{
      title: "高/cm",
      dataIndex: "high",
      render:(text,record,index)=> {
        return  <div>
                {
                  form.getFieldDecorator(`skuList[${index}].high`,{
                    initialValue:record.name
                  })(
                    <Input  disabled className="goods-name" key={index}/>
                  )
                }
              </div>
      }
    },{
      title: "sku图片",
      dataIndex: "image",
      render:(text,record,index)=> {
        return  <div>
                {
                  form.getFieldDecorator(`skuList[${index}].image`,{
                    initialValue:record.name
                  })(
                    <Input  disabled className="goods-name" key={index}/>
                  )
                }
              </div>
      }
    }]
}
export { Columns, Columns1, columnsAdd };
