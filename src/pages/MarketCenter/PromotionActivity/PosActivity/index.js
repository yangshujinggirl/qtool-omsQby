import { GetListApi, GetDeleteApi, GetApprovalsApi, GetEnableApi } from "api/marketCenter/PosActivity";
import withSubscription from "../components/GoodsListCandPos";

let apiObj={
  GetListApi, GetDeleteApi, GetApprovalsApi, GetEnableApi
}
 let PosActivity=withSubscription(apiObj,"POS")
export default PosActivity;
