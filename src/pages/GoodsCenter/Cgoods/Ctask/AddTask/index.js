import { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  message,
  Radio,
  AutoComplete,
  Select,
  Modal
} from "antd";
import { getTaskInfoApi, AddTaskApi } from "api/home/GoodsCenter/Cgoods/Ctask";
import ImportBtn from "common/QupLoadFileList";
import { DateTime, RangeTime } from "common/QdisabledDateTime";
import { Columns1, Columns2, Columns3 } from "./column";
import { Sessions } from "utils";
import moment from "moment";
const RadioGroup = Radio.Group;
const Option = Select.Option;
const FormItem = Form.Item;
const formLayout = {
  labelCol: { span: 4, offset: 1 },
  wrapperCol: { span: 8 }
};

const GoodEditForm = function(props) {
  const [form] = Form.useForm();
  // const [labelList,setLabelList] = useState([])
  const [goodList, setGoodList] = useState([]);
  const [taskId, setTaskId] = useState(null);
  const [taskType, setTaskType] = useState("");
  /**
   * 数据初始化
   */
  useEffect(() => {
    const temp = props.history.location.search.substr(1);
    const obj = {};
    temp.split("&").map(item => {
      obj[item.split("=")[0]] = item.split("=")[1];
    });
    const { taskId = null, taskType } = obj;
    setTaskType(taskType);
    if (taskId) {
      getTaskInfoApi({ taskId }).then(res => {
        if (res.httpCode == 200) {
          const { skuList, ...infos } = res.result;
          infos.taskTime = moment(infos.taskOperateStartTime);
          console.log(infos);
          const goodList = setKey(skuList);
          setGoodList(goodList);
          setTaskId(taskId);
          form.setFieldsValue(infos);
        }
      });
    }
  }, []);
  //保存
  const handleSubmit = async e => {
    const values = await form.validateFields();
    const { taskTime, ..._values } = values;
    _values.skuList = goodList;
    _values.taskType = taskType;
    _values.taskOperateUser = Sessions.get("name");
    _values.taskId = taskId;
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
    AddTaskApi(_values).then(res => {
      if (res.httpCode == "200") {
        message.success("保存成功", 0.8);
        goback();
      }
    });
  };
  //标签搜索
  // onSearch = value => {
  //   labelSearchApi({ tabName: value }).then(res => {
  //     if (res.httpCode == 200) {
  //       setState({
  //         labelList: res.result.result
  //       });
  //     }
  //   });
  // };
  //修改上传数据
  const changeDataSource = list => {
    setGoodList(list);
  };
  //下载模板
  const downLoadTemp = () => {
    // const taskType = props.location.search.substr(1).split("=")[1];
    // if (taskType == 1 || taskType == 2) {
    //   window.open("src/static/goods_tips.xlsx");
    // } else {
    //   window.open("src/static/goods_label.xlsx");
    // }
    window.open("src/static/batchTask.xlsx");
  };
  const goback = () => {
    props.history.push("/account/c_batch_task");
  };
  const renderOption = item => {
    return <Option key={item.tabName}>{item.tabName}</Option>;
  };
  const Columns =
    taskType == 1 ? Columns1 : taskType == 2 ? Columns2 : Columns3;
  const setKey = list => {
    let dataSource = [];
    if (list.length > 0) {
      dataSource = list.map((item, index) => {
        item.key = index;
        return item;
      });
    }
    return dataSource;
  };

  return (
    <Form
      initialValues={{ taskTime: moment() }}
      className="addUser-form addcg-form"
      form={form}
      {...formLayout}
    >
      <FormItem
        label="定时名称"
        name="taskName"
        rules={[{ required: true, message: "请输入定时名称" }]}
      >
        <Input
          placeholder="请输入定时名称，最多60个字符"
          maxLength={60}
          autoComplete="off"
        />
      </FormItem>
      {taskType == 1 && (
        <FormItem
          label="执行时间"
          name="taskTime"
          rules={[{ required: true, message: "请选择定时时间" }]}
        >
          <DateTime />
        </FormItem>
      )}
      {(taskType == 2 || taskType == 3) && (
        <FormItem
          label="执行时间段"
          rules={[{ required: true, message: "请选择时间" }]}
        >
          <RangeTime />
        </FormItem>
      )}
      {taskType == 1 && (
        <FormItem
          label="状态调整"
          name="extraField"
          rules={[{ required: true, message: "请选择状态" }]}
        >
          <RadioGroup>
            <Radio value="1">上架</Radio>
            <Radio value="0">下架</Radio>
          </RadioGroup>
        </FormItem>
      )}
      {taskType == 3 && (
        <div>
          <FormItem
            label="请选择标签"
            name="extraField"
            rules={[{ required: true, message: "请选择标签" }]}
          >
            <AutoComplete
              dataSource={labelList.map(renderOption)}
              style={{ width: 200 }}
              onSearch={onSearch}
              onSelect={onSelect}
              placeholder=" 请输入标签名称进行搜索"
            />
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
          changeDataSource={changeDataSource}
          downLoadTemp={downLoadTemp}
          Columns={Columns}
          dataSource={goodList}
        />
      </FormItem>
      <FormItem wrapperCol={{ push: 4, span: 20 }}>
        <Button className="edit_btn" size="large" onClick={goback}>
          取消
        </Button>
        <Button type="primary" size="large" onClick={handleSubmit}>
          保存
        </Button>
      </FormItem>
    </Form>
  );
};
export default GoodEditForm;
