import CommonPush from '../../components/CommonPush'
import { getListApi,savePushApi } from "api/home/OperateCenter/Boperate/Bpush";
const PropsData = {
  getListApi,
  savePushApi,
  AddUrl:'/account/add_bpush/',
  InfoUrl:'/account/bpush_infos/',
}
const  Bpush = CommonPush(PropsData);
export default Bpush