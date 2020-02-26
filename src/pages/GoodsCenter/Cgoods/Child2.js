import eventBus from "utils/tools";
import React, { useState, useEffect } from "react";

const Child2 = () => {
  const [ xing, setXing ] = useState("周");
  useEffect(() => {
    eventBus.on("setXing", () => {
      setXing("李");
    });
  }, []);
  return (<span>{xing}</span>)
};
export default Child2;
