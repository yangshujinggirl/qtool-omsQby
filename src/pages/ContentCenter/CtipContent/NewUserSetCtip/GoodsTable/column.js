const Columns = [
  {
    title: "序号",
    dataIndex: "key",
  },
  {
    title: "Spu编码",
    dataIndex: "pdSpuId",
  },
  {
    title: "商品图片",
    dataIndex: "mainPicUrl",
    render: (text, record, index) => {
      const fileDomain = sessionStorage.getItem('oms_fileDomain')
      return (
        text && (
          <img
            src={fileDomain + text}
            style={{ width: "100px", height: "100px" }}
          />
        )
      );
    },
  },
  {
    title: "商品名称",
    dataIndex: "name",
  },
  {
    title: "商品卖点",
    dataIndex: "sellingPoints",
  },
  {
    title: "商品种类",
    dataIndex: "type",
    render: (text, record) => (
      <span>{text == 1 ? "一般贸易" : text == 2 ? "保税" : "品牌直供"}</span>
    ),
  },
  {
    title: "C端售价",
    dataIndex: "price",
  },
  {
    title: "商品状态",
    dataIndex: "cstatus",
    render: (text, record) => <span>{text == 1 ? "上架" : "下架"}</span>,
  },
  {
    title: "操作",
    render: (text, record, index) => (
      <a className='theme-color' onClick={record.onOperateClick}>删除</a>
    ),
  },
];
export default Columns
