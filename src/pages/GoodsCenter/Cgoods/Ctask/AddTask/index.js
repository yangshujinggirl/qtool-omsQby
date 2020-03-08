import { getTaskInfoApi, AddTaskApi } from "api/home/GoodsCenter/Cgoods/Ctask";
import { Columns1, Columns2, Columns3 } from "./column";
import { Form } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";
import { Input, Button, message, Radio, AutoComplete, Select } from "antd";
import moment from "moment";
const RadioGroup = Radio.Group;
const Option = Select.Option;
import ImportBtn from "common/QupLoadFileList";
const FormItem = Form.Item;
import { DateTime, RangeTime } from "common/QdisabledDateTime";


class GoodEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labelList: [],
      goodList: [],
      taskId: "",
      taskType: "",
      infos: {}
    };
  }
  //初始化数据
  componentWillMount() {
    const temp = this.props.history.location.search.substr(1);
    const obj = {};
    temp.split("&").map(item => {
      obj[item.split("=")[0]] = item.split("=")[1];
    });
    const { taskId = "", taskType } = obj;
    if (taskId) {
      getTaskInfoApi({taskId}).then(res=>{
        if(res.httpCode == 200){
          this.setState({
            infos:res,
            goodList:res.skuList
          });
        }
      });
    }
    this.setState({
      taskId,
      taskType
    });
  }
  //保存
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { taskTime, ..._values } = values;
        const {goodList,taskType} = this.state;
        _values.skuList = goodList;
        _values.taskType = 1;
        _values.taskOperateUser = 1;
        if (taskType == 1) {
          _values.taskOperateStartTime = moment(taskTime).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        }
        //  else {
        //   values.taskOperateStartTime = moment(values.rangerTimer[0]).format(
        //     "YYYY-MM-DD HH:mm:ss"
        //   );
        //   values.taskOperateEndTime = moment(
        //     values.rangerTimer[1],
        //     "YYYY-MM-DD HH:mm:ss"
        //   );
        // }
        AddTaskApi({editDto:_values}).then(res => {
          if (res.code == "200") {
            message.success("保存成功", 0.8);
            this.goback()
          };
        });
      }
    });
  };
  //取消
  hindCancel = () => {
    this.deleteTab();
  };
  //标签搜索
  // onSearch = value => {
  //   labelSearchApi({ tabName: value }).then(res => {
  //     if (res.httpCode == 200) {
  //       this.setState({
  //         labelList: res.result.result
  //       });
  //     }
  //   });
  // };
  //修改上传数据
  changeDataList = dataList => {
    console.log(dataList);
    this.setState({
      goodList: dataList
    });
  };
  //下载模板
  downLoadTemp = () => {
    // const taskType = this.props.location.search.substr(1).split("=")[1];
    // if (taskType == 1 || taskType == 2) {
    //   window.open("src/static/goods_tips.xlsx");
    // } else {
    //   window.open("src/static/goods_label.xlsx");
    // }
    window.open("src/static/batchTask.xlsx");
  };
  goback = () => {
    this.props.history.push("/account/c_batch_task");
  };
  renderOption = item => {
    return <Option key={item.tabName}>{item.tabName}</Option>;
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { labelList = [], goodList = [], infos, taskType } = this.state;
    const Columns =
      taskType == 1 ? Columns1 : taskType == 2 ? Columns2 : Columns3;
    return (
      <Form className="addUser-form addcg-form">
        <FormItem
          label="定时名称"
          labelCol={{ span: 3, offset: 1 }}
          wrapperCol={{ span: 8 }}
        >
          {getFieldDecorator("taskName", {
            rules: [{ required: true, message: "请输入定时名称" }],
            initialValue: infos.taskName
          })(
            <Input
              placeholder="请输入定时名称，最多60个字符"
              maxLength={60}
              autoComplete="off"
            />
          )}
        </FormItem>
        {taskType == 1 && (
          <FormItem
            label="执行时间"
            labelCol={{ span: 3, offset: 1 }}
            wrapperCol={{ span: 8 }}
          >
            {getFieldDecorator("taskTime", {
              rules: [{ required: true, message: "请选择定时时间" }],
              initialValue: moment(infos.taskOperateStartTime)
            })(<DateTime />)}
          </FormItem>
        )}
        {(taskType == 2 || taskType == 3) && (
          <FormItem
            label="执行时间段"
            labelCol={{ span: 3, offset: 1 }}
            wrapperCol={{ span: 8 }}
          >
            {getFieldDecorator("rangerTimer", {
              rules: [{ required: true, message: "请选择时间" }],
              initialValue: [moment(), moment()]
            })(<RangeTime />)}
          </FormItem>
        )}
        {taskType == 1 && (
          <FormItem
            label="状态调整"
            labelCol={{ span: 3, offset: 1 }}
            wrapperCol={{ span: 8 }}
          >
            {getFieldDecorator("extraField", {
              rules: [{ required: true, message: "请选择状态" }]
            })(
              <RadioGroup onChange={this.onTipsChange}>
                <Radio value={1}>上架</Radio>
                <Radio value={0}>下架</Radio>
              </RadioGroup>
            )}
          </FormItem>
        )}
        {taskType == 3 && (
          <div>
            <FormItem
              label="请选择标签"
              labelCol={{ span: 3, offset: 1 }}
              wrapperCol={{ span: 8 }}
            >
              {getFieldDecorator("extraField", {
                rules: [{ required: true, message: "请选择标签" }]
              })(
                <AutoComplete
                  dataSource={labelList.map(this.renderOption)}
                  style={{ width: 200 }}
                  onSearch={this.onSearch}
                  onSelect={this.onSelect}
                  placeholder=" 请输入标签名称进行搜索"
                />
              )}
            </FormItem>
          </div>
        )}
        <FormItem
          label="请上传spu"
          labelCol={{ span: 3, offset: 1 }}
          wrapperCol={{ span: 20 }}
        >
          <ImportBtn
            action="/qtoolsApp/task/importSku/1"
            changeDataList={this.changeDataList}
            downLoadTemp={this.downLoadTemp}
            Columns={Columns}
            dataList={goodList}
          />
        </FormItem>
        <FormItem wrapperCol={{ push: 4, span: 20 }}>
          <Button className="edit_btn" size="large" onClick={this.goback}>
            取消
          </Button>
          <Button type="primary" size="large" onClick={this.handleSubmit}>
            保存
          </Button>
        </FormItem>
      </Form>
    );
  }
}
const GoodEditForms = Form.create()(GoodEditForm);
export default GoodEditForms;
