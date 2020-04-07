import { GetListApi, GetSaveApi } from 'api/contentCenter/MorePicSetCtip';
import withSubscription from '../components/BannerAndIconSet';
import TabsMod from './components/TabsMod';

let paramsObj={ GetListApi, GetSaveApi  }
let BannerSet = withSubscription(paramsObj,"3", TabsMod);

export default BannerSet;
