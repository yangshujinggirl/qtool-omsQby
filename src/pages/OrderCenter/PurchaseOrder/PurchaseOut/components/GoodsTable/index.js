import React, { useContext, Component, useEffect } from "react";
import { Table, Input, Form, Button } from "antd";
let keyIndex = 1;

const EditableContext = React.createContext();
/*---------------tr单元行----------------- */
const EditableRow = value => {
  const { form, params } = value;
  console.log(value);
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider
        value={{ form, dataRowKey: params["data-row-key"] }}
      >
        <tr {...params} />
      </EditableContext.Provider>
    </Form>
  );
};
/*------------------td单元格---------------*/
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  placeholder,
  rules,
  ...resetProps
}) => {
  const { form, dataRowKey } = useContext(EditableContext);
  useEffect(() => {
    if (editable) {
      form.setFieldsValue({
        [dataIndex + dataRowKey]: record[dataIndex]
      });
    }
  });
  const save = async e => {
    try {
      const values = await form.getFieldsValue();
      handleSave({ ...record, ...values});
    } catch (error) {
      console.log(error);
    }
  };
  let childNode = children;
  if (editable) {
    console.log(dataIndex[dataRowKey]);
    childNode = (
      <Form.Item name={dataIndex + dataRowKey} rules={rules}>
        <Input placeholder={placeholder} onBlur={save} autoComplete="off" />
      </Form.Item>
    );
  }
  if (isDel) {
    childNode = <a onClick={handleDel}>删除</a>;
  }
  return <td {...resetProps}>{childNode}</td>;
};
/*------------------主体---------------------*/
class EditTable extends Component {
  //保存td数据
  handleSave = record => {
    let newData = [...this.props.dataSource];
    const index = newData.findIndex(item => record.key == item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...record });
    this.props.changeDataSource(newData);
  };
  //添加数据
  add = () => {
    const newData = [...this.props.dataSource];
    keyIndex += 1;
    newData.push({ key: keyIndex });
    this.props.changeDataSource(newData);
  };
  render() {
    const { Columns, dataSource, getCellDetail, form } = this.props;
    const components = {
      body: {
        row: params => EditableRow({ params, form }),
        cell: EditableCell
      }
    };
    const editableColumns = Columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          placeholder: col.placeholder,
          rules: col.rules,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave
        })
      };
    });
    console.log(dataSource);
    return (
      <div>
        <Table
          className="edit_table"
          bordered
          components={components}
          dataSource={dataSource}
          columns={editableColumns}
          pagination={false}
        />
      </div>
    );
  }
}
export default EditTable;
