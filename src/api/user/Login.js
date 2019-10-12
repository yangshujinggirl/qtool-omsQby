import Req from '../Req';

export function GoLoginApi(values) {
  values = JSON.stringify(values)
  return Req.post('/webrest.htm', {
    code:'qerp.web.bs.login',
    data:values
  })
}
export function GoLoginTApi({username,password}) {
  // values = JSON.stringify(values)
  // return Req.get('/login', {
  //   params: {
  //     username,password
  //   }
  // })
  return Req.get('/login', {
    params:{username,password}
  })
}
export function GoLoginOutTApi() {
  return Req.post('/logout')
}
