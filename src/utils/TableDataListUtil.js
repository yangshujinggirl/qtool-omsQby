/**
 * 功能作用：表格数据列表工具
 * 初始注释时间： 2020/3/11 18:03
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
const TableDataListUtil = {
    /**
     * 向列表中添加key字段,并返回数据
     * @param list 数据列表
     * @param keyStr key字段值为item中该keyStr对应的字段值
     * @return 返回处理后的数据列表
     */
    addKeyAndResultList(list, keyStr = null) {
        //返回数据
        const resultList = [];
        //开始遍历
        if (list != null) {
            list.forEach((item, index) => {
                resultList.push({
                    key: keyStr != null && keyStr !== "" ? item[keyStr] : index,
                    ...item
                })
            });
        }
        return resultList;
    }
};
export default TableDataListUtil;
