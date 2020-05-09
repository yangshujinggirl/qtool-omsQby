import XLSX from "xlsx";

/**
 * 功能作用：excel文档工具类
 * 初始注释时间： 2020/5/7 2:17 下午
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 *
 *@author LorenWang（王亮）
 */

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
 * @param titleRow 标题所占的行数
 * @return {*} 处理之后的表头
 */
function getHeader(lastHeaders, data, paramsClass, maxRow, leftColumns, titleRow) {
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
                child = getHeader(lastHeaders, childData, childParamsClass, maxRow, index, titleRow)
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

const XlsxUtils = {

    /**
     * 导出文档
     */
    exportXlsx(resultData, title = "测试标题", saveFileName = "xxx.xlsx") {

        //初始化要保存的数据
        const saveData = [];

        //获取表头最大行数
        const headerMaxRow = getHeaderMaxRow(0, TestClass)
        //生成表头二维数组
        const headers = getHeader({
            data: [],
            mergePosition: []
        }, resultData[0], TestClass, headerMaxRow, 0, 1);

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
        //存储标题数据以及表头数据
        saveData.push(titles);
        saveData.push(...headers.data);


        //获取内容数据
        const tableData = getTableData(resultData, TestClass)
        //获取数据行数
        const dataRows = tableData.length / columnCount;
        //开始拆分内容数据
        let start;
        for (let i = 0; i < dataRows; i++) {
            start = columnCount * i;
            saveData.push(tableData.slice(start, start + columnCount))
        }


        //新建xlsx文件
        const wb = XLSX.utils.book_new();
        // json_to_sheet 将JS对象数组转换为工作表
        const jsonWs = XLSX.utils.aoa_to_sheet(saveData,{
            cellStyles:true
        });
        //设置合并单元格位置
        jsonWs['!merges'] = [{
            s: {r: 0, c: 0},
            e: {r: 0, c: columnCount - 1}
        }, ...headers.mergePosition]

        // 将jsonWs 数据放入xlsx文件中，tab名为jsonWs
        XLSX.utils.book_append_sheet(wb, jsonWs, 'data');
        XLSX.writeFile(wb, saveFileName);
    }
}
export default XlsxUtils
