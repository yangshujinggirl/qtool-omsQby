import { Tabs } from 'antd';
import BaseGeneralTradeGoods from './BaseGeneralTradeGoods';
import BaseCrossBorder from './BaseCrossBorder';
import { useState, useEffect } from 'react';

const { TabPane } = Tabs;

function BaseGoods({...props}) {
  const [defaultActiveKey, setKey] = useState('1');
  const callback=(key)=> {
    setKey(key)
  }
  return <Tabs defaultActiveKey={defaultActiveKey} onChange={callback}>
          <TabPane tab="一般贸易商品" key="1">
            {defaultActiveKey=='1'&&<BaseGeneralTradeGoods {...props}/>}
          </TabPane>
          <TabPane tab="跨境商品" key="2">
            {defaultActiveKey=='2'&&<BaseCrossBorder {...props}/>}
          </TabPane>
        </Tabs>
}

export default BaseGoods;
