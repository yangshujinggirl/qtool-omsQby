import './index.less'
import act from './imgs/act.png'
import audit from './imgs/audit.png'
import {Link} from 'react-router-dom'
const PosAct =()=>{
    return(
        <div className='mark_box'>
          <div className='out_box'>
              <Link to='/account/pos_act' className='box'>
                <div className='img_box'>
                  <img className='img' alt="example" src={act}/>
                </div>
                <div className='right'>
                  <span className='title'>POS活动</span>
                </div>
              </Link>
              <Link to='/account/shop_keeper_act' className='box'>
                <div className='img_box'>
                  <img className='img' alt="example" src={audit}/>
                </div>
                <div className='right'>
                  <span className='title'>POS活动审核</span>
                </div>
              </Link>
          </div>
      </div>
    )
}
export default PosAct