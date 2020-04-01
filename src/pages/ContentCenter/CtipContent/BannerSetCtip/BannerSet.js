import { GetListApi, GetChangeApi, GetSaveApi } from 'api/contentCenter/BannerSetCtip';
import withSubscription from '../components/BannerAndIconSet';
import TabsMod from './components/TabsMod';

let paramsObj={ GetListApi, GetChangeApi, GetSaveApi  }
let BannerSet = withSubscription(paramsObj,"1", TabsMod);

export default BannerSet;
