import CommonPush from '../../components/CommonPush'
import { getListApi,savePushApi } from "api/home/OperateCenter/Coperate/Cpush";
const PropsData = {
  getListApi,
  savePushApi,
  AddUrl:'/account/add_cpush/',
  InfoUrl:'/account/cpush_infos/',
}
const  Cpush = CommonPush(PropsData);
export default Cpush