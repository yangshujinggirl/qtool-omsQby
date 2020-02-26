import React, { Component } from "react";
import eventBus from "utils/tools";
import { Button } from "antd";
class Child extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "11"
    };
  }
  click = () => {
    eventBus.emit('setXing')
  };
  render() {
    return <Button onClick={this.click}>click</Button>;
  }
}
export default Child;
