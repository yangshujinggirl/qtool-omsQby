import '@ant-design/compatible/assets/index.css';
import { Form, Input, Select, DatePicker, Row, Col } from "antd";
import { Qtable } from "common";
import { ColumnsEdit } from './column';
import { GetDetailApi } from 'api/cTip/DescriptManage';

const FormItem = Form.Item;


const formItemLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 14
  }
};
class DescriptAddF extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalData:{},
      desclist:[]
    }
  }
  componentDidMount() {
    this.getInfo();
  }
  getInfo() {
    let { params } =this.props.match;
    GetDetailApi(params.id)
    .then((res) =>{
      let { categoryList, ...totalData} =res.result;
      categoryList&&categoryList.map((el,index) =>el.key = index);
      this.setState({ desclist: categoryList , totalData})
    })
  }
  render() {
    const { desclist, totalData } =this.state;
    return(
      <div>
        <Form {...formItemLayout}>
          <FormItem label="属性名称" >
            {totalData.attributeName}
          </FormItem>
          <FormItem label="*关联后台类目" >
            <Qtable
              columns={ColumnsEdit}
              dataSource={desclist}/>
          </FormItem>
        </Form>

      </div>
    )
  }
}
export default DescriptAddF;
