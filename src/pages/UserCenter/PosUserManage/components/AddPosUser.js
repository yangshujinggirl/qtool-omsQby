import React,{Component} from 'react'
import {Button,Input,Radio,Select} from 'antd'
import {BaseEdit,Address,Cooperate,Shop} from './components/Edits'
class AddPosUser extends Component{
    constructor(){
        super(props)
        this.state = {

        }
    }
    componentDidMount=()=>{

    }
    render(){
        return(
            <div>
                <Form>
                   <BaseEdit/>
                   <Address/>
                   <Cooperate/>
                   <Shop/>
                </Form>
            </div>
        )
    }
}
export default AddPosUser