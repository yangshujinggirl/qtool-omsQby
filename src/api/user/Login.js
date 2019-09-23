import Req from '../Req';

export function GoLoginApi(values) {
  values = JSON.stringify(values)
  return Req.post('/webrest.htm', {
    code:'qerp.web.bs.login',
    data:values
  })
}
