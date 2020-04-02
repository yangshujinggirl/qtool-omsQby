import React from 'react'
import {QuestionCircleOutlined,} from '@ant-design/icons';
import './index.css'

/**
 * 功能作用：顶部标题以及说明组件
 * 初始注释时间： 2020/3/15 19:09
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
export default class TopTitleDesHeader extends React.Component {
    render() {
        const updateTime = (this.props.isShowUpdateTime == null || this.props.isShowUpdateTime) ?
            <p className="top-title-des-header-time">数据更新于: {this.props.updateTime != null ? this.props.updateTime : ''}</p> : null;
        return <div className='top-title-des-header-container'>
            {updateTime}
            <p className='top-title-des-header-des'
               onClick={this.props.desInfoClick != null ? this.props.desInfoClick : null}>
                数据定义说明
                <QuestionCircleOutlined style={{color: "#ED6531", marginLeft: "4px"}}/>
            </p>
        </div>
    }
}
