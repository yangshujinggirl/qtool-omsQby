import { getTimeInfoApi, AddTimeApi } from "api/home/GoodsCenter/Bgoods/Btimer";
import Columns from "./column";
import {
  Form,
  Input,
  Button,
  message,
  Radio,
  AutoComplete,
  Select
} from "antd";
import moment from "moment";
const RadioGroup = Radio.Group;
const Option = Select.Option;
import ImportBtn from "common/QupLoadFileList";
const FormItem = Form.Item;
import { DateTime, RangeTime } from "common/QdisabledDateTime";

class AddTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labelList: [],
      goodList: [],
      pdTaskTimeId: "",
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
    const { pdTaskTimeId = "", taskType } = obj;
    if (pdTaskTimeId) {
      getTimeInfoApi({ pdTaskTimeId }).then(res => {
        if (res.httpCode == 200) {
          this.setState({
            infos: res,
            goodList: res.skuList
          });
        }
      });
      // const res = {
      //   taskName: "名字",
      //   taskOperateStartTime: "2018-10-09",
      //   taskOperateEndTime: "2018-10-10",
      //   taskType: 2,
      //   extraField: 0,
      //   skuList: [{ id: 1, name: 1, extraInfo: "11" }]
      // };
      this.setState({
        infos: res,
        goodList: res.skuList
      });
    }
    this.setState({
      pdTaskTimeId,
      taskType
    });
  }
  //保存
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.taskTime = moment(values.taskTime,"YYYY-MM-DD HH:mm:ss");
        AddTimeApi(values).then(res => {
          if (res.code == "200") {
            message.success("保存成功", 0.8);
          }
        });
      }
    });
  };
  //取消
  hindCancel = () => {
    this.deleteTab();
  };
  //标签搜索
  onSearch = value => {
    // labelSearchApi({tabName:value}).then(res => {
    //   if (res.httpCode == 200) {
    //     this.setState({
    //       labelList: res.result.result
    //     });
    //   }
    // });
    this.setState({
      labelList: [
        {
          tabId: 1,
          tabName: "姓名1"
        },
        {
          tabId: 2,
          tabName: "姓名2"
        }
      ]
    });
  };
  //修改上传数据
  changeDataList = dataList => {
    //  this.setState({
    //    goodList:dataList
    //  })
    this.setState({
      goodList: [
        {
          id: 1,
          name: "商品名称",
          extraInfo: "xinxi"
        }
      ]
    });
  };
  //下载模板
  downLoadTemp = () => {
    const taskType = this.props.location.search.substr(1).split("=")[1];
    if (taskType == 1 || taskType == 2) {
      window.open("src/static/goods_tips.xlsx");
    } else {
      window.open("src/static/goods_label.xlsx");
    }
  };
  goback = () => {
    this.props.history.push("/account/cTask");
  };
  renderOption = item => {
    return <Option key={item.tabName}>{item.tabName}</Option>;
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { labelList = [], goodList = [], infos, taskType } = this.state;
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

        <FormItem
          label="状态调整"
          labelCol={{ span: 3, offset: 1 }}
          wrapperCol={{ span: 8 }}
        >
          {getFieldDecorator("salestatus", {
            rules: [{ required: true, message: "请选择状态" }]
          })(
            <RadioGroup onChange={this.onTipsChange}>
              <Radio value={1}>上架</Radio>
              <Radio value={0}>下架</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem
          label="请上传spu"
          labelCol={{ span: 3, offset: 1 }}
          wrapperCol={{ span: 20 }}
        >
          <ImportBtn
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
const AddTimers = Form.create()(AddTimer);
export default AddTimers;
