import { Collapse, Row, Col, } from 'antd';
import moment from 'moment';
import { GetRecordListApi,GetInfoApi } from '../../../api/home/BaseConfigCenter/InvestmentManage';
import { Qbtn,Qtable,QenlargeImg } from 'common';
import { statusOption } from './optionMap';
import { columnsInfo } from './column';

const { Panel } = Collapse;
const formItemLayout = {
     labelCol: 4,
     wrapperCol:20,
   };

class InvestmentManageInfo extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      dataSource:[],
      info:{}
    }
  }
  componentDidMount(){
    let cid =this.props.match.params.id;
    this.getInfo(cid)
    this.getRecordList(cid)
  }
  getInfo=(cid)=>{
    GetInfoApi({cid})
    .then((res)=> {
      let { result } =res;
      this.setState({ info: result })
    })
  }
  getRecordList=(cid)=>{
    GetRecordListApi({cid})
    .then((res)=> {
      let { result } =res;
      result=result?result:[];
      result.map((el)=>el.key=el.id)
      this.setState({ dataSource: result })
    })
  }
  render() {
    let { dataSource, info } =this.state;
    const { labelCol, wrapperCol } =formItemLayout;
    return(
      <div>
      <Collapse accordion defaultActiveKey={['1']}>
        <Panel header="客户基础信息" key="1">
          <div>
            <Row className="item-row">
              <Col span={labelCol}>客户姓名：</Col>
              <Col span={wrapperCol}>{info.name}</Col>
            </Row>
            <Row className="item-row">
              <Col span={labelCol}>联系方式：</Col>
              <Col span={wrapperCol}>{info.phone}</Col>
            </Row>
            <Row className="item-row">
              <Col span={labelCol}>地区：</Col>
              <Col span={wrapperCol}>{info.province}{info.city}{info.area}</Col>
            </Row>
            <Row className="item-row">
              <Col span={labelCol}>状态：</Col>
              <Col span={wrapperCol}>
                {
                  statusOption.map((el,index)=> (
                    <span key={index}>{el.key==info.status&&el.value}</span>
                  ))
                }
              </Col>
            </Row>
            <Row className="item-row">
              <Col span={labelCol}>意向合同：</Col>
              <Col span={wrapperCol}>
              {
                info.formalContractList&&info.formalContractList.map((el,index)=>(
                  <QenlargeImg url={el} key={index} placement="inline"/>
                ))
              }</Col>
            </Row>
            <Row className="item-row">
              <Col span={labelCol}>正式合同：</Col>
              <Col span={wrapperCol}>
              {
                info.intentionContractList&&info.intentionContractList.map((el,index)=> (
                  <QenlargeImg url={el} key={index} placement="inline"/>
                ))
              }
              </Col>
            </Row>
          </div>
        </Panel>
        <Panel header="客户跟踪记录" key="2">
          <Qtable
            columns={columnsInfo}
            dataSource={dataSource}/>
        </Panel>
      </Collapse>

      </div>
    )
  }
}

export default InvestmentManageInfo;
