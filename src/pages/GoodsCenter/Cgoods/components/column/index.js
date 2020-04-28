import moment from "moment";
import { Link } from 'react-router-dom';
import { QenlargeImg } from 'common';
import { Sessions } from 'utils';
const fileDomain = Sessions.get('fileDomain');

const ColumnsPar =[
    {
      title: "Spu编码",
      dataIndex: "spuCode",
    },
    {
      title: "SpuId",
      dataIndex: "pdSpuId",
    },
    {
      title: "商品名称",
      dataIndex: "productName",
    },
    {
      title: "商品类型",
      dataIndex: "productTypeStr"
    },
    {
      title: "后台类目",
      dataIndex: "categoryStr"
    },
    {
      title: "sku数",
      dataIndex: "skuNums"
    },
    {
      title: "是否新品",
      dataIndex: "isNewStr"
    },
    {
      title: "销量",
      dataIndex: "saleAmount"
    },
    {
      title: "操作",
      render: (text,record,index) => {
        let link = record.productNature==1?'generalTrade':'crossBorder';
        return <div>
          <Link
            to={`/account/${link}/info/${record.spuCode}`}>
            查看
          </Link>
          &nbsp;
          <Link
            to={`/account/${link}/edit/${record.spuCode}`}>
            编辑
          </Link>
          &nbsp;
          <Link
            to={`/account/${link}/log/${record.spuCode}`}>
            日志
          </Link>
        </div>
      }
    }
  ]
const ColumnsSub = [
  {
    title: "Sku编码",
    dataIndex: "skuCode",
  },
  {
    title: "商品图片",
    dataIndex: "image",
    render:(text,record,index)=> {
      return <QenlargeImg url={record.image}/>
    }
  },
  {
    title: "规格",
    dataIndex: "salesAttributeName"
  },
  {
    title: "C端售价",
    dataIndex: "customerPrice"
  },
  {
    title: "销量",
    dataIndex: "saleAmount"
  },
  {
    title: "状态",
    dataIndex: "upperStatusStr"
  },
  {
    title: "操作",
    render: (text,record,index) => (
      <span>
      {
        !!record.upperStatusStr&&
        <span className="pointerSty" onClick={()=>record.onOperateClick('sale')}>立即{(record.upperStatusStr=='下架'||record.upperStatusStr=='待引用')?"上架":'下架'}</span>
      }
      </span>
    )
  }
];

const ColumnsInfo = [
  {
    title: 'sku编码',
    dataIndex: 'skuCode',
  },{
    title: '规格',
    dataIndex: 'salesAttributeName',
  },{
    title: '商品条码',
    dataIndex: 'barCode',
  },{
    title: 'C端售价',
    dataIndex: 'customerPrice',
  },{
    title: 'sku图片',
    dataIndex: 'image',
    render:(text,record,index) => {
      return <QenlargeImg  url={`${record.image}`}/>
    }
  },{
    title: '商品提示',
    dataIndex: 'skuTips',
  },{
    title: '商品保质期',
    dataIndex: 'skuShelfLife',
  }];
export { ColumnsPar, ColumnsSub, ColumnsInfo };
