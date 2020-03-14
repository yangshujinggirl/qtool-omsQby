import React from 'react'

/**
 *
 * @param ChildComponent 渲染Dom树
 * @param apiRequest 数据列表请求function
 * @param isComponentDidMountRequestData 是否在第一次渲染完成是请求数据
 * @param dataListOptionsKey  数据列表操作时要读取的key值，为空时取index值
 * @param childStateParams 调用方传递参数
 * @param formatSearchCriteriaList 请求参数格式化
 * @param onModalCancelClick modal取消弹窗点击
 */
function QbaseList(ChildComponent, apiRequest, isComponentDidMountRequestData,
                      dataListOptionsKey, childStateParams, formatSearchCriteriaList,
                      onModalCancelClick) {
    return class extends React.Component {

        /**
         * 初始化
         */
        constructor() {
            super();
            this.state = {
                /**
                 * 数据列表
                 */
                dataList: [],
                /**
                 * 每页展示数量
                 */
                everyPage: 20,
                /**
                 * 当前页码
                 */
                currentPage: 0,
                /**
                 * 总数
                 */
                totalCount: 0,
                /**
                 * 搜索条件列表
                 */
                searchCriteriaList: {},
                /**
                 * 仅记录的搜索条件列表,仅记录使用，在搜索时候做合并使用，但是在其他接口中不做任何处理
                 */
                recordSearchCriteriaList: {},
                /**
                 * 选中的数据key列表
                 */
                selectedRowKeys: [],
                /**
                 * 选中的数据实体列表
                 */
                selectedRows: [],
                /**
                 * 是否显示Modal弹窗
                 */
                showModal: false,
                /**
                 * 显示modal弹窗key
                 */
                showModalKey: "",
                /**
                 * 是否显示加载中
                 */
                showLoading: false,
                /**
                 * 子类变量数据参数
                 */
                ...childStateParams
            }
        }

        /**
         * 第一次渲染之后调用数据
         */
        componentDidMount = () => {
            if (isComponentDidMountRequestData) {
                this.searchDataList();
            }
        };

        /**
         * 选择改变回调
         * @param selectedRowKeys
         * @param selectedRows
         */
        rowSelectChange = (selectedRowKeys, selectedRows) => {
            this.setState({
                selectedRowKeys,
                selectedRows
            });
        };

        /**
         * 更改分页
         * @param currentPage 目标页面
         * @param everyPage 每页数量
         */
        changePage = (currentPage, everyPage) => {
            this.searchDataList({...this.state.searchCriteriaList, currentPage, everyPage});
        };

        /**
         * 获取表格筛选的selection
         */
        getTableRowSelection() {
            const rows = this.state.selectedRows;
            return {
                rows,
                onChange: this.rowSelectChange,
            };
        }

        /**
         * 搜索数据列表
         * @param values 搜索数据
         */
        searchDataList = (values) => {
            this.showLoading();
            //先合并记录数据
            let params = {...this.state.searchCriteriaList, ...this.state.recordSearchCriteriaList};
            if (formatSearchCriteriaList != null) {
                params = {...params, ...formatSearchCriteriaList(values)};
            }
            apiRequest(params).then(res => {
                this.hideLoading();
                const {resultList, result, everyPage, totalCount, currentPage} = res.result;
                let dataList = [];
                let optionsList = resultList != null ? resultList : [];
                if (result != null) {
                    optionsList = result;
                }
                //必须要有key，否则无法进行选择
                optionsList.map((item, index) => {
                    dataList.push({
                        key: item[(this.dataListOptionsKey == null || this.dataListOptionsKey === "") ? index : this.dataListOptionsKey],
                        ...item
                    })
                });
                this.setState({
                    dataList: dataList,
                    everyPage,
                    totalCount: totalCount,
                    currentPage,
                    searchCriteriaList: params,
                    selectedRowKeys: []
                });
            }).catch(() => {
                this.hideLoading();
            });
        };

        /**
         * 刷新数据列表，同时隐藏各个弹窗
         */
        refreshDataList = () => {
            //隐藏弹窗同时隐藏加载中
            onModalCancelClick != null ? onModalCancelClick() : this.setState({showModal: false,});
            //刷新数据
            let currentPage = this.state.currentPage;
            let everyPage = this.state.everyPage;
            this.searchDataList({
                ...this.state.searchCriteriaList,
                currentPage,
                everyPage
            });
        };

        /**
         * 选择的时间改变
         * @param values 改变值
         * @param isDefaultInitFinish 默认值初始化完成
         */
        selectTimeChange = (values, isDefaultInitFinish) => {
            const params = {...this.state.searchCriteriaList, ...values};
            this.setState({recordSearchCriteriaList: params});
            if (isDefaultInitFinish) {
                this.searchDataList(params)
            }
        };

        /**
         * 显示加载中
         */
        showLoading() {
            this.setState({
                showLoading: true
            })
        };

        /**
         * 隐藏加载中
         */
        hideLoading() {
            this.setState({
                showLoading: false
            })
        };

        render() {
            return ChildComponent(this)
        }
    }
}

export default QbaseList
