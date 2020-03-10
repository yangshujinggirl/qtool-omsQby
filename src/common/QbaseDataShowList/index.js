import React from 'react'
import moment from "moment";
import {Qtable, Qpagination} from "common/index";
import {NET_REQUEST_SUCCESS_CODE} from "../../api/Req";

/**
 * 功能作用：数据展示基础列表组件，例如采购、采退列表页面
 * 初始注释时间： 2020/3/9 16:21
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
export class BaseDataShowList extends React.Component {
    /**
     * 时间格式化字符串，年月日
     */
    timeFormatYMDStr = "YYYY-MM-DD";

    /**
     * 时间格式化字符串，年月日时分秒
     */
    timeFormatYMDHMSStr = "YYYY-MM-DD HH:mm:ss";

    /**
     * 数据列表操作时要读取的key值，为空时取inde值
     */
    dataListOptionsKey = "";

    /**
     * 是否显示多选
     */
    isShowTableRowSelection = false;
    /**
     * 是否在第一次渲染完成是请求数据
     */
    isComponentDidMountRequestData = false;

    /**
     * 表格展示字段
     * @type {{}}
     */
    tableShowColumns = [];

    /**
     * 初始化
     */
    constructor() {
        super();
        let childStateParams = this.getChildStateParams();
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
        if (this.isComponentDidMountRequestData) {
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
     * @return {{onChange: BaseDataShowList.rowSelectChange, selectedRowKeys: *}}
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
        params = {...params, ...this.formatSearchCriteriaList(values)};
        this.getDataListRequest(params).then(res => {
            this.hideLoading();
            if (res.httpCode === NET_REQUEST_SUCCESS_CODE) {
                const {resultList, everyPage, totalCount, currentPage} = res.result;
                let dataList = [];
                //必须要有key，否则无法进行选择
                resultList.map((item, index) => {
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
            }
        }).catch(() => {
            this.hideLoading();
        });
    };

    /**
     * 刷新数据列表，同时隐藏各个弹窗
     */
    refreshDataList = () => {
        //隐藏弹窗同时隐藏加载中
        this.onModalCancelClick();
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
    selectTimeChange = (values,isDefaultInitFinish) => {
        const params = {...this.state.searchCriteriaList, ...values};
        this.setState({recordSearchCriteriaList: params});
        if(isDefaultInitFinish){
            this.searchDataList(params)
        }
    };

    /**
     * 绘制渲染部分
     * @return {*}
     */
    render() {
        const {
            dataList, everyPage, currentPage, totalCount
        } = this.state;
        return (
            <div className="oms-common-index-pages-wrap">
                {this.getRenderFilterForm()}
                {this.getRenderOperateBtnAction("handle-operate-btn-action")}
                {
                    this.isShowTableRowSelection ? <Qtable
                            columns={this.tableShowColumns}
                            select={true}
                            dataSource={dataList}
                            rowSelection={this.getTableRowSelection()}/> :
                        <Qtable
                            columns={this.tableShowColumns}
                            select={true}
                            dataSource={dataList}/>
                }
                <Qpagination
                    data={{everyPage, currentPage, totalCount}}
                    onChange={this.changePage}/>
                {this.getRenderOther()}
            </div>
        );
    }


    /*-------------------------------------子类要选择性重写的----------------------------------------/

    /**
     * 格式化搜索条件并返回格式化后数据
     * @param values 搜索数据
     */
    formatSearchCriteriaList(values) {
        return values;
    }

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

    /**
     * 取消弹窗点击，子类选择重写
     */
    onModalCancelClick() {
        this.setState({
            showModal: false,
        });
    };

    /**
     * 获取子类定义的变量数据
     */
    getChildStateParams() {

    }


    /*---------------------------------------子类必须要重写的---------------------------------------/

    /**
     * 获取数据列表请求，返回的为Promise<R>
     */
    getDataListRequest(params) {
    };

    /**
     * 获取搜索条件筛选
     * @return {null}
     */
    getRenderFilterForm() {
        return null;
    }

    /**
     * 获取操作按钮列表
     * @param defaultContainerClsName 默认容器样式类名
     */
    getRenderOperateBtnAction(defaultContainerClsName) {
        return null;
    }

    /**
     * 获取其他部分数据
     */
    getRenderOther() {
        return null;
    }

}
