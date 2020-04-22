import {appEmptyInterceptorsAjax, erpEmptyInterceptorsAjax, omsEmptyInterceptorsAjax,dataEmptyInterceptorsAjax} from "./Req";
import {Qmessage} from "common/index";

/**
 * OMS相关导出数据调用
 * @param data 请求数据体
 * @param url 请求url，可为空，为空时使用通用接口
 * @constructor
 */
export function OmsExportApi(data, url) {
    new ExportApi(data, url, omsEmptyInterceptorsAjax);
}

/**
 * ERP相关导出数据调用
 * @param data 请求数据体
 * @param url 请求url，可为空，为空时使用通用接口
 * @constructor
 */
export function ErpExportApi(data, url) {
    new ExportApi(data, url, erpEmptyInterceptorsAjax);
}

/**
 * App相关导出数据调用
 * @param data 请求数据体
 * @param url 请求url，可为空，为空时使用通用接口
 * @constructor
 */
export function AppExportApi(data, url) {
    new ExportApi(data, url, appEmptyInterceptorsAjax);
}
/**
 * 数据中心相关导出数据调用
 * @param data 请求数据体
 * @param url 请求url，可为空，为空时使用通用接口
 * @constructor
 */
export function DataExportApi(data, url) {
    new ExportApi(data, url, dataEmptyInterceptorsAjax);
}

/**
 * 导出api调用
 * @param data 请求参数
 * @param url 请求地址
 * @param request 请求调用体
 * @constructor
 */
function ExportApi(data, url, request) {
    request.post(url != null ? url : "/export/commonExport", {
        ...data
    }, {
        responseType: "blob"
    }).then(response => {
        if (response === undefined || response == null) {
            Qmessage.error("导出失败")
        } else {
            let r = new FileReader();
            r.onload = function () {
                const filename = response.headers["content-disposition"];
                const index = filename.search(/filename=/);
                const filenames = filename.substring(index + 9, filename.length);
                const link = document.createElement('a');
                link.style.display = 'none';
                link.href = URL.createObjectURL(response.data);
                link.setAttribute('download', decodeURIComponent(filenames));
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            };
            r.readAsText(response.data)
        }
    }).catch(error => {
        Qmessage.error("导出失败")
    })
}

/**
 * 获取导出数据
 * @param startTime 申请开始时间
 * @param endTime 申请结束时间
 * @param exportType 导出数据类型
 * @param thinkStockingExportData 各不同导出类型数据实体
 * @param url 请求地址
 */
export function getExportData(startTime, endTime, exportType, thinkStockingExportData, url) {
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
/**
 * 采退订单数据导出类型
 * @type {number}
 */
export const EXPORT_TYPE_PURCHASE_ORDER_OUT = 7;
