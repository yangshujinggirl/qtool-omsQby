const columnsAdd=[
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
            <span className="pointerSty" onClick={() => record.onOperateClick('delete')}>
              删除
            </span>
            <br />
            <span className="pointerSty" onClick={() => record.onOperateClick('edit')}>
              编辑
            </span>
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
      title: "POS售价",
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
    }];
export default columnsAdd;
