
class QbaseEdit extends Component {
  constructor(props){
    super(props);
    this.formItemLayout = {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 4 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 12 },
          },
        };
    this.formItemLayoutBig = {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 4 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 20 },
          },
      };
  }
}
export default QbaseEdit;
