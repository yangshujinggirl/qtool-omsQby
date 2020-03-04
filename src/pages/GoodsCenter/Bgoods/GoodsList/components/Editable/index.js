import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  Component
} from "react";
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
  ...resetProps
}) => {
  // const [editing, setEditing] = useState(false);
  // const inputRef = useRef();
  const form = useContext(EditableContext);
  // useEffect(() => {
  //   if (editing) {
  //     inputRef.current.focus();
  //   }
  // }, [editing]);

  // const toggleEdit = () => {
  //   setEditing(!editing);
  //   form.setFieldsValue({
  //     [dataIndex]: record[dataIndex]
  //   });
  // };
  const save = async e => {
    try {
      const values = await form.validateFields();
      handleSave({ ...record, ...values });
      // toggleEdit();
    } catch (error) {
      console.log(error);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = (
      <Form.Item name={dataIndex}>
        <Input
          placeholder="30字以内，将展示在B端请谨慎填写"
          onBlur={save}
        />
      </Form.Item>
    );
  }
  return <td {...resetProps}>{childNode}</td>;
};
/*------------------主体---------------------*/
class EditTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: props.dataSource
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: nextProps.dataSource
    });
  }
  //保存td数据
  handleSave = record => {
    let newData = [...this.props.dataSource];
    const index = newData.findIndex(item => record.key == item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...record });
    this.props.changeDataSource(newData);
  };
  render() {
    const { Columns } = this.props;
    const { dataSource } = this.state;
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
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave
        })
      };
    });
    console.log(dataSource);
    return (
      <Table
        className="edit_table"
        bordered
        rowClassName={() => "editable-row"}
        components={components}
        dataSource={this.props.dataSource}
        columns={editableColumns}
        pagination={false}
      />
    );
  }
}
export default EditTable;
