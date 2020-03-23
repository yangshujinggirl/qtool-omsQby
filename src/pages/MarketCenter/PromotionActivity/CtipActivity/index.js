import { GetListApi,GetDeleteApi,GetApprovalsApi, GetEnableApi } from "api/marketCenter/CtipActivity";

import withSubscription from "../components/GoodsListCandB";

 let CtipActivity=withSubscription(GetListApi,"C")
export default CtipActivity;
