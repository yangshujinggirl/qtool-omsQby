import qs from "qs";
// 发送 post 请求
// const url = "/qtoolsOms/export/commonExport";
export function ExportApi({data,url}) {//data:{},url:''
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: qs.stringify(data)
  }).then(res => {
    res.blob().then(blob => {
      var filename = res.headers.get("Content-Disposition");
      const index = filename.search(/filename=/);
      const filenames = filename.substring(index + 9, filename.length);
      var url = window.URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = filenames;
      a.click();
      a.remove();
    });
  })
}

/**
 * 获取导出数据
 * @param startTime 申请开始时间
 * @param endTime 申请结束时间
 * @param exportType 导出数据类型
 * @param thinkStockingExportData 各不同导出类型数据实体
 */
export  function getExportData(startTime, endTime, exportType, thinkStockingExportData) {
    return {
        stime: startTime,
        etime: endTime,
        exportType: exportType,
        thinkStockingExport: thinkStockingExportData
    }
}

/**
 * 采购订单数据导出类型
 * @type {number}
 */
export const EXPORT_TYPE_PURCHASE_ORDER_IN = 5;
