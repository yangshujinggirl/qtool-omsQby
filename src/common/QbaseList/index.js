import React from 'react'
import TableDataListUtil from "utils/TableDataListUtil";
import {Spin} from "antd";

/**
 *
 * @param ChildComponent 渲染Dom树
 * @param apiRequest 数据列表请求function
 * @param isComponentDidMountRequestData 是否在第一次渲染完成是请求数据
 * @param dataListOptionsKey  数据列表操作时要读取的key值，为空时取index值
 * @param childStateParams 调用方传递参数
 * @param formatSearchCriteriaList 请求参数格式化
 * @param onModalCancelClick modal取消弹窗点击
 * @param optionsResponseDataFun 操作相应数据函数，当不为空时响应数据交由该函数处理
 */
function QbaseList(ChildComponent, apiRequest, isComponentDidMountRequestData,
                   dataListOptionsKey = null, childStateParams = null, formatSearchCriteriaList = null,
                   onModalCancelClick = null, optionsResponseDataFun = null) {
    return class extends React.Component {

        state = {
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
            total: 0,
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
            showLoadingStatus: false,
            /**
             * 子类变量数据参数
             */
            ...childStateParams
        };

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
            this.searchDataList({...this.state.searchCriteriaList, currentPage, everyPage}, false);
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
         * @param isUseRecord 是否使用记录数据，默认搜索时使用记录数据
         */
        searchDataList = (values, isUseRecord = true) => {
            this.showLoading();
            //先合并记录数据
            let params = isUseRecord ? {
                ...this.state.searchCriteriaList, ...this.state.recordSearchCriteriaList
            } : {...this.state.searchCriteriaList};
            if (formatSearchCriteriaList != null) {
                params = {...params, ...formatSearchCriteriaList(this, values)};
            } else {
                params = {...params, ...values};
            }
            apiRequest(params, this).then(res => {
                this.hideLoading();
                const {result, everyPage, total, currentPage} = res.result != null ? res.result : res;
                this.setState({
                    dataList: TableDataListUtil.addKeyAndResultList(result, dataListOptionsKey),
                    everyPage,
                    total: total,
                    currentPage,
                    searchCriteriaList: params,
                    selectedRowKeys: []
                }, optionsResponseDataFun != null ? function () {
                    //默认情况处理完交由调用该高阶组件方处理数据
                    optionsResponseDataFun(this, res)
                } : null);
            }).catch(() => {
                this.hideLoading();
            });
        };

        /**
         * 刷新数据列表，同时隐藏各个弹窗
         */
        refreshDataList = () => {
            //隐藏弹窗同时隐藏加载中
            onModalCancelClick != null ? onModalCancelClick(this) : this.setState({showModal: false,});
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
                showLoadingStatus: true
            })
        };

        /**
         * 隐藏加载中
         */
        hideLoading() {
            this.setState({
                showLoadingStatus: false
            })
        };

        render() {
            return <Spin spinning={this.state.showLoadingStatus}>
                {ChildComponent(this)}
            </Spin>
        }
    }
}

export default QbaseList
