import { Link } from "react-router-dom";
import moment from "moment";

const Columns = [
  {
    title: "sku编码",
    dataIndex: "skuCode",
    key: "1"
  },
  {
    title: "商品名称",
    dataIndex: "productName",
    key: "2"
  },
  {
    title: "规格",
    dataIndex: "salesAttributeName",
    key: "3",
    width:'5%'
  },
  {
    title: "商品类型",
    dataIndex: "productType",
    key: "4",
    width:'5%',
    render: (text, record, index) => (
      <div>{text == 1 ? "普通商品" : "赠品"}</div>
    )
  },
  {
    title: "审核状态",
    dataIndex: "status",
    key: "5",
    render: (text, record, index) => (
      <div>
        {(() => {
          switch (text) {
            case 1:
              return "待审核";
              break;
            case 2:
              return "审核通过";
              break;
            case 3:
              return "审核不通过";
              break;
            default:
              return null;
          }
        })()}
      </div>
    )
  },
  {
    title: "采购价",
    dataIndex: "purchasePrice",
    key: "6",
    render: (text, record, index) => (
      <div>
        <span style={{ color: "red" }}>{record.purchasePrice}</span><br/>
        {record.exPurchasePrice}
      </div>
    )
  },
  {
    title: "B端售价",
    dataIndex: "businessPrice",
    key: "7",
    render: (text, record, index) => (
      <div>
        <span style={{ color: "red" }}>{record.businessPrice}</span><br/>
        ({record.exBusinessPrice})
      </div>
    )
  },
  {
    title: "公司毛利率",
    dataIndex: "businessProfit",
    key: "8",
    render: (text, record, index) => (
      <div>
        <span style={{ color: "red" }}>{record.businessProfit}</span>
        <br />
        ({record.exBusinessProfit})
      </div>
    )
  },
  {
    title: "C端售价",
    dataIndex: "customerPrice",
    key: "9",
    render: (text, record, index) => (
      <div>
        <span style={{ color: "red" }}>{record.customerPrice}</span><br/>
        {record.exCustomerPrice}
      </div>
    )
  },
  {
    title: "门店毛利率",
    dataIndex: "customerProfit",
    key: "10",
    render: (text, record, index) => (
      <div>
        <span style={{ color: "red" }}>{record.customerProfit}</span>
        <br />
        {(record.exCustomerProfit)}
      </div>
    )
  },
  {
    title: "建议零售价",
    dataIndex: "channelStatus",
    key: "11",
    render: (text, record, index) => (
      <div>
        <span style={{ color: "red" }}>{record.proposalPrice}</span>
        <br />
        {record.exProposalPrice}
      </div>
    )
  },
  {
    title: "直邮服务费",
    dataIndex: "channelStatus",
    key: "12",
    render: (text, record, index) => (
      <div>
        <span style={{ color: "red" }}>{record.bonusRate}</span>
        <br />
        {record.exBonusRate}
      </div>
    )
  },
  {
    title: "税率",
    dataIndex: "channelStatus",
    key: "13",
    render: (text, record, index) => (
      <div>
        <span style={{ color: "red" }}>{record.exBonusRate}</span>
        <br />
        {record.taxRate}
      </div>
    )
  },
  {
    title: "修改说明",
    dataIndex: "remarks",
    key: "14"
  },
  {
    title: "提报时间",
    dataIndex: "createTime",
    key: "15",
    render: (text, record, index) => (
      <div>
        <span>{record.createBy}</span>
        <br />
        <span>{moment(text).format("YYYY-MM-DD HH:mm:ss")}</span>
      </div>
    )
  },
  {
    title: "审核时间",
    dataIndex: "lastUpdateTime",
    key: "16",
    render: (text, record, index) => (
      <div>
        <span>{record.modifyBy}</span>
        <br />
        <span>{moment(text).format("YYYY-MM-DD HH:mm:ss")}</span>
      </div>
    )
  },
  {
    title: "操作",
    key: "17",
    render: (text, record, index) => {
      return (
        <div>
          <a
            className="link-color"
            onClick={record.onOperateClick.bind(this, "audit")}
          >
            审核
          </a>
          　
          <a
            className="link-color"
            onClick={record.onOperateClick.bind(this, "cancel")}
          >
            撤销
          </a>
        </div>
      );
    }
  }
];
export default Columns;
