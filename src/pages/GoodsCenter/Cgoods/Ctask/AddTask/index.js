import { getTaskInfoApi } from "api/home/GoodsCenter/Cgoods/Ctask";
import { Columns1, Columns2, Columns3 } from "./column";
import { Form, Input, Button, message, Radio, AutoComplete } from "antd";
import moment from "moment";
const RadioGroup = Radio.Group;
import ImportBtn from "common/QupLoadFileList";
const FormItem = Form.Item;
import { DateTime, RangeTime } from "common/QdisabledDateTime";

class GoodEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labelList: [],
      goodList: []
    };
  }
  //初始化数据
  componentWillMount() {
  }

  //保存
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(moment(values.rangerTimer[0]).format("YYYY-MM-DD HH:mm:ss"));
      console.log(moment(values.rangerTimer[1]).format("YYYY-MM-DD HH:mm:ss"));
      if (!err) {
      }
    });
  };
  //取消
  hindCancel = () => {
    this.deleteTab();
  };

  handUse = () => {
    const pdTaskTimeId = String(this.props.data.pdTaskTimeId);
    invalidTimerApi({ pdTaskTimeId }).then(
      res => {
        if (res.code == "0") {
          this.deleteTab();
          message.success("强制无效成功", 0.8);
        }
      },
      err => {}
    );
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
          tabName: 1
        },
        {
          tabId: 2,
          tabName: 2
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
  goback=()=>{
    this.props.history.push('/account/cTask')
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const taskType = this.props.location.search.substr(1).split("=")[1];
    const { labelList = [], goodList = [] } = this.state;
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
            initialValue: this.state.taskName
          })(
            <Input placeholder="请输入定时名称，最多60个字符" maxLength="60" autoComplete='off' />
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
              initialValue: moment()
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
                rules: [{ required: true, message: "请选择状态" }]
              })(
                <AutoComplete
                  dataSource={labelList}
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
            changeDataList={this.changeDataList}
            downLoadTemp={this.downLoadTemp}
            Columns={Columns}
            dataList={goodList}
          />
        </FormItem>
        <Button className="mr30" onClick={this.goback}>
          取消
        </Button>
        <Button
          type="primary"
          onClick={this.handleSubmit}
          style={{ marginLeft: "30px" }}
        >
          保存
        </Button>
      </Form>
    );
  }
}
const GoodEditForms = Form.create()(GoodEditForm);
export default GoodEditForms;
