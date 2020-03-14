import React, { useContext, Component, useEffect } from "react";
import { Table, Input, Form } from "antd";
import "./index.less";

const EditableContext = React.createContext();
/*---------------tr单元行----------------- */
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
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
  ...resetProps
}) => {
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editable) {
      form.setFieldsValue({
        [dataIndex]: record[dataIndex]
      });
    }
  });
  const save = async e => {
    try {
      const values = await form.validateFields();
      handleSave({ ...record, ...values });
    } catch (error) {
      console.log(error);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = (
      <Form.Item
        name={dataIndex}
      >
        <Input
          placeholder={placeholder}
          onBlur={save}
          autoComplete="off"
        />
      </Form.Item>
    );
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
  render() {
    const { Columns, dataSource } = this.props;
    const components = {
      body: {
        row: EditableRow,
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
          placeholder:col.placeholder,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave
        })
      };
    });
    return (
      <Table
        className="edit_table"
        bordered
        components={components}
        dataSource={dataSource}
        columns={editableColumns}
        pagination={false}
      />
    );
  }
}
export default EditTable;
