import {Form} from 'antd'
import {Qtable} from 'common'
import getColumns from './column'
class index extends React.Component {
    render() {
        const {goodList} = this.props;
        console.log(goodList)
        return (
            <div>
                <Qtable columns={getColumns(this.props.form,Form)} dataSource={goodList} />
            </div>
        );
    }
}
export default Form.create({})(index);