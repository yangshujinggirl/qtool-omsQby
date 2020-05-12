import { Link } from "react-router-dom";
import React from "react";
import {TableItemShowTime} from "common/QdisabledDateTime";
const Columns = [
  {
    title: "主题名称",
    dataIndex: "themeName"
  },
  {
    title: "主题活动ID",
    dataIndex: "themeActivityId"
  },
  {
    title: "主题状态",
    dataIndex: "themeStatus",
      render:(text)=>(<span>{text === 4 ? "上线" : (text === 5 ? "下线" : "")}</span>)
  },
  {
    title: "预览链接",
    dataIndex: "previewLink",
    render: (text, record) => {
      const currentUrl = window.location.host;
			const url = 'http://' + currentUrl + '/static/config/config.html?configureCode=' + record.pageCode;
			console.log(url)
      return (
        <div>
          <a target="_blank" className="theme-color" href={url}>
            {text}
          </a>
        </div>
      );
    }
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
      render: (text) => (<TableItemShowTime showTime={text}/>)
  },
  {
    title: "最后修改人",
    dataIndex: "operator"
  },
  {
    title: "操作",
    dataIndex: "",
    render: (text, record, index) => {
      return (
        <div>
          <Link
            to={`/account/add_theme/${record.themeActivityId}`}
            className="theme-color"
          >
            修改
          </Link>
          {record.themeStatus == "4" ? (
            <a
              className="theme-color"
              onClick={()=>record.onOperateClick("offline")}
            >
              　下线
            </a>
          ) : (
            <a
              className="theme-color"
              onClick={()=>record.onOperateClick("online")}
            >
              　上线
            </a>
          )}
        </div>
      );
    }
  }
];

export default Columns;
