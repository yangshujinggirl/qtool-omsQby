import React, { useContext, Component, useEffect } from "react";
import { Table, Input, Form, Button } from "antd";
import Upload from "./Upload";
let keyIndex = 1;

const EditableContext = React.createContext();
/*---------------tr单元行----------------- */
const EditableRow = value => {
  const { form, params } = value;
  console.log(value);
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={{form,dataRowKey:params['data-row-key']}}>
        <tr {...params} />
      </EditableContext.Provider>
    </Form>
  );
};
/*------------------td单元格---------------*/
const EditableCell = ({
  title,
  editable,
  isDel,
  canSearch,
  children,
  dataIndex,
  record,
  handleSave,
  getCellDetail,
  placeholder,
  rules,
  ...resetProps
}) => {
  const {form,dataRowKey} = useContext(EditableContext);
  useEffect(() => {
    if (editable) {
      form.setFieldsValue({
        [dataIndex+dataRowKey]: record[dataIndex]
      });
    }
  });
  const save = async e => {
    try {
      const values = await form.getFieldsValue();
      if (canSearch) {
        //是否是可搜索的input
        const obj = await getCellDetail(values); //获取一行的数据
        form.setFieldsValue(obj);
        handleSave({ ...record, ...values, ...obj, operateType: "update" });
      } else {
        handleSave({ ...record, ...values, operateType: "update" });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDel = () => {
    handleSave({ ...record, operateType: "del" });
  };
  let childNode = children;
  if (editable) {
    console.log(dataIndex[dataRowKey])
    childNode = (
      <Form.Item name={dataIndex+dataRowKey} rules={rules}>
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
    if (record.operateType == "update") {
      newData.splice(index, 1, { ...item, ...record });
    }
    if (record.operateType == "del") {
      newData.splice(index, 1);
    }
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
    const {
      Columns,
      dataSource,
      downLoadTemp,
      changeDataSource,
      getCellDetail,
      form
    } = this.props;
    const components = {
      body: {
        row: params => EditableRow({ params, form }),
        cell: EditableCell
      }
    };
    const editableColumns = Columns.map(col => {
      if (!col.editable) {
        if (col.isDel) {
          //删除
          return {
            ...col,
            onCell: record => ({
              record,
              isDel: col.isDel,
              handleSave: this.handleSave
            })
          };
        }
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          canSearch: col.canSearch,
          placeholder: col.placeholder,
          rules: col.rules,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
          getCellDetail: col.canSearch ? getCellDetail : ""
        })
      };
    });
    console.log(dataSource);
    return (
      <div>
        <Upload
          downLoadTemp={downLoadTemp}
          changeDataList={changeDataSource}
        ></Upload>
        <Table
          className="edit_table"
          bordered
          components={components}
          dataSource={dataSource}
          columns={editableColumns}
          pagination={false}
          footer={() => <Button onClick={this.add}>+商品</Button>}
        />
      </div>
    );
  }
}
export default EditTable;
