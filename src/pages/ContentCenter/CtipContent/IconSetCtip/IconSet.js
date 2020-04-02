import { GetListApi, GetChangeApi, GetSaveApi } from 'api/contentCenter/IconSetCtip';
import withSubscription from '../components/BannerAndIconSet';
import TabsMod from './components/TabsMod';

let paramsObj={ GetListApi, GetChangeApi, GetSaveApi  }
let BannerSet = withSubscription(paramsObj,"2", TabsMod);

export default BannerSet;
