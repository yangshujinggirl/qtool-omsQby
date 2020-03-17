import React from "react";
import {TableItemShowTime} from "common/QdisabledDateTime";
import {QenlargeImg} from "common/index";

const Columns = [
    {
        title: '反馈状态', dataIndex: 'fromStatusStr', key: '1',
        render: (text, record) => <a
            href="javascript:">{record.fromStatusStr}-{record.toStatusStr}</a>
    },
    {title: '处理备注', dataIndex: 'remark', key: '2'},
    {
        title: '图片备注', dataIndex: 'operator', key: '4',
        render: (text, record) => {
            let imgList;
            if (record.remarkPic) {
                const fileDomain = eval(sessionStorage.getItem("oms_fileDomain"));
                return (
                    <div>
                        {
                            record.remarkPic.map((el, index) => (
                                <QenlargeImg url={fileDomain + el.imgPath} key={index}
                                             placement="inline"/>
                            ))
                        }
                    </div>
                )
            } else {
                return null
            }
        }
    },
    {title: '处理人', dataIndex: 'handleUser', key: '3'},
    {
        title: '处理时间', dataIndex: 'createTime', key: '5',
        render: (text) => (<TableItemShowTime showTime={text}/>)
    }];
export default Columns;
