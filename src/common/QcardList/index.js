import React from 'react'
import './index.css'
import {Link} from "react-router-dom";

export default class QcardList extends React.Component {
    render() {
        return (
            <div className='q-card-list'>
                {
                    this.props.data.map((item, index) => {
                        return (
                            <Link style={{
                                width: 220,
                                color: "#fff",
                                padding: '10px 0',
                                cursor: 'pointer',
                                background: item.bg
                            }} key={index} to={item.linkToPage}>
                                <p>{item.title}</p>
                                <p className='q-card-list-value'>{item.value}</p>
                            </Link>
                        )
                    })
                }

            </div>
        );
    }
}
