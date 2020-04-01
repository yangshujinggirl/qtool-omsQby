import { GetListApi, GetChangeApi, GetSaveBannerApi } from 'api/contentCenter/IconSetCtip';
import withSubscription from '../components/BannerAndIconSet';

const panes = [
  { title: '第一坑', key: '1' },
  { title: '第二坑', key: '2' },
  { title: '第三坑', key: '3'},
  { title: '第四坑', key: '4'},
];
let paramsObj={ GetListApi, GetChangeApi, GetSaveBannerApi, panes  }
let BannerSet = withSubscription(paramsObj,"2");

export default BannerSet;
