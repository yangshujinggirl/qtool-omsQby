import { Link } from "react-router-dom";
const parColumns = [
  { title: "SPU编码", dataIndex: "spuCode", key: "1" },
  {
    title: "商品名称",
    dataIndex: "productName",
    key: "2",
  },
  {
    title: "商品分类",
    dataIndex: "cateStr",
    key: "3",
  },
  {
    title: "商品类型",
    dataIndex: "productType",
    key: "4",
    render: (text) => <span>{text == 1 ? "正常销售品" : "赠品"}</span>,
  },
  {
    title: "商品标签",
    dataIndex: "label",
    key: "5",
    render: (text, record) => (
      <span>
        {record.isNew ? "新/" : ""}
        {record.isHot ? "畅/" : ""}
        {record.isBeforeSales ? "预/" : ""}
        {record.isMultipleSpec ? "新/" : ""}
        {record.isComplete ? "缺/" : ""}
      </span>
    ),
  },
  {
    title: "在售库存",
    dataIndex: "totalStockQty",
    key: "6",
  },
  {
    title: "销售数量",
    dataIndex: "totalSaleQty",
    key: "7",
  },
  {
    title: "sku数",
    dataIndex: "skuNum",
    key: "8",
    render: (text, record) => {
      <span>{record.subList && record.subList.length}</span>;
    },
  },
  {
    title: "操作",
    key: "action",
    dataIndex: "",
    render: (text, record, index) => (
      <div>
        <Link
          className="link-color action-left"
          to={`/account/bgoodsInfo/${record.id}`}
        >
          查看
        </Link>
        <Link className="link-color" to={`/account/bgoodsAdd/${record.id}`}>
          编辑
        </Link>
      </div>
    ),
  },
];
const subColumns = [
  {
    title: "Sku编码",
    dataIndex: "skuCode",
    key: "1",
  },
  {
    title: "商品图片",
    dataIndex: "img",
    key: "2",
    render: (text, record, index) =>
      text ? (
        <img
          src={sessionStorage.getItem("oms_fileDomain") + record.image}
          style={{ width: "80px", height: "80px" }}
        />
      ) : (
        <img
          src="/src/static/nogoods.png"
          style={{ width: "80px", height: "80px" }}
        />
      ),
  },
  {
    title: "规格",
    dataIndex: "salesAttributeName",
    key: "3",
  },
  {
    title: "售价",
    dataIndex: "businessPrice",
    key: "4",
  },
  {
    title: "在售库存",
    dataIndex: "stockQty",
    key: "5",
  },
  {
    title: "销量",
    dataIndex: "saleQty",
    key: "6",
  },
  {
    title: "商品状态",
    dataIndex: "upperStatus",
    key: "7",
    render: (text, record) =>
      record.upperStatus == 0 ? (
        <span>
          下架中
          <br />
          <a style={{ color: "red" }}>(即将上架)</a>
        </span>
      ) : record.upperStatus == 1 ? (
        <span>
          上架中
          <br />
          <a style={{ color: "red" }}>(即将下架)</a>
        </span>
      ) : (
        <span>
          待引用
          <br />
          <a style={{ color: "red" }}>(即将上架)</a>
        </span>
      ),
  },
  {
    title: "最近上架时间",
    dataIndex: "lastUpperShelvesTime",
    key: "8",
  },
  {
    title: "操作",
    key: "9",
    dataIndex: "",
    render: (text, record, index) => (
      <div>
        {record.upperStatus == 0 || record.upperStatus == 2 ? (
          <a className="link-color" onClick={() => record.onOperateClick(1)}>
            立即上架
          </a>
        ) : (
          <a className="link-color" onClick={() => record.onOperateClick(0)}>
            立即下架
          </a>
        )}
      </div>
    ),
  },
];
//编辑页的sku信息
const editColumns = [
  {
    title: "SKU编码",
    dataIndex: "skuCode",
    placeholder: "30字以内，端请谨慎填写",
  },
  {
    title: "商品条码",
    dataIndex: "barCode",
  },
  {
    title: "规格",
    dataIndex: "salesAttributeName",
  },
  {
    title: "SKU图片",
    dataIndex: "img",
    render: (text, record, index) =>
      text ? (
        <img
          src={sessionStorage.getItem("oms_fileDomain") + record.image}
          style={{ width: "80px", height: "80px" }}
        />
      ) : (
        <img
          src="/src/static/nogoods.png"
          style={{ width: "80px", height: "80px" }}
        />
      ),
  },
  {
    title: "掌柜售价(元)",
    dataIndex: "businessPrice",
  },
  {
    title: "POS零售价(元)",
    dataIndex: "proposalPrice",
  },
  {
    title: "在售库存",
    dataIndex: "stockQty",
  },
  {
    title: "销售数量",
    dataIndex: "saleQty",
  },
  {
    title: "商品提示",
    dataIndex: "skuTips",
    editable: true,
    placeholder: "30字以内，将展示在B端请谨慎填写",
  },
  {
    title: "商品状态",
    dataIndex: "upperStatus",
    render: (text, record) =>
      record.upperStatus == 0
        ? "下架"
        : record.upperStatus == 1
        ? "上架"
        : "待引用",
  },
];

export { parColumns, subColumns, editColumns };
