import react, { useEffect, useState } from "react";
import { getHotSaleList, getColdSaleList } from "api/home/DataCenter/BaseData/GoodsData";
import { Qtable } from "common";
const Columns = [
  { title: "排名", dataIndex: "rank" },
  { title: "商品编码", dataIndex: "goodsCode" },
  { title: "商品条码", dataIndex: "barcode" },
  { title: "商品名称", dataIndex: "goodsName" },
  { title: "商品规格", dataIndex: "goodsRule" },
  { title: "销售数量", dataIndex: "saleQty" },
  { title: "销售金额", dataIndex: "saleAmount" },
];
const Columns2 = [
  { title: "排名", dataIndex: "rank" },
  { title: "商品编码", dataIndex: "goodsCode" },
  { title: "商品条码", dataIndex: "barcode" },
  { title: "商品名称", dataIndex: "goodsName" },
  { title: "商品规格", dataIndex: "goodsRule" },
  { title: "10天销售数量", dataIndex: "saleQty" },
  { title: "可售库存", dataIndex: "invQty" },
];
const GoodListTable = (props) => {
  const { id } = props.match.params;
  const [goodList,setGoodList] = useState([])
  useEffect(() => {
    if (id == 1) {
      //热销
      getHotSaleList().then((res) => {
        if (res.httpCode == 200) {
          setGoodList(res.result);
        }
      });
    }
    if (id == 2) {
      //滞销
      getColdSaleList().then((res) => {
        if (res.httpCode == 200) {
          setGoodList(res.result);
        }
      });
    }
  }, []);
  return <Qtable columns={id==1?Columns:Columns2} dataSource={goodList} />;
};
export default GoodListTable
