import Upload from "common/QuploadFileList";
import GoodList from "./components/GoodList";
import React from "react";
const Editable = (props) => {
  const { dataSource, changeDataSource, getPrice } = props;
  const downLoadTemp = () => {
    window.open("src/static/purchase_in.xlsx");
  };
  return (
    <div>
      <Upload
        changeDataSource={changeDataSource}
        downLoadTemp={downLoadTemp}
        action="/qtoolsOms/upload/file_excel_return_list"
      />
      <GoodList
        dataSource={dataSource}
        changeDataSource={changeDataSource}
        getPrice={getPrice}
      />
    </div>
  );
};
export default Editable
