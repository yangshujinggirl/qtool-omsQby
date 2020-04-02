import { GetListApi } from 'api/marketCenter/PosAudit';
import withSubscription from '../components/ListMod';

let PosAudit=withSubscription(GetListApi,'2');
export default PosAudit;
