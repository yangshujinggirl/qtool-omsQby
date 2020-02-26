import React, { Component } from 'react';
import Child from './Child'
import Child2 from './Child2'
import {Button} from 'antd'

class Parent extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <div>
        <Child2/>
        <Child/>
        
      </div>
    );
  }
}
export default Parent;