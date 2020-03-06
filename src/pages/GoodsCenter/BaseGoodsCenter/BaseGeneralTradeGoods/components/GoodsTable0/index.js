import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form } from 'antd';

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'name',
        dataIndex: 'name',
        width: '30%',
        editable: true,
      },
      {
        title: 'age',
        dataIndex: 'age',
      },
      {
        title: 'address',
        dataIndex: 'address',
      },
      {
        title: 'operation',
        dataIndex: 'operation',
      },
    ];
    this.state = {
      dataSource: [
        {
          key: '0',
          name: 'Edward King 0',
          age: '32',
          address: 'London, Park Lane no. 0',
          customerPrice:'12345'
        },
        {
          key: '1',
          name: 'Edward King 1',
          age: '32',
          address: 'London, Park Lane no. 1',
          customerPrice:"ghj"
        },
      ],
      count: 2,
    };
  }
  renderDeliveryPrice =(text, record, index)=> {
    return  <Form.Item name={['skuList',index,'customerPrice']}>
              <Input  disabled={record.isExamine} className="goods-name" key={index} value={record.customerPrice}/>
            </Form.Item>
  }
  render() {
    const { dataSource } = this.props;
    console.log(this.props.form)
    return (
        <Table
          dataSource={dataSource}
          pagination={false}
          bordered={true}>
            <Table.Column title="出库价格" key ='deliveryPrice' render={this.renderDeliveryPrice}/>
            <Table.Column title="sku编码" key ='name' dataIndex="name"/>
            <Table.Column title="商品条码" key ='age' dataIndex ='age'/>
            <Table.Column title="售价" key ='address' dataIndex ='address'/>
        </Table>
    );
  }
}

export default EditableTable;
