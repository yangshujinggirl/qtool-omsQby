import { Table,Input } from 'antd';


class EditTable extends React.Component {
  renderSkuTips=(text,record,index)=> {
    const { getFieldDecorator } =this.props.form;
    return <span>
               {getFieldDecorator(`subList[${index}].skuTips`,{
                 initialValue:record.skuTips,
               })(
                 <Input autoComplete="off" placeholder="30字以内，C端展示"/>
               )}
            </span>
  }
  renderSkuShelfLife=(text,record,index)=> {
    const { getFieldDecorator } =this.props.form;
    return <span>
               {getFieldDecorator(`subList[${index}].skuShelfLife`,{
                 initialValue:record.skuShelfLife,
               })(
                 <Input autoComplete="off" placeholder="请输入商品保质期"/>
               )}
            </span>
  }
  render() {
    return(
      <Table
        dataSource={this.props.dataSource}
        rowKey={(record) =>record.key}
        pagination={false}
        bordered={true}>
          <Table.Column title="sku编码" dataIndex="skuCode" render={this.renderCode}/>
          <Table.Column title="规格" dataIndex ='salesAttributeName' render={this.renderBarcode}/>
          <Table.Column title="商品条码" key ='barCode' render={this.renderSalePrice}/>
          <Table.Column title="C端售价" key ='customerPrice' render={this.renderPurchasePricee} />
          <Table.Column title="sku图片" key ='image' render={this.renderReceivePrice}/>
          <Table.Column title="商品提示" key ='skuTips' render={this.renderSkuTips}/>
          <Table.Column title="商品保质期" key ='skuShelfLife' render={this.renderSkuShelfLife}/>
      </Table>
    )
  }
}

export default EditTable;
