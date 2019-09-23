import { GetMenuApi } from '../../api/home/Home';
class SiderBarController extends React.Component {
  componentDidMount(){
    console.log('GetMenuApi')
    GetMenuApi()
    .then((res) => {
      console.log(res)
    })
  }
  render(){
    return(
      <div className="oms-sider-wrap">侧边栏</div>
    )
  }
}

export default SiderBarController;
