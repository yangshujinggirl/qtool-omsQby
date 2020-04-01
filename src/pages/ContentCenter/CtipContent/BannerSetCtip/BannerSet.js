import { GetListApi, GetChangeApi, GetSaveBannerApi } from 'api/contentCenter/BannerSetCtip';
import withSubscription from '../components/BannerAndIconSet';

const panes = [
  { title: '第一帧', key: '1' },
  { title: '第二帧', key: '2' },
  { title: '第三帧', key: '3'},
  { title: '第四帧', key: '4'},
  { title: '第五帧', key: '5'},
];
let paramsObj={ GetListApi, GetChangeApi, GetSaveBannerApi, panes  }
let BannerSet = withSubscription(paramsObj,"1");

export default BannerSet;
