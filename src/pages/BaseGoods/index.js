import React, { Component } from 'react';
import {Table} from 'antd'
import FilterForm from './components/FilterForm'
class BaseGoods extends Component {
    constructor(props){
        super(props)
        this.state={
            
        }
    }
    onSubmit=(params)=>{
        console.log(params)
    }
    render() {
        return (
            <div>
               <FilterForm onSubmit={this.onSubmit}/> 
            </div>
        );
    }
}

export default BaseGoods;
