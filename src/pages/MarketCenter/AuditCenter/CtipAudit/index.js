import { GetListApi } from 'api/marketCenter/CtipAudit';
import withSubscription from '../components/ListMod';

let CtipAudit=withSubscription(GetListApi,'1')
export default CtipAudit;
