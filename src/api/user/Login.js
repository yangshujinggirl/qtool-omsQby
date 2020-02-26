import {omsAjax} from '../Req';

export function GoLoginTApi({username,password}) {
  return omsAjax.post('/login', {
    username,password,term:'oms'
  })
}
export function GoLoginOutTApi() {
  return omsAjax.post('/logout')
}
