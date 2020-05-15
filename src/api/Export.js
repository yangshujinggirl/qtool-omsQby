import {
	appEmptyInterceptorsAjax,
	erpEmptyInterceptorsAjax,
	omsEmptyInterceptorsAjax,
	dataEmptyInterceptorsAjax,
} from './Req';
import { Qmessage } from 'common/index';
import ExcelUtils from 'utils/ExcelUtils';
import { message } from 'antd';

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
 * @param exportParamsClass 导出excel解析类
 * @constructor
 */
export function DataExportApi(data, url, exportParamsClass) {
	return dataEmptyInterceptorsAjax.post(url, { ...data, everyPage: 50000 }).then((rep) => {
		if (rep.httpCode == 200) {
			if (rep.data.result.result && rep.data.result.result.length) {
				ExcelUtils.exportExcelData(rep.data.result.result, exportParamsClass);
			} else {
				message.warning('该导出数据无内容', 1);
			}
		} else {
			message.error('导出失败',.8);
		}
	});
}

/**
 * 数据中心相关导出数据调用,只针对于表头是1行同时生成的Excel表格和当前页面表格显示表头一直的情况下使用,同时表头非动态生成
 * @param data 请求数据体
 * @param url 请求url，可为空，为空时使用通用接口
 * @param column table所使用的Columns列表配置
 * @param title excel表格标题
 * @constructor
 */
export function DataExportApiColumn(data, url, column, title) {
	return dataEmptyInterceptorsAjax.post(url, { ...data, everyPage: 50000 }).then((rep) => {
		if (rep.httpCode == 200) {
			if (rep.data.result.result && rep.data.result.result.length) {
				ExcelUtils.exportExcelDataColumn(rep.data.result.result, column, title);
			} else {
				message.warning('该导出数据无内容', 1);
			}
		} else {
			message.error('导出失败',.8);
		}
	});
}

/**
 * 导出api调用
 * @param data 请求参数
 * @param url 请求地址
 * @param request 请求调用体
 * @constructor
 */
function ExportApi(data, url, request) {
	request
		.post(
			url != null ? url : '/export/commonExport',
			{
				...data,
			},
			{
				responseType: 'blob',
			}
		)
		.then((response) => {
			if (response === undefined || response == null) {
				Qmessage.error('导出失败');
			} else {
				let r = new FileReader();
				r.onload = function () {
					const filename = response.headers['content-disposition'];
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
				r.readAsText(response.data);
			}
		})
		.catch((error) => {
			Qmessage.error('导出失败');
		});
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
		thinkStockingExport: thinkStockingExportData,
	};
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
