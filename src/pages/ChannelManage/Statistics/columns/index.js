import { Link } from "react-router-dom";
/**
 * 线下推广一级列表
 */
const columnsOfflinePrimary = [
  {
    title: "一级渠道ID",
    dataIndex: "channelPopularizeCoding"
  },
  {
    title: "一级渠道名称",
    dataIndex: "name"
  },
  {
    title: "省份",
    dataIndex: "provinceName"
  },
  {
    title: "累计注册量",
    dataIndex: "registrationQty"
  },
  {
    title: "累计成交量",
    dataIndex: "orderDealQty"
  },
  {
    title: "累计首单量",
    dataIndex: "firstOrderQty"
  },
  {
    title: "累计有效首单量",
    dataIndex: "validFirstOrderQty"
  },
  {
    title: "操作",
    dataIndex: "remark",
    render: (text, record, index) => {
      return <Link to={`/account/bridge_statistics_infos?id=${record.channelPopularizeId}&source=1`}>查看二级渠道</Link>;
    }
  }
];
/**
 * 线下推广二级列表
 */
const columnsOfflineSecond = [
  {
    title: "二级渠道ID",
    dataIndex: "channelPopularizeCoding"
  },
  {
    title: "二级渠道名称",
    dataIndex: "name"
  },
  {
    title: "手机号",
    dataIndex: "mobile"
  },
  {
    title: "累计注册量",
    dataIndex: "registrationQty"
  },
  {
    title: "累计成交量",
    dataIndex: "orderDealQty"
  },
  {
    title: "累计首单量",
    dataIndex: "firstOrderQty"
  },
  {
    title: "累计有效首单量",
    dataIndex: "validFirstOrderQty"
  }
];
/**
 * 市场推广一级列表
 */
const columnsOnlinePrimary = [
  {
    title: "一级渠道ID",
    dataIndex: "channelPopularizeCoding"
  },
  {
    title: "一级渠道名称",
    dataIndex: "name"
  },
  {
    title: "累计注册量",
    dataIndex: "registrationQty"
  },
  {
    title: "累计成交量",
    dataIndex: "orderDealQty"
  },
  {
    title: "累计首单量",
    dataIndex: "firstOrderQty"
  },
  {
    title: "累计有效首单量",
    dataIndex: "validFirstOrderQty"
  },
  {
    title: "操作",
    dataIndex: "remark",
    render: (text, record, index) => {
      return <Link to={`/account/bridge_statistics_infos?id=${record.channelPopularizeId}&source=2`}>查看二级渠道</Link>;
    }
  }
];
/**
 * 市场推广二级列表
 */
const columnsOnlineSecond = [
  {
    title: "二级渠道ID",
    dataIndex: "channelPopularizeCoding"
  },
  {
    title: "二级渠道名称",
    dataIndex: "name"
  },
  {
    title: "累计注册量",
    dataIndex: "registrationQty"
  },
  {
    title: "累计成交量",
    dataIndex: "orderDealQty"
  },
  {
    title: "累计首单量",
    dataIndex: "firstOrderQty"
  },
  {
    title: "累计有效首单量",
    dataIndex: "validFirstOrderQty"
  }
];
export {
  columnsOfflinePrimary,
  columnsOfflineSecond,
  columnsOnlinePrimary,
  columnsOnlineSecond
};
