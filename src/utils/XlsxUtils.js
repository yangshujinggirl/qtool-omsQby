import XLSX from "xlsx";
import XLSX1 from 'xlsx-style'
import {CommonUtils} from "utils/index";


const TestClass = [
    {
        key: "shopName",
        headerRow: 0,
        name: "门店名称",
        column: true
    },
    {
        key: "categoryAmountQtyDXOS",
        children: [
            {
                key: "categoryName",
                headerRow: 0,
                column: false
            },
            {
                key: "saleQty",
                name: "数量",
                headerRow: 1,
                column: true
            },
            {
                key: "saleAmount",
                name: "金额",
                headerRow: 1,
                column: true
            }
        ]
    },
]
/**
 * 标题样式
 */
const titleStyle = {
    font: {
        name: 'Arial',
        sz: 18,
        bold: true
    },
    alignment: {
        horizontal: "center",
        vertical: "center"
    }
}
/**
 * 表头样式
 */
const headerStyle = {
    font: {
        name: 'Arial',
        sz: 14,
        bold: true
    },
    alignment: {
        horizontal: "center",
        vertical: "center"
    }
}

/**
 * 获取数据的行数
 * @param lastRows 上一次记录的行数
 * @param paramsClass 要格式化的解析类
 * @return {*} 最大行数,因为为了方便计算，所以行数是从0开始的，如果要数量则为递归结束后加1行，如果为行等级这种则为递归结束值
 */
function getHeaderMaxRow(lastRows, paramsClass) {
    paramsClass.forEach((item) => {
        if (item.children == null) {
            if (item.headerRow > lastRows) {
                lastRows += 1
            }
        } else {
            lastRows = getHeaderMaxRow(lastRows, item.children)
        }
    })
    return lastRows;
}

/**
 * 获取所有表头
 * @param lastHeaders 当前表头
 * @param data 当前条数据
 * @param paramsClass 解析实体类
 * @param maxRow 表头最大行数
 * @return {*} 处理之后的表头
 */
function getHeader(lastHeaders, data, paramsClass, maxRow, leftColumns) {
    //标题行数
    const titleRow = 1;
    let startRow;
    let startColumn;
    let endRow;
    let endColumn;
    paramsClass.forEach((itemClass, index) => {
        if (itemClass.children == null) {
            //获取当前行数
            let rows = itemClass.headerRow;
            //读取指定行数标题数组,数组位置和行数下标是相同的
            let rowHeaders = lastHeaders.data[rows];
            if (!rowHeaders) {
                rowHeaders = []
            }
            //初始化起始和结束位置
            startRow = endRow = titleRow + itemClass.headerRow;
            startColumn = endColumn = rowHeaders.length;
            //获取标题要显示的数量
            let headerCount = 0;
            paramsClass.forEach((countItem) => {
                if (countItem.children == null && rows !== countItem.headerRow) {
                    headerCount++;
                }
            })
            //获取header名称
            let headerName = itemClass.name;
            if (!headerName) {
                headerName = data[itemClass.key];
            }
            //插入数据，先插入第一个，在循环插入后面的null值
            rowHeaders.push(headerName)
            for (let i = 0; i < headerCount - 1; i++) {
                rowHeaders.push(null)
                endColumn += 1;
            }
            lastHeaders.data[rows] = rowHeaders;
            if (itemClass.column) {
                //进行行数判断，因为没有子元素，所以如果没有达到最大行数则后续行数相应坐标元素都应该为null
                let endRows = maxRow - rows
                if (rows < endRows) {
                    //开始向下插入null值
                    for (let i = rows + 1; i <= endRows; i++) {
                        rowHeaders = lastHeaders.data[i];
                        if (!rowHeaders) {
                            rowHeaders = [];
                        }
                        rowHeaders.push(null)
                        lastHeaders.data[i] = rowHeaders;
                    }
                    endRow += endRows - rows;
                }
            }
            //添加合并单元格坐标
            if (startRow !== endRow || startColumn !== endColumn) {
                let mergePositions = lastHeaders.mergePosition;
                if (!mergePositions) {
                    mergePositions = [];
                }
                mergePositions.push({
                    s: {c: startColumn, r: startRow},
                    e: {c: endColumn, r: endRow}
                })
                lastHeaders.mergePosition = mergePositions
            }
        } else {
            const childParamsClass = itemClass.children;
            let child;
            data[itemClass.key].forEach((childData) => {
                child = getHeader(lastHeaders, childData, childParamsClass, maxRow, index)
                lastHeaders.data = child.data;
                lastHeaders.mergePosition = child.mergePosition;
            })
        }
    })
    return lastHeaders;
}

/**
 * 获取表格数据
 * @param showData 要处理的数据
 * @param paramsClass 格式化解析类型
 * @return {[]} 返回处理后的数据
 */
function getTableData(showData, paramsClass) {
    const optionsData = [];
    //最大子列表数组长度
    let maxChildLength = 0;
    let childData;
    showData && showData.forEach((item) => {
        paramsClass.forEach((itemClass) => {
            if (itemClass.children != null) {
                childData = getTableData(item[itemClass.key], itemClass.children)
                maxChildLength = Math.max(childData.length, maxChildLength)
                if (!childData || childData.length === 0) {
                    for (let i = 0; i < maxChildLength; i++) {
                        optionsData.push(null)
                    }
                } else {
                    optionsData.push(...childData)
                }
            } else if (itemClass.column) {
                optionsData.push(item[itemClass.key])
            }
        })
    })
    return optionsData
}

/**
 * 生成xlsx数据
 * @param pre 前面要拼接的数组
 * @param next 后面要拼接的数据数组
 * @param data 数据实体
 * @param paramsClass 要格式化处理的配置类
 * @returns {[]}
 */
function generateXlsxData(pre, next, data, paramsClass) {
    const result = {
        //数据
        data: [],
        //要合并数据位置
        dataMergePosition: [],
    };
    //带有子属性的左侧属性
    let preData;
    //带有子属性的右侧属性
    let nextData;
    //带有子属性的解析类
    let childClass;
    data && data.forEach((item, index) => {
        preData = [];
        nextData = [];
        childClass = undefined;
        //变动数组前方数组添加
        if (index === 0) {
            preData.push(...pre);
        } else {
            if (pre.length > 0) {
                for (let i = 0; i < pre.length; i++) {
                    preData.push(null)
                }
            }
        }
        //变动数组后方数组添加
        if (index === 0) {
            nextData.push(...next);
        } else {
            if (next.length > 0) {
                for (let i = 0; i < next.length; i++) {
                    nextData.push(null)
                }
            }
        }

        //开始数据处理
        paramsClass.forEach((itemClass, itemIndex) => {
            if (itemClass.children != null) {
                childClass = itemClass;
                childClass.itemDataIndex = itemIndex;
            } else if (itemClass.show) {
                if (childClass) {
                    nextData.push(item[itemClass.key])
                } else {
                    preData.push(item[itemClass.key])
                }
            }
        })
        if (childClass) {
            //生成子数组，但是要和当前已处理的数据数组的空占位做拼接,保证后面可以做单元格合并使用
            const resultData = generateXlsxData(preData, nextData, item[childClass.key], childClass.children)
            result.data.push(...resultData.data)
            result.dataMergePosition.push(...resultData.dataMergePosition)
        } else {
            result.data.push([...preData, ...nextData])
        }
    })
    return result
}

/**
 * 列号转成列字符
 * @param column 列号
 * @return 大写列字符
 */
function convertToLetter(column) {
    const first = parseInt(column / 27);
    const second = parseInt(column - first * 26);
    let letter = "";
    if (first > 0) {
        letter = String.fromCharCode(first + 64);
    }
    if (second > 0) {
        letter += String.fromCharCode(second + 64);
    }
    return letter.toUpperCase();
}

/**
 * 生成要保存的workBook数据
 * @param titles 标题数据
 * @param headers 表头数据
 * @param tableRowColumnData 表格行列数据
 * @param columnCount 列数量
 * @param headers 标题头数据
 * @return  WorkBook数据
 */
function generateSaveWorkBook(titles, headers, tableRowColumnData, columnCount) {
    //新建xlsx文件
    const wb = XLSX.utils.book_new();
    // json_to_sheet 将JS对象数组转换为工作表
    const jsonWs = XLSX.utils.aoa_to_sheet([titles, ...headers.data, ...tableRowColumnData], {
        cellStyles: true
    });
    //设置合并单元格位置
    jsonWs['!merges'] = [{
        s: {r: 0, c: 0},
        e: {r: 0, c: columnCount - 1}
    }, ...headers.mergePosition]
    //设置标题样式
    jsonWs["A1"].s = titleStyle;
    //设置表头样式
    let ws;
    for (let i = 0; i < headers.data.length; i++) {
        //因为计算使用的是数字转字符，表格首个字母为A，所以列号要从1开始，同时行号要从第二行开始，行号为2，所以i为行数，行号要加2
        for (let j = 0; j < columnCount; j++) {
            ws = jsonWs[convertToLetter(j + 1) + (i + 2)]
            if (ws) {
                ws.s = headerStyle;
            }
        }
    }

    // 将jsonWs 数据放入xlsx文件中，tab名为jsonWs
    XLSX.utils.book_append_sheet(wb, jsonWs, 'data');
    return wb;
}

/**
 * 功能作用：excel数据工具类
 * 初始注释时间： 2020/5/11 7:34 下午
 * 注释创建人：LorenWang（王亮）
 *
 * @author LorenWang（王亮）
 */
const XlsxUtils = {

    /**
     * 导出文档
     */
    exportXlsx(resultData, title = "测试标题", saveFileName = "xxx.xlsx") {


        //获取表头最大行数
        const headerMaxRow = getHeaderMaxRow(0, TestClass)
        //生成表头二维数组
        const headers = getHeader({
            data: [],
            mergePosition: []
        }, resultData[0], TestClass, headerMaxRow, 0);

        //列数量获取
        let columnCount = 0;
        if (headers.data.length > 0 && headers.data[0] != null) {
            columnCount = headers.data[0].length;
        }
        //根据表头二维数组单条元素数组长度，生成标题
        const titles = [title];
        for (let i = 1; i < columnCount; i++) {
            //从1开始，因为第0个元素是要显示的标题
            titles.push(null)
        }
        //表格行列数据
        const tableRowColumnData = [];
        //获取内容数据
        const tableData = getTableData(resultData, TestClass)
        //获取数据行数
        const dataRows = tableData.length / columnCount;
        //开始拆分内容数据
        let start;
        for (let i = 0; i < dataRows; i++) {
            start = columnCount * i;
            tableRowColumnData.push(tableData.slice(start, start + columnCount))
        }


        //生成WorkBook数据，用来存储保存
        const wb = generateSaveWorkBook(titles, headers, tableRowColumnData, columnCount);
        //生成excel数据字符串，然后通过字符串转成ArrayBuffer，再转换成blob数据进行数据存储
        const saveStr = XLSX1.write(wb, {bookType: "xlsx", bookSST: false, type: 'binary'})
        CommonUtils.downLoadFileResponseDispose(new Blob([CommonUtils.stringToArrayBuffer(saveStr)], {type: ""}), saveFileName)
    },


}

export default XlsxUtils
