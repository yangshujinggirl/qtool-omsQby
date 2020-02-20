import { getTaskInfoApi } from "api/home/GoodsCenter/Cgoods/Ctask";
import { Columns1, Columns2, Columns3 } from "./AddTask/column";
import { Form, Button } from "antd";
import Qtable from "common/Qtable/index"; //表单
import moment from "moment";
const FormItem = Form.Item;

class TaskInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      infos: {},
      goodList: []
    };
  }
  //初始化数据
  componentWillMount() {
    // const {id} = this.props.match.params
    // getTaskInfoApi({taskId:id}).then(res=>{
    //     this.setState({
    //         infos:res,
    //         goodList:res.skuList
    //     });
    // });
    const res = {
      taskName: "名字",
      taskOperateStartTime: "2018-10-09",
      taskOperateEndTime: "2018-10-10",
      taskType: 2,
      extraField: 0,
      skuList: [{ id: 1, name: 1, extraInfo: "11" }]
    };
    this.setState({
      infos: res,
      goodList: res.skuList
    });
  }
  goback = () => {
    this.props.history.push("/account/cTask");
  };
  render() {
    const { goodList = [], infos } = this.state;
    console.log(goodList);
    const { taskType } = infos;
    const Columns =
      taskType == 1 ? Columns1 : taskType == 2 ? Columns2 : Columns3;
    return (
      <Form className="addUser-form addcg-form">
        <FormItem
          label="定时名称"
          labelCol={{ span: 3, offset: 1 }}
          wrapperCol={{ span: 8 }}
        >
          {infos.taskName}
        </FormItem>
        {taskType == 1 && (
          <FormItem
            label="执行时间"
            labelCol={{ span: 3, offset: 1 }}
            wrapperCol={{ span: 8 }}
          >
            <span>{infos.taskOperateStartTime}</span>
          </FormItem>
        )}
        {(taskType == 2 || taskType == 3) && (
          <FormItem
            label="执行时间段"
            labelCol={{ span: 3, offset: 1 }}
            wrapperCol={{ span: 8 }}
          >
            <span>
              {infos.taskOperateStartTime} — {infos.taskOperateEndTime}
            </span>
          </FormItem>
        )}
        {taskType == 1 && (
          <FormItem
            label="状态调整"
            labelCol={{ span: 3, offset: 1 }}
            wrapperCol={{ span: 8 }}
          >
            {infos.extraField == 0 ? "上架" : "下架"}
          </FormItem>
        )}
        {taskType == 3 && (
          <div>
            <FormItem
              label="标签"
              labelCol={{ span: 3, offset: 1 }}
              wrapperCol={{ span: 8 }}
            >
              {infos.extraField}
            </FormItem>
          </div>
        )}
        <FormItem
          label="商品列表"
          labelCol={{ span: 3, offset: 1 }}
          wrapperCol={{ span: 20 }}
        >
          <Qtable dataSource={goodList} columns={Columns} />
        </FormItem>
        <div className="btn_center">
          <Button type='primary' size='large' onClick={this.goback}>返回</Button>
        </div>
      </Form>
    );
  }
}
export default TaskInfo;
