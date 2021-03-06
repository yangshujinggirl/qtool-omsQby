import { Table,Input,Form, DatePicker } from 'antd';
import { QenlargeImg } from 'common';
import { Sessions } from 'utils';


class EditTable extends React.Component {
  renderSkuTips=(text,record,index)=> {
    return <Form.Item name={['subList',index,'skuTips']}>
               <Input autoComplete="off" placeholder="30字以内，C端展示" maxLength="30"/>
            </Form.Item>
  }
  renderSkuShelfLife=(text,record,index)=> {
    return <Form.Item name={['subList',index,'skuShelfLife']}>
               <DatePicker format="YYYY-MM-DD" placeholder="请输入商品保质期"/>
            </Form.Item>
  }
  renderImage =(text,record,index)=> {
    return <QenlargeImg url={record.image}/>
  }
  render() {

    return(
      <Table
        dataSource={this.props.dataSource}
        rowKey={(record) =>record.key}
        pagination={false}
        bordered={true}>
          <Table.Column title="sku编码" dataIndex="skuCode"/>
          <Table.Column title="规格" dataIndex ='salesAttributeName'/>
          <Table.Column title="商品条码" dataIndex ='barCode'/>
          <Table.Column title="C端售价" dataIndex ='customerPrice'/>
          <Table.Column title="sku图片" dataIndex ='image' render={this.renderImage}/>
          <Table.Column title="商品提示" dataIndex ='skuTips' render={this.renderSkuTips}/>
          <Table.Column title="商品保质期" dataIndex ='skuShelfLife' render={this.renderSkuShelfLife}/>
      </Table>
    )
  }
}

export default EditTable;
