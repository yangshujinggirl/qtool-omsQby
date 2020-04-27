import { Qbtn } from 'common';

const QreturnBtn=({...props})=> {
  const { backUrl } =props;//自定义跳转url

  const onClick=()=> {
    if(backUrl) {
      props.history.push(backUrl);
      return;
    }
    props.history.goBack();
  }
  return <Qbtn onClick={onClick}>
          {props.children?props.children:'返回'}
         </Qbtn>
}

export default QreturnBtn;
