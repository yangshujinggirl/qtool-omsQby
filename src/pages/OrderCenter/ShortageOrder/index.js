import { Tabs } from 'antd';
import KouTuOrder from './KouTuOrder';
import HuaiAnOrder from './HuaiAnOrder';
import { useState, useEffect } from 'react';

const { TabPane } = Tabs;

function BaseGoods({...props}) {
  const [defaultActiveKey, setKey] = useState('1');
  const callback=(key)=> {
    setKey(key)
  }
  return <Tabs defaultActiveKey={defaultActiveKey} onChange={callback}>
          <TabPane tab="淮安仓" key="1">
            {defaultActiveKey=='1'&&<HuaiAnOrder {...props}/>}
          </TabPane>
          <TabPane tab="蔻兔仓" key="2">
            {defaultActiveKey=='2'&&<KouTuOrder {...props}/>}
          </TabPane>
        </Tabs>
}

export default BaseGoods;
