import React, { useEffect, useState } from "react";
import { getInfosApi } from "api/home/OperateCenter/Boperate/Bpush";//请求方法

const CouponDetail = props => {
  const [infos, setInfos] = useState({});
  useEffect(() => {
    const { id } = props.match.params;
    getInfosApi(id).then(res => {
      if (res.httpCode == 200) {
        setInfos(res.result);
      }
    });
  },[]);
  return (
    <div className="couponDetail">
      <p className="tail">推送主题：　　{infos.title}</p>
      <p className="tail">推送时间：　　{infos.pushTime}</p>
      <p className="tail">推送内容：　　{infos.msgContent}</p>
      <p className="tail">推送类型：　　{infos.alertTypeStr}</p>
      <p className="tail">推送详情：　　{infos.pushContent}</p>
      <p className="tail">推送人群：　　{infos.pushMan}</p>
    </div>
  );
};
export default CouponDetail;
