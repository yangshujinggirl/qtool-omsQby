import { GetListApi } from "api/marketCenter/PosActivity";

import withSubscription from "../components/GoodsListCandB";

 let PosActivity=withSubscription(GetListApi,"POS")
export default PosActivity;
