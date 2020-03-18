function getColumns(edit, delt) {
  const columns1 = [
    //单品直降
    {
      title: "序号",
      dataIndex: "index",
      render: (text, record, index) => {
        return <span>{++index}</span>;
      },
      key: "1"
    },
    {
      title: "操作",
      dataIndex: "operate",
      render: (text, record, index) => {
        return (
          <div>
            <a onClick={() => delt(index)} className="theme-color delt">
              删除
            </a>
            <br />
            <a onClick={() => edit(index, record)} className="theme-color">
              编辑
            </a>
          </div>
        );
      },
      key: "2"
    },
    { title: "商品编码", dataIndex: "pdCode", key: "3" },
    { title: "商品名称", dataIndex: "pdName", key: "4" },
    { title: "商品规格", dataIndex: "pdName", key: "5" },
    {
      title: "商品种类",
      dataIndex: "pdKind",
      key: "6",
      render: (text, record, index) => {
        return text == 1
          ? "一般贸易商品"
          : text == 2
          ? "品牌直供商品"
          : "保税商品";
      }
    },
    {
      title: "C端售价",
      dataIndex: "sellPrice",
      key: "7",
      render: (text, record, index) => {
        return (text?<span>￥{Number(text).toFixed(2)}元</span>:'');
      }
    },
    {
      title: "活动价",
      dataIndex: "activityPrice",
      key: "8",
      render: (text, record, index) => {
        return (
          text?
          <span style={{ color: +record.profitRate < 0 ? "red" : "#35bab0" }}>
            ￥{Number(text).toFixed(2)}元
          </span>
          :''
        );
      }
    },
    {
      title: "预计毛利率",
      dataIndex: "profitRate",
      key: "9",
      render: (text, record, index) => {
        return (
          <span style={{ color: +text < 0 ? "red" : "#000000a6" }}>
            {
              text?text+'%':'-'
            }
          </span>
        );
      }
    },
    {
      title: "活动最大可售卖数量",
      dataIndex: "maxQty",
      key: "12",
      className: "green"
    },
    {
      title: "活动期间每人每单限购",
      dataIndex: "perOrderLimit",
      key: "13",
      className: "green"
    },
    {
      title: "活动期间每人每天限购",
      dataIndex: "perDayLimit",
      key: "14",
      className: "green"
    },
    {
      title: "活动期间每人每账号限购",
      dataIndex: "perUserLimit",
      key: "15",
      className: "green"
    }
  ];
  const columns2 = [
    //单品满件赠
    {
      title: "序号",
      dataIndex: "index",
      key: "1",
      render: (text, record, index) => {
        return <span>{++index}</span>;
      }
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "2",
      render: (text, record, index) => {
        return (
          <div>
            <a onClick={() => delt(index)} className="theme-color delt">
              删除
            </a>
            <br />
            <a onClick={() => edit(index, record)} className="theme-color">
              编辑
            </a>
          </div>
        );
      }
    },
    { title: "商品编码", dataIndex: "pdCode", key: "3" },
    { title: "商品名称", dataIndex: "pdName", key: "4" },
    { title: "商品规格", dataIndex: "pdSpec", key: "5" },
    {
      title: "商品种类",
      dataIndex: "pdKind",
      key: "6",
      render: (text, record, index) => {
        return text == 1
          ? "一般贸易商品"
          : text == 2
          ? "品牌直供商品"
          : "保税商品";
      }
    },
    {
      title: "优惠内容",
      dataIndex: "promotionRules",
      key: "7",
      className: "green",
      render: (text, record, index) => {
        return (
          <div>
            {record.promotionRules &&
              record.promotionRules.length > 0 &&
              record.promotionRules.map((item, index) => (
                <p key={index} style={{ "marginBottom": "5px" }}>
                  满{item.param.leastQty}件，送{item.param.giftQty}件
                </p>
              ))}
          </div>
        );
      }
    },
    {
      title: "商品C端售价",
      dataIndex: "sellPrice",
      key: "8",
      render: (text, record, index) => {
        return (text?<span>￥{Number(text).toFixed(2)}元</span>:'');
      }
    },
    {
      title: "预计到手价",
      dataIndex: "handsPrice",
      key: "9",
      render: (text, record, index) => {
        return (
          <div>
            {record.handsPrice &&
              record.handsPrice.length > 0 &&
              record.handsPrice.map((item, subIndex) => (
                <p
                  key={subIndex}
                  style={{ "marginBottom": "5px", color: item.color }}
                >
                  {++subIndex}级：{item.price?'￥'+item.price+'元':'-'}
                </p>
              ))}
          </div>
        );
      }
    },
    {
      title: "预计毛利率",
      dataIndex: "profitRate",
      key: "10",
      render: (text, record, index) => {
        return (
          <div>
            {record.profitRate &&
              record.profitRate.length > 0 &&
              record.profitRate.map((item, subIndex) => (
                <p
                  key={subIndex}
                  style={{ "marginBottom": "5px", color: item.color }}
                >
                  {++subIndex}级：{item.rate?item.rate+'%':'-'}
                </p>
              ))}
          </div>
        );
      }
    },
    {
      title: "活动最大可售卖数量",
      width: "5%",
      dataIndex: "maxQty",
      key: "11",
      className: "green"
    },
    {
      title: "活动期间每人每单限购",
      width: "5%",
      dataIndex: "perOrderLimit",
      key: "12",
      className: "green"
    },
    {
      title: "活动期间每人每天限购",
      width: "5%",
      dataIndex: "perDayLimit",
      key: "13",
      className: "green"
    },
    {
      title: "活动期间每人每账号限购",
      width: "5%",
      dataIndex: "perUserLimit",
      key: "14",
      className: "green"
    }
  ];
  const columns3 = [
    //专区多级满元赠+专区多级满件赠+专区多级满件减
    {
      title: "序号",
      dataIndex: "index",
      key: "1",
      render: (text, record, index) => {
        return <span>{++index}</span>;
      }
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "2",
      render: (text, record, index) => {
        return (
          <div>
            <a onClick={() => delt(index)} className="theme-color delt">
              删除
            </a>
            <br />
            <a onClick={() => edit(index, record)} className="theme-color">
              编辑
            </a>
          </div>
        );
      }
    },
    { title: "商品编码", dataIndex: "pdCode", key: "3" },
    { title: "商品名称", dataIndex: "pdName", key: "4" },
    { title: "商品规格", dataIndex: "pdSpec", key: "5" },
    {
      title: "商品种类",
      dataIndex: "pdKind",
      key: "6",
      render: (text, record, index) => {
        return text == 1
          ? "一般贸易商品"
          : text == 2
          ? "品牌直供商品"
          : "保税商品";
      }
    },
    {
      title: "C端售价",
      dataIndex: "sellPrice",
      key: "7",
      render: (text, record, index) => {
        return (text?<span>￥{Number(text).toFixed(2)}元</span>:'');
      }
    },
    {
      title: "活动最大可售卖数量",
      dataIndex: "maxQty",
      key: "8",
      className: "green"
    }
  ];
  const columns4 = [
    //专区多级满元减
    {
      title: "序号",
      dataIndex: "index",
      key: "1",
      render: (text, record, index) => {
        return <span>{++index}</span>;
      }
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "2",
      render: (text, record, index) => {
        return (
          <div>
            <a onClick={() => delt(index)} className="theme-color delt">
              删除
            </a>
            <br />
            <a onClick={() => edit(index, record)} className="theme-color">
              编辑
            </a>
          </div>
        );
      }
    },
    { title: "商品编码", dataIndex: "pdCode", key: "3" },
    { title: "商品名称", dataIndex: "pdName", key: "4" },
    { title: "商品规格", dataIndex: "pdSpec", key: "5" },
    {
      title: "商品种类",
      dataIndex: "pdKind",
      key: "6",
      render: (text, record, index) => {
        return text == 1
          ? "一般贸易商品"
          : text == 2
          ? "品牌直供商品"
          : "保税商品";
      }
    },
    {
      title: "C端售价",
      dataIndex: "sellPrice",
      key: "7",
      render: (text, record, index) => {
        return (text?<span>￥{Number(text).toFixed(2)}元</span>:'');
      }
    },
    {
      title: "预计最低到手价",
      dataIndex: "handsPrice",
      key: "8",
      render: (text, record, index) => {
        return (
          <div>
            {record.handsPrice &&
              record.handsPrice.length > 0 &&
              record.handsPrice.map((item, subIndex) => (
                <p
                  key={subIndex}
                  style={{ "marginBottom": "5px", color: item.color }}
                >
                  {++subIndex}级：{item.price?'￥'+item.price+'元':'-'}
                </p>
              ))}
          </div>
        );
      }
    },
    {
      title: "预计最低毛利率",
      dataIndex: "profitRate",
      key: "9",
      render: (text, record, index) => {
        return (
          <div>
            {record.profitRate &&
              record.profitRate.length > 0 &&
              record.profitRate.map((item, subIndex) => (
                <p
                  key={subIndex}
                  style={{ "marginBottom": "5px", color: item.color }}
                >
                  {++subIndex}级：{item.rate?item.rate+'%':'-'}
                </p>
              ))}
          </div>
        );
      }
    },
    {
      title: "活动最大可售卖数量",
      dataIndex: "maxQty",
      key: "10",
      className: "green"
    }
  ];
  return { columns1, columns2, columns3, columns4 };
}
export default getColumns;
