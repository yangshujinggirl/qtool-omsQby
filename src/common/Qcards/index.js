import React from 'react'
import {Card} from 'antd';
import {CaretDownOutlined, CaretUpOutlined} from '@ant-design/icons';
import './index.css'

/**
 * props.data{
 *  title:'',
 *  value:'',
 *  rate:'',
 *  type:0下降1上升
 * }
 */
export default class Qcards extends React.Component {
    render() {
        return (
            <div className='q-cards-container'>
                <Card>
                    <div className='q-cards'>
                        {
                            this.props.data.map((item, index) => {
                                return (
                                    <Card style={{width: '15%', textAlign: 'center'}} key={index}
                                          bordered={false}>
                                        <p>{item.title}</p>
                                        <p className='q-cards-value'
                                           style={{color: "#333"}}>{item.value != null ? item.value : 0}</p>
                                        {
                                            item.rate != null ? item.rate.toString() === '0' ?
                                                <p style={{marginTop: "6px"}}>{item.rate + '%' + item.text}</p> :
                                                <p style={{marginTop: "6px"}}>
                                                    {
                                                        item.type === '0' ?
                                                            <CaretDownOutlined
                                                                style={{color: "#ED6531"}}/> :
                                                            <CaretUpOutlined
                                                                style={{color: "#5DB637"}}/>
                                                    }{item.rate + '%' + item.text}
                                                </p> : null
                                        }
                                    </Card>
                                )
                            })
                        }
                    </div>
                </Card>
            </div>
        );
    }
}
