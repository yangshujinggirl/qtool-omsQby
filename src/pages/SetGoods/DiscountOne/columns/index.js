const Columns = [
  {
    title: "赠品编码",
    dataIndex: "pdCode",
    key: "1"
  },
  {
    title: "赠品名称",
    dataIndex: "pdName",
    key: "2"
  },
  {
    title: "赠品B端售价",
    dataIndex: "sellPrice",
    key: "3",
    render:(text,record,index)=>{
      return(
        <span>￥{Number(text).toFixed(2)}元</span>
      )
    }
  },
  {
    title: "最多可参与活动的赠品数",
    dataIndex: "maxQty",
    key: "4"
  },
  {
    title: "赠品B端在售库存",
    dataIndex: "toBQty",
    key: "5"
  },
  {
    title: "赠品C端在售库存",
    dataIndex: "toCQty",
    key: "6"
  },
  {
    title: "赠品操作",
    key: "7",
    render: (text, record, index) => {
      return (
        <div>
          <a
            onClick={() => this.delete(currentParentIndex, index)}
            className="theme-color">
            删除
          </a>
          　
          <a onClick={() => this.edit(record.pdCode,record.maxQty,"edit",currentParentIndex,index)}
            className="theme-color">
            编辑
          </a>
        </div>
      );
    }
  }
];

export default Columns;
