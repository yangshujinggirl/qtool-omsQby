const Columns = [
    {title: "二级渠道ID", dataIndex: "channelPopularizeCoding", key: "1"},
    {title: "二级渠道名称", dataIndex: "name", key: "2"},
    {title: "手机号", dataIndex: "mobile", key: "3"},
    {
        title: "操作", dataIndex: "activityPrice", key: "4",
        render: (text, record, index) => (
            <a onClick={() => record.onOperateClick(record)} className="theme-color">
                下载渠道码
            </a>
        )
    }
];
export default Columns;
