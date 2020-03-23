import { GetListApi,GetDeleteApi,GetApprovalsApi, GetEnableApi } from "api/marketCenter/CtipActivity";

import withSubscription from "../components/GoodsListCandB";

let apiObj={
  GetListApi, GetDeleteApi, GetApprovalsApi, GetEnableApi
}
 let CtipActivity=withSubscription(apiObj,"C")
export default CtipActivity;
