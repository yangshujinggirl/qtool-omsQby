import React,{Component} from 'react';
import { Link } from "react-router-dom";
import { Modal, message } from "antd";
import { Qtable, Qpagination,Qbtn } from "common"; //表单
import FilterForm from "./FilterForm/index";
import columns from './columns'
import moment from "moment";

/**
 * 
 * B端C端推送
 */
const commonPush=(propsData)=>{
    return class  extends Component {
        constructor(props) {
          super(props);
          this.state = {
            dataList: [],
            bsPushId: "",
            bPushName: "",
            isPushVisible: false,
            inputValues: {},
            selectedRows: [],
            selectedRowKeys: []
          };
        }
        componentWillMount() {
          this.searchData({});
        }
        onChange = (selectedRowKeys, selectedRows) => {
          console.log(selectedRowKeys)
          this.setState({
            selectedRowKeys
          });
          if (selectedRows[0]) {
            this.setState({
              title: selectedRows[0].title,
              bsPushId: selectedRows[0].bsPushId,
              selectedRows: selectedRows[0]
            });
          }
        };
        //点击搜索
        searchData = values => {
          const { rangePicker, ..._values } = values;
          if (rangePicker && rangePicker[0]) {
            _values.pushTimeST = moment(rangePicker[0]).format("YYYY-MM-DD HH:mm:ss");
            _values.pushTimeET = moment(rangePicker[1]).format("YYYY-MM-DD HH:mm:ss");
          } else {
            _values.pushTimeST = "";
            _values.pushTimeET = "";
          }
          const params = { ...this.state.inputValues, ..._values };
          propsData.getListApi(params).then(res => {
            if (res.httpCode == 200) {
              const { result, everyPage, currentPage, total } = res.result;
              this.setState({
                dataList: result,
                everyPage,
                currentPage,
                totalCount: total
              });
            }
          });
          this.setState({ inputValues: params });
        };
      
        //点击分页
        changePage = (current, limit) => {
          const currentPage = current - 1;
          const values = { ...this.state.inputValues, currentPage, limit };
          this.searchData(values);
        };
        //pageSize改变时的回调
        onShowSizeChange = ({ currentPage, limit }) => {
          const params = { currentPage, limit, ...this.state.inputValues };
          this.searchData(params);
        };
        //撤销推送
        cancelPush = () => {
          if (!this.state.bsPushId) {
            message.warning("请选择要撤销的推送", 0.8);
          } else {
            if (this.state.selectedRows.status == 10) {
              this.setState({ isPushVisible: true });
            } else {
              message.warning("只有待推送状态才可撤销");
              this.setState({ selectedRowKeys: [] });
            }
          }
        };
        //确定撤销
        onOk = () => {
          const {
            title,
            pushTime,
            msgContent,
            alertTypeStr,
            pushPerson,
            bsPushId,
            pushNow,
            alertType,
            alertTypeContent
          } = this.state.selectedRows;
          const values = {
            title,
            pushTime,
            pushNow,
            msgContent,
            alertTypeStr,
            alertType,
            pushPerson,
            bsPushId,
            status: 30,
            pushType:10,
            alertTypeContent
          };
          propsData.savePushApi(values).then(res => {
            if (res.httpCode == 200) {
              message.success('撤销成功',.8);
              const {inputValues,everyPage,currentPage} = this.state;
              this.searchData({...inputValues,everyPage,currentPage})
              this.setState({ isPushVisible: false,selectedRowKeys:[] });
            } else {
              this.setState({ isPushVisible: false ,selectedRowKeys:[]});
            }
          });
        };
        //取消撤销
        onCancel = () => {
          this.setState({ isPushVisible: false,selectedRowKeys:[] });
        };
        render() {
          const {
            dataList,
            everyPage,
            currentPage,
            totalCount,
            selectedRowKeys
          } = this.state;
          const rowSelection = {
            type: "radio",
            selectedRowKeys,
            onChange: this.onChange
          };
          const Columns = columns(propsData.AddUrl,propsData.InfoUrl)
          dataList.map(item=>item.key = item.bsPushId)
          return (
            <div className="oms-common-index-pages-wrap">
              <FilterForm onSubmit={this.searchData} />
              <div className="handle-operate-btn-action">
                <Link to={propsData.AddUrl}>
                  <Qbtn>
                    新增推送
                  </Qbtn>
                </Link>
                <Qbtn onClick={this.cancelPush}>
                  撤销推送
                </Qbtn>
              </div>
              <Modal
                bodyStyle={{ fontSize: "24px", padding: "50px" }}
                visible={this.state.isPushVisible}
                cancelText="不撤销了"
                okText="确定撤销"
                onCancel={this.onCancel}
                onOk={this.onOk}
              >
                <p>你正在撤消标题为{this.state.title}的推送，确认撤消？</p>
              </Modal>
              <Qtable
                dataSource={dataList}
                columns={Columns}
                onOperateClick={this.handleOperateClick}
                select
                rowSelection={rowSelection}
              />
              {dataList.length > 0 ? (
                <Qpagination
                  data={{ everyPage, currentPage, totalCount }}
                  onChange={this.changePage}
                  onShowSizeChange={this.onShowSizeChange}
                />
              ) : null}
            </div>
          );
        }
      }
}
export default commonPush