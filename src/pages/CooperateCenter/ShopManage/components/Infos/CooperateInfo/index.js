import { Form } from "antd";

const Cooperate = props => {
  return (
    <React.Fragment>
      <Form.Item label="门店状态">
        {props.infos.channelStatus == 1
          ? "开业中"
          : props.infos.channelStatus == 2
          ? "待开业"
          : "关业中"}
      </Form.Item>
      <Form.Item label="门店类型">
        {props.infos.channelStatus == 1
          ? "直营店"
          : props.infos.channelStatus == 2
          ? "联营店"
          : "加盟店"}
      </Form.Item>
      <Form.Item label="分成比例">
        <p>食品尿不湿类：{props.infos.divideIntoA}%</p>
        <p>非食品尿不湿类：{props.infos.divideIntoB}%</p>
      </Form.Item>
      <Form.Item label="微信支付扫码">
        {props.infos.weiPayStatus == 0 ? "关闭" : "开启"}
      </Form.Item>
      <Form.Item label="支付宝扫码">
        {props.infos.alipayStatus == 0 ? "关闭" : "开启"}
      </Form.Item>
      <Form.Item label="C端App">
        {props.infos.customerAppStatus == 0 ? "关闭" : "开启"}
      </Form.Item>
      <Form.Item label="C端同城配送">
        {props.infos.customerDelivery == 0 ? "关闭" : "开启"}
      </Form.Item>
      <Form.Item label="合同信息">
        {props.infos.contractPic && (
          <img style={{'width':'100px','height':'100px'}}
            src={
              sessionStorage.getItem("oms_fileDomain") + props.infos.contractPic
            }
          />
        )}
      </Form.Item>
    </React.Fragment>
  );
};
export default Cooperate;
