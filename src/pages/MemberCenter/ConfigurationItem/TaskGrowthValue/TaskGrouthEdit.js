import {
  Input,Spin,Form,Table,Upload,Card, DatePicker
} from 'antd';
import moment from 'moment'
import { useState, useEffect } from 'react';
import {Sessions} from 'utils';
import { QupLoadImgLimt, Qtable, Qbtn, Qmessage } from 'common';
import { GetInfoApi, GetSaveApi } from "api/home/MemberCenter/ConfigurationItem/TaskGrowthValue";
import { SubAddColumns } from './column';

let FormItem = Form.Item;

const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };


const TaskGrowthEdit=({...props})=> {
  const [form] = Form.useForm();
  const growthTaskId = props.match.params.id;
  let [totalData, setTotalData] = useState({});
  let [subList, setSubList] = useState([]);
  let [taskPic, setTaskPic] = useState([]);
  let fileDomain=Sessions.get("fileDomain");

  const initPage=()=> {
    GetInfoApi(growthTaskId)
    .then((res)=> {
      const {growthTaskDetail, taskLogList} = res.result;
      let { taskPic, subTitleField1, subTitleField2, subTitleField3,...vals } =growthTaskDetail;
      taskPic=taskPic?taskPic:[];
      taskPic = [{
        uid: "-1",
        name: 'image.png',
        status: 'done',
        path:taskPic,
        url:`${fileDomain}${taskPic}`
      }]
      let lists=[{subTitleField1,subTitleField2, subTitleField3,key:0}];
      setTotalData(vals);
      setTaskPic(taskPic);
      setSubList(lists);
    })
  }
  const onSubmit = async() => {
    try {
      let  values = await form.validateFields();
      let {  list, taskPic, ..._val } = values;
      list.map((el,index)=> {
        _val.subTitleField1 = el.subTitleField1;
        _val.subTitleField2 = el.subTitleField2;
        _val.subTitleField3 = el.subTitleField3;
      })
      if(taskPic&&taskPic[0].response) {
        let taskPic = taskPic[0].response.result;
        _val.taskPic = taskPic;
      } else {
        _val.taskPic = taskPic[0].path;
      }
      _val = { ..._val, growthTaskId }
      GetSaveApi(_val)
      .then((res)=> {
        Qmessage.success('保存成功')
        goReturn();
      })
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }

  const upDateList=(array)=>{ setTaskPic(array) }
  useEffect(()=>{ initPage()},[growthTaskId]);
  useEffect(()=>{ form.setFieldsValue(totalData) },[totalData])
  useEffect(()=>{ form.setFieldsValue({list:subList })},[subList])
  useEffect(()=>{ form.setFieldsValue({taskPic})},[taskPic])

  return (
    <Spin tip="加载中..." spinning={false}>
      <div className="oms-common-addEdit-pages">
        <Form  className="common-addEdit-form" form={form} {...formItemLayout}>
            <Form.Item label="成长值类型">
              {totalData.growthType}
            </Form.Item>
            <Form.Item label="任务项">
              {totalData.name}
            </Form.Item>
            <QupLoadImgLimt
              label="成长值任务图标"
              rules={[{ required: true, message: '请上传图片' } ]}
              name="taskPic"
              fileList={taskPic}
              limit="1"
              upDateList={upDateList}/>
            <Form.Item label="成长值任务标题" name="title" rules={[{ required: true, message: '成长值任务标题'}]}>
              <Input placeholder="成长值任务标题" autoComplete="off"/>
            </Form.Item>
            <Form.Item label="成长值任务副标题">
              <Form.Item>
                <Qtable dataSource={subList} columns={SubAddColumns}/>
              </Form.Item>
              <div>
                <p>1、成长值任务副标题为字段1、字段2、字段3按顺序组合而成。</p>
                <p>2、副标题字段1和3为灰色字，副标题字段2在前端会用亮色重点标出，建议在此字段内写明成长值的奖励数值。</p>
              </div>
            </Form.Item>
            <Form.Item label="成长值任务描述" name="ruleDesc">
              <Input.TextArea placeholder='请输入备注，50字以内' maxLength='50' rows={4} autoComplete="off"/>
            </Form.Item>
          <div className="handle-operate-save-action">
            <Qbtn onClick={()=>onSubmit()}> 保存 </Qbtn>
          </div>
        </Form>
      </div>
    </Spin>
  );
}

export default TaskGrowthEdit;
